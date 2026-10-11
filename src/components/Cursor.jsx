import { useEffect, useRef } from 'react'
import { addFrameHook } from '../lib/loop'
import { store } from '../lib/store'
import { isTouch } from '../lib/device'

/** Dot + lagging ring cursor. Shows contextual labels from the 3D scene (store.cursor) or [data-cursor]. */
export default function Cursor() {
  const dot = useRef()
  const ring = useRef()
  const label = useRef()

  useEffect(() => {
    if (isTouch) return
    const pos = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...pos }
    let hover = false
    let domLabel = ''
    let current = null
    const move = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      hover = !!e.target.closest?.('a, button, [data-cursor], input, textarea, label, select')
      domLabel = e.target.closest?.('[data-cursor]')?.dataset.cursor || ''
    }
    const down = () => ring.current?.classList.add('is-down')
    const up = () => ring.current?.classList.remove('is-down')
    const leave = () => document.documentElement.classList.add('cursor-out')
    const enter = () => document.documentElement.classList.remove('cursor-out')
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    const remove = addFrameHook(() => {
      ringPos.x += (pos.x - ringPos.x) * 0.2
      ringPos.y += (pos.y - ringPos.y) * 0.2
      dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`
      const l = store.cursor || domLabel
      if (l !== current) {
        current = l
        label.current.textContent = l
        ring.current.classList.toggle('has-label', !!l)
      }
      ring.current.classList.toggle('is-hover', hover || !!store.cursor)
    })
    document.documentElement.classList.add('has-cursor')
    return () => {
      remove()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])

  if (isTouch) return null
  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring}>
        <span ref={label} />
      </div>
    </>
  )
}
