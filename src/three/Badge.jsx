import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useAnchor } from './useAnchor'
import { store, setStore } from '../lib/store'
import { profile } from '../data/content'

const W = 0.36
const H = 0.54
const STRAP = 0.3

/* ---------- textures drawn on a 2D canvas (so content stays editable) ---------- */

function waitFonts() {
  if (!document.fonts) return Promise.resolve()
  const load = Promise.all([
    document.fonts.load('700 70px "Space Grotesk"'),
    document.fonts.load('500 18px "JetBrains Mono"'),
  ])
  return Promise.race([load, new Promise((r) => setTimeout(r, 2500))])
}

function makeCanvas(w, h) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  return [c, c.getContext('2d')]
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function toTexture(canvas) {
  const t = new THREE.CanvasTexture(canvas)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

function drawFront(photo) {
  const [c, ctx] = makeCanvas(640, 960)
  rr(ctx, 0, 0, 640, 960, 34)
  ctx.fillStyle = '#0d0d11'
  ctx.fill()
  ctx.save()
  ctx.clip()
  // grid + glow
  ctx.strokeStyle = 'rgba(255,255,255,0.035)'
  ctx.lineWidth = 1
  for (let x = 0; x < 640; x += 32) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 960); ctx.stroke()
  }
  for (let y = 0; y < 960; y += 32) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(640, y); ctx.stroke()
  }
  const g = ctx.createRadialGradient(640, 960, 0, 640, 960, 700)
  g.addColorStop(0, 'rgba(255,42,35,0.35)')
  g.addColorStop(1, 'rgba(255,42,35,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 640, 960)

  // lanyard slot
  rr(ctx, 260, 24, 120, 22, 11)
  ctx.fillStyle = '#000'
  ctx.fill()

  // header
  ctx.textBaseline = 'alphabetic'
  ctx.font = '700 42px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('MK', 40, 104)
  ctx.fillStyle = '#ff2a23'
  ctx.fillText('.', 40 + ctx.measureText('MK').width, 104)
  ctx.font = '500 17px "JetBrains Mono", monospace'
  ctx.fillStyle = '#8a8a99'
  ctx.textAlign = 'right'
  ctx.fillText('AI · ROBOTICS · WEB', 600, 98)
  ctx.textAlign = 'left'

  // photo
  ctx.save()
  rr(ctx, 40, 130, 560, 460, 22)
  ctx.clip()
  ctx.drawImage(photo, 0, 40, 2600, 2136, 40, 130, 560, 460)
  const pg = ctx.createLinearGradient(0, 400, 0, 590)
  pg.addColorStop(0, 'rgba(13,13,17,0)')
  pg.addColorStop(1, 'rgba(13,13,17,0.85)')
  ctx.fillStyle = pg
  ctx.fillRect(40, 130, 560, 460)
  ctx.restore()
  rr(ctx, 40, 130, 560, 460, 22)
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  ctx.lineWidth = 2
  ctx.stroke()

  // availability chip
  rr(ctx, 60, 150, 200, 38, 19)
  ctx.fillStyle = 'rgba(10,10,14,0.75)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(84, 169, 7, 0, Math.PI * 2)
  ctx.fillStyle = '#3ddc84'
  ctx.fill()
  ctx.font = '500 16px "JetBrains Mono", monospace'
  ctx.fillStyle = '#fff'
  ctx.fillText('OPEN TO WORK', 100, 175)

  // name
  ctx.font = '700 72px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#ffffff'
  const [first, ...rest] = profile.name.toUpperCase().split(' ')
  ctx.fillText(first, 38, 672)
  ctx.fillStyle = '#ff2a23'
  ctx.fillText(rest.join(' ') || '', 38, 744)
  ctx.font = '500 26px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#b8b8c4'
  ctx.fillText(profile.roles[0], 40, 794)

  ctx.fillStyle = 'rgba(255,255,255,0.1)'
  ctx.fillRect(40, 826, 560, 2)

  ctx.font = '500 17px "JetBrains Mono", monospace'
  ctx.fillStyle = '#8a8a99'
  ctx.fillText(`${profile.university} · ${profile.location.split(',')[0]}`.toUpperCase(), 40, 880)
  ctx.fillText('CLASS OF 2028', 40, 910)
  // barcode
  let x = 430
  let seed = 7
  while (x < 600) {
    seed = (seed * 9301 + 49297) % 233280
    const w = 2 + (seed % 5)
    ctx.fillStyle = '#e8e8ee'
    ctx.fillRect(x, 858, w, 56)
    x += w + 2 + (seed % 4)
  }
  ctx.restore()
  return toTexture(c)
}

