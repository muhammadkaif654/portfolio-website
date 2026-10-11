import { useEffect, useRef, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { gsap } from '../lib/loop'
import { setStore } from '../lib/store'
import { profile } from '../data/content'

/** Intro preloader: real asset progress → curtain reveal → hero intro. */
export default function Loader({ webgl }) {
  const { progress } = useProgress()
  const [shown, setShown] = useState(0)
  const root = useRef()
  const done = useRef(false)
  const start = useRef(performance.now())
  const target = useRef(0)
  target.current = webgl ? progress : 100

  // smooth counter that eases toward the real loading progress
  useEffect(() => {
    let raf
    let value = 0
    const tick = () => {
      const elapsed = performance.now() - start.current
      // drei reports 0 until the first asset starts: let the counter creep, never block > 8s
      const goal = elapsed > 8000 ? 100 : Math.max(target.current, Math.min(elapsed / 40, 30))
      value += (goal - value) * 0.06 + (goal > value ? 0.2 : 0)
      value = Math.min(value, goal)
      setShown(value)
      if (value >= 99.9 && !done.current && elapsed > 1100) {
        done.current = true
        finish()
        return
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const finish = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (root.current) root.current.style.display = 'none'
      },
    })
    tl.to('.loader__inner', { y: -40, opacity: 0, duration: 0.5, ease: 'power2.in' })
      .to('.loader__panel', { scaleY: 0, duration: 0.9, ease: 'expo.inOut', stagger: 0.06 }, '-=0.1')
      .add(() => setStore({ loaded: true }), '-=0.7')
  }

  return (
    <div className="loader" ref={root} role="status" aria-live="polite">
      <div className="loader__panels">
        {[0, 1, 2, 3, 4].map((i) => (
          <div className="loader__panel" key={i} />
        ))}
      </div>
      <div className="loader__inner">
        <div className="loader__name">
          {profile.name.split('').map((ch, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.04}s` }}>
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        <div className="loader__bar">
          <div className="loader__fill" style={{ transform: `scaleX(${shown / 100})` }} />
        </div>
        <div className="loader__meta">
          <span>Initialising neural core</span>
          <span className="loader__count">{String(Math.floor(shown)).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
