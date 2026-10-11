import { useEffect, useState } from 'react'
import { github } from '../data/content'

const KEY = `gh-cache-${github.username}`
let pending = null

/** Fetches profile + repos once per session (cached in sessionStorage to respect GitHub's rate limit). */
function load() {
  if (pending) return pending
  try {
    const cached = JSON.parse(sessionStorage.getItem(KEY) || 'null')
    if (cached && Date.now() - cached.at < 30 * 60 * 1000) return (pending = Promise.resolve(cached.data))
  } catch {
    /* storage unavailable */
  }
  const base = `https://api.github.com/users/${github.username}`
  pending = Promise.all([
    fetch(base).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
    fetch(`${base}/repos?per_page=100&sort=updated`).then((r) => (r.ok ? r.json() : Promise.reject(r.status))),
  ])
    .then(([user, repos]) => {
      const data = { user, repos: Array.isArray(repos) ? repos : [] }
      try {
        sessionStorage.setItem(KEY, JSON.stringify({ at: Date.now(), data }))
      } catch {
        /* ignore */
      }
      return data
    })
    .catch(() => {
      pending = null
      return null
    })
  return pending
}

export function useGitHub() {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  useEffect(() => {
    let alive = true
    load().then((d) => {
      if (!alive) return
      if (d) setData(d)
      else setError(true)
    })
    return () => {
      alive = false
    }
  }, [])
  return { data, error }
}
