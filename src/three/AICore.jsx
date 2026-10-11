import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useAnchor } from './useAnchor'
import { simplex3d } from './noise.glsl.js'
import { store, setStore } from '../lib/store'

const coreVertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  uniform float uPulse;
  varying vec3 vViewPos;
  varying float vDisp;
  ${simplex3d}
  void main() {
    vec3 n = normalize(position);
    float t = uTime * 0.35;
    float d = snoise(n * 1.5 + vec3(t)) * 0.7 + snoise(n * 3.0 - vec3(t * 1.4)) * 0.15;
    d += uPulse * sin(length(position) * 40.0 - uTime * 18.0) * 0.25;
    vDisp = d;
    vec3 p = position + n * d * 0.05 * uAmp;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform float uHover;
  varying vec3 vViewPos;
  varying float vDisp;
  void main() {
    vec3 n = normalize(cross(dFdx(vViewPos), dFdy(vViewPos)));
    vec3 v = normalize(-vViewPos);
    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);
    vec3 base = vec3(0.035, 0.008, 0.012);
    vec3 red = vec3(1.0, 0.13, 0.08);
    vec3 hot = vec3(1.0, 0.55, 0.32);
    float bands = smoothstep(0.88, 1.0, sin(vDisp * 26.0 + uTime * 1.6) * 0.5 + 0.5);
    vec3 col = base;
    col += red * fres * (1.5 + uHover * 0.8);
    col += hot * bands * (0.25 + fres) * 0.45;
    col += red * smoothstep(0.1, 0.9, vDisp) * 0.35;
    vec3 L = normalize(vec3(0.6, 0.9, 0.7));
    col += vec3(1.0, 0.9, 0.9) * pow(max(dot(reflect(-L, n), v), 0.0), 36.0) * 0.45;
    gl_FragColor = vec4(col, 1.0);
  }
