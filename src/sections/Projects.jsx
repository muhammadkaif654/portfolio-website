import { useLayoutEffect, useRef, useState } from 'react'
import Icon from '../components/Icon'
import { SectionHeading } from '../components/ui'
import { projectFilters, projects, socials } from '../data/content'
import { gsap, ScrollTrigger, addFrameHook } from '../lib/loop'
import { prefersReducedMotion } from '../lib/device'

const HUES = { ai: 4, cv: 18, web: 350, systems: 28 }

function ProjectCover({ p, index }) {
  if (p.image) return <img className="pcard__img" src={p.image} alt="" loading="lazy" />
  return (
    <div className="pcard__art" style={{ '--h': HUES[p.category] ?? 4 }}>
      <span className="pcard__art-num">{String(index + 1).padStart(2, '0')}</span>
      <span className="pcard__art-emoji">{p.flag.split(' ')[0]}</span>
      <span className="pcard__art-grid" />
      <span className="pcard__art-orb" />
    </div>
  )
}

function ProjectCard({ p, index, onOpen }) {
  return (
    <article className="pcard" data-cursor="Open" onClick={() => onOpen(p)}>
      <div className="pcard__inner glass">
        <ProjectCover p={p} index={index} />
        <div className="pcard__body">
          <div className="pcard__meta mono">
            <span>{p.flag.replace(/^\S+\s/, '')}</span>
            <span>{p.year}</span>
          </div>
          <h3 className="pcard__title">{p.title}</h3>
          <p className="pcard__summary">{p.summary}</p>
          <div className="pcard__tech">
            {p.tech.slice(0, 4).map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <div className="pcard__links" onClick={(e) => e.stopPropagation()}>
            {p.links.github && (
              <a href={p.links.github} target="_blank" rel="noreferrer" className="btn btn--ghost btn--sm">
                <Icon name="github" /> Code
              </a>
            )}
            {p.links.live && (
              <a href={p.links.live} target="_blank" rel="noreferrer" className="btn btn--primary btn--sm">
                <Icon name="external" /> Live
              </a>
            )}
            <button className="pcard__more" onClick={() => onOpen(p)} aria-label={`Open ${p.title} details`}>
              <Icon name="arrowRight" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Projects({ onOpen }) {
  const [filter, setFilter] = useState('all')
  const section = useRef()
  const pin = useRef()
  const track = useRef()
  const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter)
  const github = socials.find((s) => s.icon === 'github')?.url

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1000px)', () => {
      if (prefersReducedMotion) return
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth + 80)
      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      // coverflow: rotate cards in 3D depending on distance from screen centre
      const cards = [...track.current.querySelectorAll('.pcard')]
      const remove = addFrameHook(() => {
        const vw = window.innerWidth
        const r0 = pin.current.getBoundingClientRect()
        if (r0.bottom < 0 || r0.top > window.innerHeight) return
        for (const c of cards) {
          const r = c.getBoundingClientRect()
          const off = (r.left + r.width / 2 - vw / 2) / vw
          const rot = Math.max(-1, Math.min(1, off)) * -28
          const z = -Math.abs(off) * 180
          c.firstChild.style.transform = `translateZ(${z}px) rotateY(${rot}deg)`
          c.style.setProperty('--focus', String(Math.max(0, 1 - Math.abs(off) * 1.8)))
        }
      })
      return () => {
        remove()
        tween.scrollTrigger?.kill()
        tween.kill()
        cards.forEach((c) => (c.firstChild.style.transform = ''))
      }
    })
    ScrollTrigger.refresh()
    return () => mm.revert()
  }, [filter])

  return (
    <section id="projects" className="section projects" ref={section}>
      <div className="container">
        <SectionHeading index="04" eyebrow="Featured Projects" title="Work that speaks for itself" accent={['itself']} />
        <div className="filters" role="tablist" data-reveal>
          {projectFilters.map((f) => {
            const count = f.id === 'all' ? projects.length : projects.filter((p) => p.category === f.id).length
            if (!count) return null
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={filter === f.id}
                className={`filter ${filter === f.id ? 'is-active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <sup>{count}</sup>
              </button>
            )
          })}
        </div>
      </div>

      <div className="projects__pin" ref={pin}>
        <div className="projects__track" ref={track} key={filter}>
          {list.map((p, i) => (
            <ProjectCard key={p.id} p={p} index={projects.indexOf(p)} onOpen={onOpen} />
          ))}
          <a className="pcard pcard--more" href={github} target="_blank" rel="noreferrer" data-cursor="GitHub">
            <div className="pcard__inner glass">
              <Icon name="github" />
              <strong>More on GitHub</strong>
              <span className="mono">Experiments, games & coursework</span>
              <Icon name="external" />
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
