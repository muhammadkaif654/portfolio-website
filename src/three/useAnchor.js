import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/**
 * Glues a 3D group to a DOM element (by id).
 * The group is moved to the element's centre in world space (plane z = 0)
 * and scaled so that 1 world unit = the element's width / height / min side.
 * This is what keeps every 3D object perfectly in sync with the page layout
 * on every screen size — the HTML decides *where*, WebGL decides *what*.
 */
export function useAnchor(id, { fit = 'min', margin = 0.2, onFrame } = {}) {
  const ref = useRef()
  const el = useRef(null)
  const info = useRef({ visible: false, progress: 0, center: 0.5, unitPx: 1, worldPerPx: 1 })

  useFrame((state, dt) => {
    const g = ref.current
    if (!g) return
    if (!el.current || !el.current.isConnected) el.current = document.getElementById(id)
    const node = el.current
    if (!node) {
      g.visible = false
      return
    }
    const r = node.getBoundingClientRect()
    const { width: vw, height: vh } = state.size
    const visible = r.width > 0 && r.bottom > -vh * margin && r.top < vh * (1 + margin)
    g.visible = visible
    info.current.visible = visible
    if (!visible) return

    const cam = state.camera
    const worldH = 2 * Math.tan((cam.fov * Math.PI) / 360) * cam.position.z
    const worldPerPx = worldH / vh
    g.position.x = (r.left + r.width / 2 - vw / 2) * worldPerPx
    g.position.y = -(r.top + r.height / 2 - vh / 2) * worldPerPx
    const unitPx = fit === 'width' ? r.width : fit === 'height' ? r.height : Math.min(r.width, r.height)
    g.scale.setScalar(unitPx * worldPerPx)

    const i = info.current
    i.unitPx = unitPx
    i.worldPerPx = worldPerPx
    i.rect = r
    // 0 → element just entered from the bottom, 1 → element just left at the top
    i.progress = (vh - r.top) / (vh + r.height)
    // 0.5 when the element's centre is in the middle of the screen
    i.center = 1 - (r.top + r.height / 2) / vh
    onFrame?.(i, state, Math.min(dt, 1 / 30))
  })

  return [ref, info]
}

/** Small drag-to-rotate helper with inertia (mouse / pen only — touch keeps page scrolling). */
export function createDragRotate() {
  const s = { dragging: false, vx: 0, vy: 0, lastX: 0, lastY: 0 }
  const move = (e) => {
    if (!s.dragging) return
    const dx = e.clientX - s.lastX
    const dy = e.clientY - s.lastY
    s.lastX = e.clientX
    s.lastY = e.clientY
    s.vx = dx * 0.006
    s.vy = dy * 0.006
  }
  const up = () => {
    s.dragging = false
    document.body.classList.remove('is-grabbing')
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', up)
  }
  s.down = (e) => {
    if (e.pointerType === 'touch') return
    e.stopPropagation()
    s.dragging = true
    s.lastX = e.clientX
    s.lastY = e.clientY
    document.body.classList.add('is-grabbing')
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }
  /** Call every frame: returns rotation deltas and decays inertia. */
  s.step = (dt) => {
    const out = [s.vx, s.vy]
    const damp = s.dragging ? 0.5 : Math.pow(0.04, dt)
    s.vx *= damp
    s.vy *= damp
    return out
  }
  return s
}
