import { useSyncExternalStore } from 'react'

/**
 * Tiny global store shared between the DOM (React) and the WebGL scene.
 * The 3D scene reads `store` directly inside useFrame (no re-renders);
 * React components subscribe with useStore(selector).
 */
export const store = {
  activeCategory: null, // skills category highlighted in the 3D sphere
  hoveredSkill: null,
  scrollVelocity: 0,
  pointer: { x: 0, y: 0 }, // normalised -1..1
  cursor: null, // label shown in the custom cursor ('Drag', 'View', ...)
  loaded: false,
  quality: 'high',
}

const listeners = new Set()

export function setStore(patch) {
  Object.assign(store, patch)
  listeners.forEach((l) => l())
}

const subscribe = (l) => {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function useStore(selector) {
  return useSyncExternalStore(subscribe, () => selector(store))
}

if (typeof window !== 'undefined') {
  window.addEventListener(
    'pointermove',
    (e) => {
      store.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      store.pointer.y = -(e.clientY / window.innerHeight) * 2 + 1
    },
    { passive: true },
  )
}