function drawBack(illustration) {
  const [c, ctx] = makeCanvas(640, 960)
  rr(ctx, 0, 0, 640, 960, 34)
  ctx.fillStyle = '#e40f09'
  ctx.fill()
  ctx.save()
  ctx.clip()
  ctx.drawImage(illustration, 249, 0, 702, 768, 0, 0, 640, 700)
  const g = ctx.createLinearGradient(0, 420, 0, 760)
  g.addColorStop(0, 'rgba(13,13,17,0)')
  g.addColorStop(1, 'rgba(13,13,17,1)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 640, 960)
  ctx.fillStyle = '#0d0d11'
  ctx.fillRect(0, 760, 640, 200)

  rr(ctx, 260, 24, 120, 22, 11)
  ctx.fillStyle = '#000'
  ctx.fill()

  ctx.font = '500 17px "JetBrains Mono", monospace'
  ctx.fillStyle = '#ff6a5c'
  ctx.fillText('// BACKSIDE.EXE', 40, 690)
  ctx.font = '700 66px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#fff'
  ctx.fillText('BUILDER', 38, 760)
  ctx.fillText('MODE: ', 38, 826)
  ctx.fillStyle = '#ff2a23'
  ctx.fillText('ON', 38 + ctx.measureText('MODE: ').width, 826)
  ctx.font = '500 17px "JetBrains Mono", monospace'
  ctx.fillStyle = '#8a8a99'
  ctx.fillText('github.com/muhammadkaif654', 40, 890)
  ctx.textAlign = 'right'
  ctx.fillText('TAP TO FLIP ↺', 600, 920)
  ctx.restore()
  return toTexture(c)
}

function drawStrap() {
  const [c, ctx] = makeCanvas(96, 1024)
  ctx.fillStyle = '#d81e17'
  ctx.fillRect(0, 0, 96, 1024)
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.fillRect(0, 0, 8, 1024)
  ctx.fillRect(88, 0, 8, 1024)
  ctx.save()
  ctx.translate(48, 0)
  ctx.rotate(Math.PI / 2)
  ctx.font = '700 40px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#fff'
  ctx.textBaseline = 'middle'
  let x = 10
  while (x < 1024) {
    ctx.fillText('KAIF ✦ AI ✦ ', x, 0)
    x += ctx.measureText('KAIF ✦ AI ✦ ').width
  }
  ctx.restore()
  return toTexture(c)
}

const sheenFragment = /* glsl */ `
  uniform float uShift;
  varying vec2 vUv;
  void main() {
    float d = vUv.x * 0.8 + vUv.y * 0.6 - uShift;
    float band = smoothstep(0.0, 0.12, d) * smoothstep(0.3, 0.12, d);
    vec3 col = mix(vec3(1.0, 0.35, 0.3), vec3(0.6, 0.7, 1.0), vUv.y) * band * 0.22;
    gl_FragColor = vec4(col, 1.0);
  }
`
const sheenVertex = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`

/** A physical-feeling ID badge on a lanyard. Drag to swing, click to flip. */
export default function Badge() {
  const [photo, illustration] = useLoader(THREE.ImageLoader, [profile.photo, profile.illustration])
  const [tex, setTex] = useState(null)
  const swing = useRef()
  const card = useRef()
  const sheen = useMemo(() => ({ uShift: { value: 0 } }), [])
  const sim = useRef({ az: 0, vz: 0, ax: 0, vx: 0, tz: 0, tx: 0, flip: 0, rotY: 0, dragging: false, entered: false })

  useEffect(() => {
    let alive = true
    waitFonts().then(() => {
      if (!alive) return
      setTex({ front: drawFront(photo), back: drawBack(illustration), strap: drawStrap() })
    })
    return () => {
      alive = false
    }
  }, [photo, illustration])

  const [ref, info] = useAnchor('about-badge', {
    fit: 'height',
    onFrame: (i, state, dt) => {
      const s = sim.current
      const t = state.clock.elapsedTime
      if (!s.entered && i.center > 0.2) {
        s.entered = true
        s.vz = 2.6
        s.vx = -1.2
      }
      const idle = s.dragging ? 0 : Math.sin(t * 0.7) * 0.03
      const k = s.dragging ? 70 : 16
      const c = s.dragging ? 12 : 1.4
      const kick = THREE.MathUtils.clamp(store.scrollVelocity, -60, 60)
      s.vz += (-k * (s.az - s.tz - idle) - c * s.vz + kick * 0.02) * dt
      s.vx += (-k * (s.ax - s.tx) - c * s.vx - kick * 0.05) * dt
      s.az += s.vz * dt
      s.ax += s.vx * dt
      swing.current.rotation.z = s.az
      swing.current.rotation.x = s.ax
      const twist = s.dragging ? 0 : store.pointer.x * 0.25 + Math.sin(t * 0.5) * 0.06
      s.rotY = THREE.MathUtils.damp(s.rotY, s.flip + twist, 6, dt)
      card.current.rotation.y = s.rotY
      sheen.uShift.value = 0.5 + s.az * 1.5 + (s.rotY % Math.PI) * 0.6 + store.pointer.x * 0.3
    },
  })

  const onDown = (e) => {
    e.stopPropagation()
    const s = sim.current
    const startX = e.clientX
    const startY = e.clientY
    const start = performance.now()
    let moved = 0
    s.dragging = true
    document.body.classList.add('is-grabbing')
    const move = (ev) => {
      const dx = ev.clientX - startX
      const dy = ev.clientY - startY
      moved = Math.max(moved, Math.hypot(dx, dy))
      const u = info.current.unitPx || 500
      s.tz = THREE.MathUtils.clamp(dx / (u * 0.55), -1.2, 1.2)
      s.tx = THREE.MathUtils.clamp(-dy / (u * 0.9), -0.6, 0.6)
    }
    const up = () => {
      s.dragging = false
      s.tz = 0
      s.tx = 0
      document.body.classList.remove('is-grabbing')
      if (moved < 6 && performance.now() - start < 400) s.flip += Math.PI
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  return (
    <group ref={ref}>
      <group position={[0, 0.48, 0]}>
        {/* hook */}
        <mesh>
          <torusGeometry args={[0.018, 0.005, 12, 32]} />
          <meshStandardMaterial color="#c9c9d1" metalness={0.8} roughness={0.25} />
        </mesh>
        <group ref={swing}>
          {/* strap */}
          <mesh position={[0, -STRAP / 2, 0]}>
            <planeGeometry args={[0.045, STRAP]} />
            {tex ? (
              <meshBasicMaterial key="tex" map={tex.strap} side={THREE.DoubleSide} />
            ) : (
              <meshBasicMaterial key="plain" color="#d81e17" side={THREE.DoubleSide} />
            )}
          </mesh>
          {/* clip */}
          <mesh position={[0, -STRAP - 0.005, 0]}>
            <boxGeometry args={[0.05, 0.03, 0.012]} />
            <meshStandardMaterial color="#d4d4dc" metalness={0.85} roughness={0.2} />
          </mesh>
          <group ref={card} position={[0, -STRAP - 0.02 - H / 2, 0]}>
            <RoundedBox
              args={[W, H, 0.01]}
              radius={0.004}
              smoothness={3}
              onPointerDown={onDown}
              onPointerOver={() => setStore({ cursor: 'Drag · Flip' })}
              onPointerOut={() => setStore({ cursor: null })}
            >
              <meshStandardMaterial color="#141418" roughness={0.4} metalness={0.3} />
            </RoundedBox>
            {tex && (
              <>
                <mesh position={[0, 0, 0.0052]}>
                  <planeGeometry args={[W, H]} />
                  <meshBasicMaterial map={tex.front} transparent alphaTest={0.05} />
                </mesh>
                <mesh position={[0, 0, -0.0052]} rotation={[0, Math.PI, 0]}>
                  <planeGeometry args={[W, H]} />
                  <meshBasicMaterial map={tex.back} transparent alphaTest={0.05} />
                </mesh>
                <mesh position={[0, 0, 0.0056]}>
                  <planeGeometry args={[W * 0.97, H * 0.98]} />
                  <shaderMaterial
                    vertexShader={sheenVertex}
                    fragmentShader={sheenFragment}
                    uniforms={sheen}
                    transparent
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                  />
                </mesh>
              </>
            )}
          </group>
        </group>
      </group>
    </group>
  )
}
