import { useMemo, useRef } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'
import { useAnchor, createDragRotate } from './useAnchor'
import { store, setStore } from '../lib/store'
import { contact, profile } from '../data/content'

const R = 0.36

function latLon(lat, lon, r = R) {
  const phi = THREE.MathUtils.degToRad(90 - lat)
  const theta = THREE.MathUtils.degToRad(lon + 180)
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
}

const atmosphereVertex = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vN = normalize(normalMatrix * normal);
    vV = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const atmosphereFragment = /* glsl */ `
  varying vec3 vN;
  varying vec3 vV;
  void main() {
    float f = pow(1.0 - abs(dot(vN, vV)), 3.0);
    gl_FragColor = vec4(vec3(1.0, 0.18, 0.12) * f * 1.6, f);
  }
`

function Arc({ from, to, delay }) {
  const line = useRef()
  const points = useMemo(() => {
    const mid = from.clone().add(to).multiplyScalar(0.5)
    const lift = 1 + from.distanceTo(to) * 0.9
    mid.normalize().multiplyScalar(R * lift)
    return new THREE.QuadraticBezierCurve3(from, mid, to).getPoints(64)
  }, [from, to])
  const ref = useRef(0)
  return (
    <Line
      ref={(l) => {
        line.current = l
        if (l && !ref.current) {
          ref.current = 1
          l.material.dashOffset = delay
        }
      }}
      points={points}
      color="#ff4b3e"
      lineWidth={1.4}
      dashed
      dashSize={0.06}
      gapSize={0.04}
      transparent
      opacity={0.85}
      userData={{ arc: true }}
    />
  )
}

/** Dotted holographic globe with Islamabad pinned and arcs to the world. */
export default function Globe({ dots = 1600 }) {
  const spin = useRef()
  const pulse = useRef()
  const arcs = useRef()
  const drag = useMemo(() => createDragRotate(), [])
  const home = useMemo(() => latLon(profile.coords.lat, profile.coords.lon), [])
  const homeYaw = useMemo(() => -Math.atan2(home.x, home.z), [home])
  const extra = useRef(0)

  const dotGeo = useMemo(() => {
    const pos = new Float32Array(dots * 3)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < dots; i++) {
      const y = 1 - (i / (dots - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const th = golden * i
      pos.set([Math.cos(th) * r * R, y * R, Math.sin(th) * r * R], i * 3)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [dots])

  const cities = useMemo(() => contact.globeArcs.map((c) => ({ ...c, v: latLon(c.lat, c.lon) })), [])

  const [ref] = useAnchor('contact-globe', {
    onFrame: (i, state, dt) => {
      const t = state.clock.elapsedTime
      const [dx] = drag.step(dt)
      extra.current += dx
      if (!drag.dragging) extra.current = THREE.MathUtils.damp(extra.current, 0, 0.6, dt)
      spin.current.rotation.y = homeYaw + Math.sin(t * 0.25) * 0.5 + extra.current + store.pointer.x * 0.15
      const s = 1 + ((t * 0.8) % 1) * 2.5
      pulse.current.scale.setScalar(s)
      pulse.current.material.opacity = 1 - ((t * 0.8) % 1)
      arcs.current?.children.forEach((c) => {
        if (c.material?.dashOffset !== undefined) c.material.dashOffset -= dt * 0.12
      })
    },
  })

  const markerQuat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), home.clone().normalize()),
    [home],
  )

  return (
    <group ref={ref}>
      <group rotation={[THREE.MathUtils.degToRad(profile.coords.lat) * 0.8, 0, 0]}>
        <group ref={spin}>
          <mesh
            onPointerDown={drag.down}
            onPointerOver={() => setStore({ cursor: 'Drag' })}
            onPointerOut={() => setStore({ cursor: null })}
          >
            <sphereGeometry args={[R * 0.985, 48, 48]} />
            <meshBasicMaterial color="#09090c" />
          </mesh>
          <points geometry={dotGeo}>
            <pointsMaterial color="#9a9aab" size={0.0055} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
          </points>
          {/* lat/lon rings */}
          {[-60, -30, 0, 30, 60].map((lat) => (
            <mesh key={lat} position={[0, Math.sin(THREE.MathUtils.degToRad(lat)) * R, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[Math.cos(THREE.MathUtils.degToRad(lat)) * R * 1.002, 0.0006, 4, 96]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.07} />
            </mesh>
          ))}

          {/* home marker */}
          <group position={home} quaternion={markerQuat}>
            <mesh>
              <sphereGeometry args={[0.01, 16, 16]} />
              <meshBasicMaterial color={[3, 0.5, 0.4]} toneMapped={false} />
            </mesh>
            <mesh ref={pulse}>
              <ringGeometry args={[0.012, 0.016, 48]} />
              <meshBasicMaterial color="#ff2a23" transparent side={THREE.DoubleSide} toneMapped={false} depthWrite={false} />
            </mesh>
            <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.0015, 0.0015, 0.08, 6]} />
              <meshBasicMaterial color={[2.5, 0.4, 0.3]} toneMapped={false} />
            </mesh>
          </group>

          <group ref={arcs}>
            {cities.map((c, i) => (
              <Arc key={c.name} from={home} to={c.v} delay={i * 0.3} />
            ))}
          </group>
          {cities.map((c) => (
            <mesh key={c.name} position={c.v}>
              <sphereGeometry args={[0.005, 10, 10]} />
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
          ))}
        </group>
        {/* atmosphere */}
        <mesh scale={1.12}>
          <sphereGeometry args={[R, 48, 48]} />
          <shaderMaterial
            vertexShader={atmosphereVertex}
            fragmentShader={atmosphereFragment}
            transparent
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  )
}
