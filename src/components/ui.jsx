import { useEffect, useRef, useState } from 'react'
import { isTouch, prefersReducedMotion } from '../lib/device'

const CHARS = '!<>-_/[]{}=+*^?#01'

/** Wrap any element to make it gently follow the pointer. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef()
  if (isTouch) return <span className={`magnetic ${className}`}>{children}</span>
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * strength
    const y = (e.clientY - r.top - r.height / 2) * strength
    ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
  }
  const leave = () => {
    ref.current.style.transform = ''
  }
  return (
    <span ref={ref} className={`magnetic ${className}`} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </span>
  )
}

/**
 * CSS 3D tilt card with a moving glare. Children with class .pop / .pop-2
 * are pushed forward in Z so they float above the card.
 */
export function TiltCard({ children, className = '', max = 12, as: Tag = 'div', ...rest }) {
  const ref = useRef()
  const disabled = isTouch || prefersReducedMotion
  const move = (e) => {
    if (disabled) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const s = ref.current.style
    s.setProperty('--rx', `${(0.5 - py) * max}deg`)
    s.setProperty('--ry', `${(px - 0.5) * max}deg`)
    s.setProperty('--gx', `${px * 100}%`)
    s.setProperty('--gy', `${py * 100}%`)
    ref.current.classList.add('is-tilting')
  }
  const leave = () => {
    if (disabled) return
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
    ref.current.classList.remove('is-tilting')
  }
  return (
    <Tag ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest}>
      <div className="tilt__inner">
        {children}
        <div className="tilt__glare" />
      </div>
    </Tag>
  )
}

/** Splits a heading into words so each one can flip up in 3D when scrolled into view. */
export function SplitText({ text, as: Tag = 'h2', className = '', accent = [] }) {
  const words = text.split(' ')
  return (
    <Tag className={`split ${className}`} data-split aria-label={text}>
      {words.map((w, i) => (
        <span className="split__mask" key={i} aria-hidden="true">
          <span className={`split__word ${accent.includes(w) ? 'is-accent' : ''}`}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export function SectionHeading({ eyebrow, title, sub, align = 'center', index, accent }) {
  return (
    <header className={`section-heading section-heading--${align}`}>
      {eyebrow && (
        <span className="eyebrow" data-reveal>
          {index && <span className="eyebrow__index">{index}</span>}
          {eyebrow}
        </span>
      )}
      <SplitText as="h2" className="section-title" text={title} accent={accent} />
      {sub && (
        <p className="section-sub" data-reveal>
          {sub}
        </p>
      )}
    </header>
  )
}

/** Cycles through words with a "decoding" scramble effect. */
export function Scramble({ words, interval = 2600, start = true }) {
  const [text, setText] = useState(words[0])
  const current = useRef(words[0])

  useEffect(() => {
    if (!start || prefersReducedMotion || words.length < 2) return
    let idx = 0
    let frame
    let timer
    const run = () => {
      idx = (idx + 1) % words.length
      const from = current.current
      const to = words[idx]
      const len = Math.max(from.length, to.length)
      const queue = Array.from({ length: len }, (_, i) => ({
        from: from[i] || '',
        to: to[i] || '',
        start: Math.floor(Math.random() * 16),
        end: Math.floor(Math.random() * 16) + 16,
      }))
      let f = 0
      const step = () => {
        let out = ''
        let complete = 0
        for (const q of queue) {
          if (f >= q.end) {
            complete++
            out += q.to
          } else if (f >= q.start) out += CHARS[Math.floor(Math.random() * CHARS.length)]
          else out += q.from
        }
        current.current = out
        setText(out)
        f++
        if (complete < queue.length) frame = requestAnimationFrame(step)
        else timer = setTimeout(run, interval)
      }
      step()
    }
    timer = setTimeout(run, interval)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
    }
  }, [start, words, interval])

  return <span className="scramble">{text}</span>
}

/** Number that counts up when it scrolls into view. */
export function Counter({ value, plain = false, suffix = '' }) {
  const ref = useRef()
  const [n, setN] = useState(plain ? value : 0)
  useEffect(() => {
    if (plain || prefersReducedMotion) {
      setN(value)
      return
    }
    const el = ref.current
    let raf
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (t) => {
          const p = Math.min((t - t0) / 1600, 1)
          setN(Math.round(value * (1 - Math.pow(1 - p, 4))))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, plain])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}
