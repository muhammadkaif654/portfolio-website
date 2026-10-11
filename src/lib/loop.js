import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { prefersReducedMotion } from './device'
import { store } from './store'

gsap.registerPlugin(ScrollTrigger)

/**
 * One single animation loop for the whole site:
 *   gsap.ticker → Lenis smooth scroll → ScrollTrigger → WebGL render.
 * Rendering the canvas *after* the scroll update in the same frame keeps
 * 3D objects glued to their DOM anchors with zero lag.
 */
let lenis = null
const hooks = new Set()
let lastY = 0

export function initLoop() {
  if (!prefersReducedMotion) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
  }
  gsap.ticker.add((time) => {
    if (lenis) lenis.raf(time * 1000)
    const y = window.scrollY
    store.scrollVelocity += (y - lastY - store.scrollVelocity) * 0.2
    lastY = y
    hooks.forEach((fn) => fn(time))
  })
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function addFrameHook(fn) {
  hooks.add(fn)
  return () => hooks.delete(fn)
}

export function scrollToId(id, opts = {}) {
  const el = typeof id === 'string' ? document.getElementById(id) : id
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: id === 'home' ? 0 : -20, duration: 1.4, ...opts })
  else el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

export function stopScroll(stop) {
  if (!lenis) {
    document.documentElement.style.overflow = stop ? 'hidden' : ''
    return
  }
  stop ? lenis.stop() : lenis.start()
}

export { gsap, ScrollTrigger }

if (import.meta.env.DEV) Object.assign(window, { gsap, ScrollTrigger, getLenis: () => lenis })
