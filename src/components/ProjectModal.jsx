import { useEffect } from 'react'
import Icon from './Icon'
import { stopScroll } from '../lib/loop'

/** Case-study modal. Fill `details`, `highlights`, `image`, `links.live`, `links.video` in content.js. */
export default function ProjectModal({ project: p, onClose }) {
  useEffect(() => {
    if (!p) return
    stopScroll(true)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      stopScroll(false)
      window.removeEventListener('keydown', onKey)
    }
  }, [p, onClose])

  return (
    <div className={`modal ${p ? 'is-open' : ''}`} onClick={onClose} aria-hidden={!p}>
      {p && (
        <div className="modal__box" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={p.title} data-lenis-prevent>
          <button className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
          <div className="modal__cover">
            {p.image ? <img src={p.image} alt="" /> : <div className="modal__art">{p.flag.split(' ')[0]}</div>}
          </div>
          <div className="modal__body">
            <div className="mono modal__meta">
              <span>{p.flag.replace(/^\S+\s/, '')}</span>
              <span>{p.year}</span>
            </div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            {p.highlights?.length > 0 && (
              <ul className="modal__highlights">
                {p.highlights.map((h) => (
                  <li key={h}>
                    <Icon name="check" /> {h}
                  </li>
                ))}
              </ul>
            )}
            {p.details && (
              <div className="modal__details">
                {Object.entries(p.details).map(([k, v]) => (
                  <div key={k}>
                    <h4>{k}</h4>
                    <p>{v}</p>
                  </div>
                ))}
              </div>
            )}
            {p.links.video && (
              <div className="modal__video">
                <iframe src={p.links.video} title={`${p.title} demo`} allowFullScreen loading="lazy" />
              </div>
            )}
            <div className="chips">
              {p.tech.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
            <div className="modal__actions">
              {p.links.github && (
                <a className="btn btn--ghost" href={p.links.github} target="_blank" rel="noreferrer">
                  <Icon name="github" /> View code
                </a>
              )}
              {p.links.live && (
                <a className="btn btn--primary" href={p.links.live} target="_blank" rel="noreferrer">
                  <Icon name="external" /> Live demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
