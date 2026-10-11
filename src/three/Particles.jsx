import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { store } from '../lib/store'

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uStretch;
  attribute float aScale;
  attribute float aSeed;
  varying float vAlpha;
  varying float vRed;
  void main() {
    vec3 p = position;
    // depth parallax: far particles move slower than near ones, wrap vertically forever
    float depth = (p.z + 16.0) / 19.0;
    p.y = mod(p.y + uScroll * (0.15 + depth * 0.85) + 9.0, 18.0) - 9.0;
    p.x += sin(uTime * 0.15 + aSeed * 40.0) * 0.15;
    p.y += cos(uTime * 0.12 + aSeed * 25.0) * 0.1;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 + uStretch * depth) / -mv.z;
    vAlpha = (0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * (0.6 + aSeed) + aSeed * 60.0))) * smoothstep(-16.0, -6.0, p.z) ;
    vRed = step(0.86, aSeed);
  }
`

const fragment = /* glsl */ `
  varying float vAlpha;
  varying float vRed;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    vec3 col = mix(vec3(0.82, 0.84, 0.95), vec3(1.0, 0.22, 0.16), vRed);
    gl_FragColor = vec4(col, a * vAlpha);
  }
`

/** Infinite, depth-parallaxed star/dust field behind every section. */
export default function Particles({ count = 2600 }) {
  const ref = useRef()
  const mat = useRef()

  const [geometry, uniforms] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scale = new Float32Array(count)
    const seed = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = -16 + Math.random() * 19
      scale[i] = 0.4 + Math.pow(Math.random(), 3) * 2.2
      seed[i] = Math.random()
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setAttribute('aScale', new THREE.BufferAttribute(scale, 1))
    g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1))
    const u = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 60 },
      uStretch: { value: 0 },
    }
    return [g, u]
  }, [count])

  useFrame((state, dt) => {
    uniforms.uTime.value += dt
    uniforms.uScroll.value = (window.scrollY / state.size.height) * 3.2
    uniforms.uStretch.value = THREE.MathUtils.lerp(
      uniforms.uStretch.value,
      Math.min(Math.abs(store.scrollVelocity) * 0.02, 1.2),
      0.1,
    )
    const g = ref.current
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, store.pointer.x * 0.06, 0.04)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -store.pointer.y * 0.04, 0.04)
  })

  return (
    <points ref={ref} geometry={geometry} frustumCulled={false} renderOrder={-1}>
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
