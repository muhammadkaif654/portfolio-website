import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard, Text } from '@react-three/drei'
import * as THREE from 'three'
import fontUrl from '@fontsource/space-grotesk/files/space-grotesk-latin-600-normal.woff?url'
import { useAnchor, createDragRotate } from './useAnchor'
import { store, setStore } from '../lib/store'
import { skillCategories } from '../data/content'

const R = 0.4
const WHITE = new THREE.Color('#f2f2f5')
const DIM = new THREE.Color('#7c7c8c')
const RED = new THREE.Color('#ff4b3e')

function Tag({ item, base, registry }) {
  const g = useRef()
  const text = useRef()
  registry.current[item.key] = { g, text, item, base }
  return (
    <group ref={g} position={base}>
      <Billboard>
        <Text
          ref={text}
          font={fontUrl}
          fontSize={0.026}
          anchorX="center"
          anchorY="middle"
          color={item.level === 'core' ? '#f2f2f5' : '#7c7c8c'}
          outlineWidth={0}
          onPointerOver={(e) => {
            e.stopPropagation()
            setStore({ hoveredSkill: item, cursor: item.level === 'core' ? 'Hands-on' : 'Learning' })
          }}
          onPointerOut={() => setStore({ hoveredSkill: null, cursor: null })}
        >
          {item.short || item.name}
        </Text>
        <mesh position={[0, -0.028, 0]}>
          <circleGeometry args={[0.0045, 12]} />
          <meshBasicMaterial color={item.level === 'core' ? '#ff2a23' : '#55555f'} toneMapped={false} />
        </mesh>
      </Billboard>
    </group>
  )
}

/** Interactive 3D tag-cloud of every skill. Drag to spin, click a category card to highlight it. */
export default function SkillSphere() {
  const spin = useRef()
  const registry = useRef({})
  const drag = useMemo(() => createDragRotate(), [])
  const lineGeo = useRef()
  const v = useMemo(() => new THREE.Vector3(), [])
  const q = useMemo(() => new THREE.Quaternion(), [])

  const items = useMemo(() => {
    const flat = skillCategories.flatMap((c) => c.skills.map((s) => ({ ...s, cat: c.id, key: `${c.id}-${s.name}` })))
    const n = flat.length
    const golden = Math.PI * (3 - Math.sqrt(5))
    return flat.map((item, i) => {
      const y = 1 - (i / (n - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i
      return { item, base: new THREE.Vector3(Math.cos(th) * r * R, y * R, Math.sin(th) * r * R) }
    })
  }, [])

  const lines = useMemo(() => {
    const pos = new Float32Array(items.length * 6)
    const col = new Float32Array(items.length * 6)
    items.forEach(({ base }, i) => {
      base.toArray(pos, i * 6 + 3)
    })
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return g
  }, [items])

  const [ref] = useAnchor('skills-sphere', {
    onFrame: (i, state, dt) => {
      const [dx, dy] = drag.step(dt)
      const s = spin.current
      s.rotation.y += dx + (drag.dragging ? 0 : dt * 0.18)
      s.rotation.x = THREE.MathUtils.clamp(s.rotation.x + dy, -0.8, 0.8)
      s.rotation.x = THREE.MathUtils.lerp(s.rotation.x, -store.pointer.y * 0.15, drag.dragging ? 0 : 0.02)
      s.getWorldQuaternion(q)

      const active = store.activeCategory
      const hovered = store.hoveredSkill
      const col = lines.attributes.color
      items.forEach(({ item }, idx) => {
        const r = registry.current[item.key]
        if (!r?.g.current) return
        v.copy(r.base).applyQuaternion(q)
        const depth = (v.z / R + 1) / 2 // 0 back → 1 front
        const isActive = active ? item.cat === active : false
        const isHover = hovered?.key === item.key
        const target = isHover ? 1.6 : isActive ? 1.35 : active ? 0.75 : 1
        const sc = THREE.MathUtils.damp(r.g.current.scale.x, target * (0.78 + depth * 0.3), 8, dt)
        r.g.current.scale.setScalar(sc)
        const t = r.text.current
        if (t) {
          const c = isActive || isHover ? RED : item.level === 'core' ? WHITE : DIM
          t.color = c
          t.fillOpacity = (active && !isActive ? 0.25 : 0.35) + depth * 0.65
        }
        const lc = isActive || isHover ? 0.9 : 0.12 * depth
        col.setXYZ(idx * 2, 0, 0, 0)
        col.setXYZ(idx * 2 + 1, (isActive || isHover ? 1 : 0.6) * lc, (isActive || isHover ? 0.2 : 0.6) * lc, (isActive || isHover ? 0.15 : 0.7) * lc)
      })
      col.needsUpdate = true
    },
  })

  return (
    <group ref={ref}>
      <group ref={spin}>
        {/* invisible hit sphere for dragging */}
        <mesh
          onPointerDown={drag.down}
          onPointerOver={() => !store.hoveredSkill && setStore({ cursor: 'Drag' })}
          onPointerOut={() => setStore({ cursor: null })}
        >
          <sphereGeometry args={[R * 1.05, 24, 24]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
        <lineSegments ref={lineGeo} geometry={lines}>
          <lineBasicMaterial vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </lineSegments>
        <mesh>
          <icosahedronGeometry args={[0.05, 1]} />
          <meshBasicMaterial color="#ff2a23" wireframe toneMapped={false} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.022, 24, 24]} />
          <meshBasicMaterial color={[2.2, 0.5, 0.4]} toneMapped={false} />
        </mesh>
        {items.map(({ item, base }) => (
          <Tag key={item.key} item={item} base={base} registry={registry} />
        ))}
      </group>
    </group>
  )
}
