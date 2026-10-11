import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { Magnetic } from './ui'
import { nav, profile } from '../data/content'
import { scrollToId, addFrameHook } from '../lib/loop'

export default function Navbar({ onOpenPalette }) {
  const [active, setActive] = useState('home')
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const bar = useRef()

  useEffect(() => {
    let lastY = 0
    const remove = addFrameHook(() => {
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - innerHeight
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
      const goingDown = y > lastY + 2
      const goingUp = y < lastY - 2
      if (goingDown && y > 300) setHidden(true)
      else if (goingUp) setHidden(false)
      setScrolled(y > 40)
      lastY = y
    })
    const ids = nav.map((n) => n.id)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      remove()
      io.disconnect()
    }
  }, [])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <>
      <header className={`navbar ${hidden && !open ? 'is-hidden' : ''} ${scrolled ? 'is-scrolled' : ''}`}>
        <a href="#home" className="logo" onClick={go('home')} aria-label="Home">
          {profile.logo}
          <span>.</span>
        </a>
        <nav className="navbar__links" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'is-active' : ''}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="navbar__actions">
          <button className="kbd-btn" onClick={onOpenPalette} aria-label="Open command menu">
            <Icon name="search" />
            <span className="kbd-btn__label">
              <kbd>Ctrl</kbd>
              <kbd>K</kbd>
            </span>
          </button>
          <Magnetic>
            <a href="#contact" className="btn btn--primary btn--sm" onClick={go('contact')}>
              Hire Me
            </a>
          </Magnetic>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="navbar__progress" ref={bar} />
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav>
          {nav.map((n, i) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} style={{ transitionDelay: `${open ? 0.1 + i * 0.05 : 0}s` }}>
              <span className="mono">0{i + 1}</span>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