`

function fibonacciSphere(n, r, jitter = 0) {
  const pts = []
  const g = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2
    const rad = Math.sqrt(1 - y * y)
    const th = g * i
    const rr = r * (1 + (Math.random() - 0.5) * jitter)
    pts.push(new THREE.Vector3(Math.cos(th) * rad * rr, y * rr, Math.sin(th) * rad * rr))
  }
  return pts
}

function NeuralShell({ count = 150, radius = 0.5 }) {
  const ref = useRef()
  const lineMat = useRef()
  const { points, lines } = useMemo(() => {
    const pts = fibonacciSphere(count, radius, 0.18)
    const pos = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => p.toArray(pos, i * 3))
    const seg = []
    for (let i = 0; i < pts.length; i++) {
      let links = 0
      for (let j = i + 1; j < pts.length && links < 3; j++) {
        if (pts[i].distanceTo(pts[j]) < radius * 0.32) {
          seg.push(...pts[i].toArray(), ...pts[j].toArray())
          links++
        }
      }
    }
    const pg = new THREE.BufferGeometry()
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const lg = new THREE.BufferGeometry()
    lg.setAttribute('position', new THREE.BufferAttribute(new Float32Array(seg), 3))
    return { points: pg, lines: lg }
  }, [count, radius])

  useFrame((state, dt) => {
    ref.current.rotation.y -= dt * 0.06
    ref.current.rotation.z += dt * 0.02
    lineMat.current.opacity = 0.16 + Math.sin(state.clock.elapsedTime * 1.3) * 0.06
  })

  return (
    <group ref={ref}>
      <points geometry={points}>
        <pointsMaterial color="#ffd2cc" size={0.012} sizeAttenuation transparent opacity={0.9} depthWrite={false} toneMapped={false} />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial ref={lineMat} color="#ff4a3d" transparent opacity={0.18} depthWrite={false} />
      </lineSegments>
    </group>
  )
}

function OrbitRing({ radius, tilt, speed, color = '#ffffff', satellite = '#ff2a23' }) {
  const g = useRef()
  const sat = useRef()
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed
    sat.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0)
    g.current.rotation.z += 0.0015 * Math.sign(speed)
  })
  return (
    <group rotation={tilt}>
      <group ref={g}>
        <mesh>
          <torusGeometry args={[radius, 0.0018, 8, 160]} />
          <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
        </mesh>
        <mesh ref={sat}>
          <sphereGeometry args={[0.011, 16, 16]} />
          <meshBasicMaterial color={satellite} toneMapped={false} />
        </mesh>
      </group>
    </group>
  )
}

/** The hero centrepiece — a living "AI core". Hover to energise, click to fire a pulse. */
export default function AICore({ detail = 28 }) {
  const inner = useRef()
  const shell = useRef()
  const wave = useRef()
  const hover = useRef(0)
  const pulse = useRef(0)
  const intro = useRef(0)
  const shellGeo = useMemo(() => new THREE.IcosahedronGeometry(0.34, 1), [])

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAmp: { value: 1 }, uPulse: { value: 0 }, uHover: { value: 0 } }),
    [],
  )

  const [ref] = useAnchor('hero-core', {
    onFrame: (i, state, dt) => {
      const t = state.clock.elapsedTime
      if (store.loaded) intro.current = Math.min(intro.current + dt * 0.6, 1)
      const e = 1 - Math.pow(1 - intro.current, 3)
      uniforms.uTime.value = t
      uniforms.uHover.value = THREE.MathUtils.lerp(uniforms.uHover.value, hover.current, 0.08)
      uniforms.uAmp.value = 1 + uniforms.uHover.value * 0.9 + Math.abs(store.scrollVelocity) * 0.01
      pulse.current = Math.max(0, pulse.current - dt * 0.9)
      uniforms.uPulse.value = pulse.current

      // scroll away: spin + sink as the hero leaves the screen
      const leave = THREE.MathUtils.clamp((i.center - 0.5) * 2, 0, 1)
      inner.current.scale.setScalar(1.22 * e * (1 - leave * 0.35))
      inner.current.rotation.y = THREE.MathUtils.lerp(inner.current.rotation.y, store.pointer.x * 0.5 + leave * 2, 0.05)
      inner.current.rotation.x = THREE.MathUtils.lerp(inner.current.rotation.x, -store.pointer.y * 0.35, 0.05)
      inner.current.position.y = Math.sin(t * 0.8) * 0.015
      shell.current.rotation.x += dt * 0.12
      shell.current.rotation.y += dt * 0.08

      const w = 1 - pulse.current
      wave.current.scale.setScalar(0.3 + w * 1.4)
      wave.current.material.opacity = pulse.current * 0.8
    },
  })

  const onClick = (e) => {
    e.stopPropagation()
    pulse.current = 1
  }

  return (
    <group ref={ref}>
      <group ref={inner} scale={0}>
        {/* core crystal */}
        <mesh
          onPointerOver={() => {
            hover.current = 1
            setStore({ cursor: 'Click' })
          }}
          onPointerOut={() => {
            hover.current = 0
            setStore({ cursor: null })
          }}
          onClick={onClick}
        >
          <icosahedronGeometry args={[0.24, detail]} />
          <shaderMaterial vertexShader={coreVertex} fragmentShader={coreFragment} uniforms={uniforms} />
        </mesh>

        {/* wire shell */}
        <lineSegments ref={shell}>
          <edgesGeometry args={[shellGeo]} />
          <lineBasicMaterial color="#ff2a23" transparent opacity={0.28} />
        </lineSegments>

        <NeuralShell />

        <OrbitRing radius={0.42} tilt={[1.2, 0.2, 0]} speed={0.7} />
        <OrbitRing radius={0.46} tilt={[0.4, -0.9, 0]} speed={-0.5} color="#ff6a5c" satellite="#ffffff" />
        <OrbitRing radius={0.38} tilt={[-0.6, 0.7, 0.3]} speed={0.9} />

        {/* click shockwave */}
        <mesh ref={wave}>
          <ringGeometry args={[0.29, 0.3, 96]} />
          <meshBasicMaterial color="#ff5a4a" transparent opacity={0} side={THREE.DoubleSide} toneMapped={false} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}
