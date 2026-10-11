import { useEffect, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { SectionHeading } from '../components/ui'
import { testimonials } from '../data/content'
import { addFrameHook } from '../lib/loop'
import { prefersReducedMotion } from '../lib/device'

/** A 3D carousel ring of quotes — drag / use arrows, auto-rotates. */
export default function Testimonials() {
  const items = testimonials.items
  const ring = useRef()
  const [active, setActive] = useState(0)
  const angle = useRef(0)
  const target = useRef(0)
  const paused = useRef(false)
  const n = items.length
  // cards sit on an arc 38° apart so neighbours peek in at an angle
  const step = 38
  const go = (d) => {
    const next = (((Math.round(-target.current / step) + d) % n) + n) % n
    target.current = -next * step
  }

  useEffect(() => {
    if (!testimonials.enabled || !n) return
    let last = performance.now()
    let idle = 0
    const remove = addFrameHook(() => {
      const now = performance.now()
      const dt = (now - last) / 1000
      last = now
      if (!paused.current && !prefersReducedMotion) {
        idle += dt
        if (idle > 4.5) {
          idle = 0
          go(1)
        }
      } else idle = 0
      angle.current += (target.current - angle.current) * 0.08
      if (ring.current) ring.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateY(${angle.current}deg)`
      setActive(Math.round(-target.current / step))
    })
    return remove
  }, [n])

  if (!testimonials.enabled || !n) return null

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <SectionHeading eyebrow="Kind Words" title="What people say" sub="Feedback from professors, teammates and collaborators." />
      </div>
      <div
        className="carousel"
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        style={{ '--n': n }}
      >
        <div className="carousel__stage">
          <div className="carousel__ring" ref={ring}>
            {items.map((t, i) => (
              <figure
                key={i}
                className={`quote glass ${i === active ? 'is-active' : ''}`}
                style={{ transform: `rotateY(${i * step}deg) translateZ(var(--r))` }}
              >
                <Icon name="quote" className="quote__mark" />
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <span className="quote__avatar">{t.name.charAt(0)}</span>
                  <span>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="carousel__controls">
          <button className="icon-btn" onClick={() => go(-1)} aria-label="Previous">
            <Icon name="arrowRight" style={{ transform: 'rotate(180deg)' }} />
          </button>
          <div className="carousel__dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={i === active ? 'is-active' : ''}
                onClick={() => (target.current = -i * step)}
                aria-label={`Show testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button className="icon-btn" onClick={() => go(1)} aria-label="Next">
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
    </section>
  )
}
