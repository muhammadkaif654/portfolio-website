import { useMemo, useRef } from 'react'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import fontUrl from '@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff?url'
import { useAnchor } from './useAnchor'
import { store } from '../lib/store'
import { process } from '../data/content'

const NODE_COLORS = {
  idle: new THREE.Color('#3a3a44'),
  done: new THREE.Color('#e9e9ef'),
  active: new THREE.Color(2.4, 0.35, 0.25),
}

/** A glowing build pipeline — the node for the step you're reading lights up. */
export default function ProcessPipeline() {
  const n = process.steps.length
  const nodes = useRef([])
  const labels = useRef([])
  const runner = useRef()
  const fill = useRef()
  const shown = useRef(0)

  const { curve, points, tubeBg, tubeFill } = useMemo(() => {
    const pts = []
    for (let i = 0; i < n; i++) {
      const t = n === 1 ? 0.5 : i / (n - 1)
      pts.push(new THREE.Vector3(Math.sin(t * Math.PI * 1.5) * 0.14, 0.38 - t * 0.76, Math.cos(t * Math.PI * 1.5) * 0.1))
    }
    const ext = [
      pts[0].clone().add(new THREE.Vector3(-0.05, 0.12, 0)),
      ...pts,
      pts[n - 1].clone().add(new THREE.Vector3(0.05, -0.12, 0)),
    ]
    const c = new THREE.CatmullRomCurve3(ext, false, 'catmullrom', 0.5)
    return {
      curve: c,
      points: pts,
      tubeBg: new THREE.TubeGeometry(c, 200, 0.004, 8, false),
      tubeFill: new THREE.TubeGeometry(c, 200, 0.006, 8, false),
    }
  }, [n])

  // curve parameter (0..1) of each node
  const nodeT = useMemo(() => points.map((_, i) => (i + 1) / (n + 1)), [points, n])

  const [ref] = useAnchor('process-3d', {
    onFrame: (i, state, dt) => {
      const t = state.clock.elapsedTime
      const step = store.processStep ?? 0
      shown.current = THREE.MathUtils.damp(shown.current, step, 4, dt)
      const prog = THREE.MathUtils.lerp(nodeT[0], nodeT[n - 1], n > 1 ? shown.current / (n - 1) : 1)
      const count = tubeFill.index.count
      tubeFill.setDrawRange(0, Math.floor((count * prog) / 3) * 3)

      nodes.current.forEach((m, idx) => {
        if (!m) return
        const isActive = idx === step
        const state3 = isActive ? 'active' : idx < step ? 'done' : 'idle'
        m.material.color.lerp(NODE_COLORS[state3], 0.12)
        const s = isActive ? 1.5 + Math.sin(t * 4) * 0.08 : 1
        m.scale.setScalar(THREE.MathUtils.damp(m.scale.x, s, 6, dt))
        m.rotation.y += dt * (isActive ? 2 : 0.4)
        m.rotation.x += dt * 0.3
        const l = labels.current[idx]
        if (l) l.fillOpacity = THREE.MathUtils.damp(l.fillOpacity ?? 1, isActive ? 1 : 0.35, 6, dt)
      })
      const rt = (t * 0.18) % 1
      curve.getPointAt(rt, runner.current.position)
      ref.current.children[0].rotation.y = THREE.MathUtils.lerp(
        ref.current.children[0].rotation.y,
        store.pointer.x * 0.4 + Math.sin(t * 0.3) * 0.2,
        0.05,
      )
    },
  })

  return (
    <group ref={ref}>
      <group>
        <mesh geometry={tubeBg}>
          <meshBasicMaterial color="#2a2a33" />
        </mesh>
        <mesh ref={fill} geometry={tubeFill}>
          <meshBasicMaterial color={[2, 0.3, 0.2]} toneMapped={false} />
        </mesh>
        <mesh ref={runner}>
          <sphereGeometry args={[0.009, 16, 16]} />
          <meshBasicMaterial color={[3, 2.6, 2.6]} toneMapped={false} />
        </mesh>
        {points.map((p, i) => (
          <group key={i} position={p}>
            <mesh ref={(m) => (nodes.current[i] = m)}>
              <octahedronGeometry args={[0.035, 0]} />
              <meshBasicMaterial color="#3a3a44" wireframe toneMapped={false} />
            </mesh>
            <mesh>
              <octahedronGeometry args={[0.016, 0]} />
              <meshBasicMaterial color="#ff2a23" toneMapped={false} />
            </mesh>
            <Text
              ref={(m) => (labels.current[i] = m)}
              font={fontUrl}
              fontSize={0.045}
              position={[p.x > 0 ? 0.09 : -0.09, 0, 0]}
              anchorX={p.x > 0 ? 'left' : 'right'}
              anchorY="middle"
              color="#ffffff"
            >
              {String(i + 1).padStart(2, '0')}
            </Text>
          </group>
        ))}
      </group>
    </group>
  )
}
