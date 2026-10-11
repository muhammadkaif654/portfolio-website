const hasWindow = typeof window !== 'undefined'

export const prefersReducedMotion =
  hasWindow && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const isTouch = hasWindow && window.matchMedia('(hover: none), (pointer: coarse)').matches

export const isMobile = hasWindow && (window.innerWidth < 768 || isTouch)

export const isLowEnd =
  hasWindow && ((navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4)

export const webglAvailable = (() => {
  if (!hasWindow) return false
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
})()
