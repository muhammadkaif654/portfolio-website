import { useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon'
import { nav, profile, socials, projects } from '../data/content'
import { scrollToId, stopScroll } from '../lib/loop'

/** ⌘K / Ctrl+K command menu — jump anywhere, open links, copy email. */
export default function CommandPalette({ open, setOpen, onOpenProject, toast }) {
  const [q, setQ] = useState('')
  const [i, setI] = useState(0)
  const input = useRef()

  const items = useMemo(
    () => [
      ...nav.map((n) => ({ group: 'Navigate', label: `Go to ${n.label}`, icon: 'arrowRight', run: () => scrollToId(n.id) })),
      ...projects.map((p) => ({ group: 'Projects', label: p.title, icon: 'folder', run: () => onOpenProject(p) })),
      ...socials.map((s) => ({
        group: 'Links',
        label: `Open ${s.label}`,
        icon: s.icon,
        run: () => window.open(s.url, s.url.startsWith('mailto') ? '_self' : '_blank', 'noopener'),
      })),
      {
        group: 'Actions',
        label: 'Copy email address',
        icon: 'copy',
        run: () => {
          navigator.clipboard?.writeText(profile.email)
          toast('Email copied to clipboard')
        },
      },
      { group: 'Actions', label: 'Download resume', icon: 'download', run: () => window.open(profile.resumeUrl, '_blank') },
    ],
    [onOpenProject, toast],
  )

  const filtered = items.filter((it) => it.label.toLowerCase().includes(q.toLowerCase()))

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  useEffect(() => {
    stopScroll(open)
    if (open) {
      setQ('')
      setI(0)
      setTimeout(() => input.current?.focus(), 30)
    }
  }, [open])

  const run = (it) => {
    setOpen(false)
    setTimeout(it.run, 80)
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setI((x) => Math.min(x + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setI((x) => Math.max(x - 1, 0))
    } else if (e.key === 'Enter' && filtered[i]) run(filtered[i])
  }

  let lastGroup = null
  return (
    <div className={`palette ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)} aria-hidden={!open}>
      <div className="palette__box" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command menu">
        <div className="palette__search">
          <Icon name="search" />
          <input
            ref={input}
            value={q}
            onChange={(e) => {
              setQ(e.target.value)
              setI(0)
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            aria-label="Search commands"
          />
          <kbd>Esc</kbd>
        </div>
        <ul className="palette__list" data-lenis-prevent>
          {filtered.length === 0 && <li className="palette__empty">No results for “{q}”</li>}
          {filtered.map((it, idx) => {
            const header = it.group !== lastGroup ? it.group : null
            lastGroup = it.group
            return (
              <li key={it.group + it.label}>
                {header && <div className="palette__group">{header}</div>}
                <button
                  className={`palette__item ${idx === i ? 'is-active' : ''}`}
                  onMouseEnter={() => setI(idx)}
                  onClick={() => run(it)}
                >
                  <Icon name={it.icon} />
                  <span>{it.label}</span>
                  <Icon name="arrowRight" className="palette__go" />
                </button>
              </li>
            )
          })}
        </ul>
        <div className="palette__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
        </div>
      </div>
    </div>
  )
}
