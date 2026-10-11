import { useState } from 'react'
import { SectionHeading } from '../components/ui'
import { softSkills } from '../data/content'

/** 3D flip cards — hover (or tap on mobile) to flip. */
export default function SoftSkills() {
  const [flipped, setFlipped] = useState(null)
  return (
    <section className="section soft">
      <div className="container">
        <SectionHeading
          eyebrow="Core Competencies"
          title="Professional Soft Skills"
          sub="Essential traits that make me an effective engineer, coordinator, and communicator."
        />
        <div className="soft__grid">
          {softSkills.map((s, i) => (
            <button
              type="button"
              key={s.title}
              className={`flip ${flipped === i ? 'is-flipped' : ''}`}
              onClick={() => setFlipped(flipped === i ? null : i)}
              data-reveal
              data-cursor="Flip"
              aria-label={`${s.title}: ${s.text}`}
            >
              <span className="flip__inner">
                <span className="flip__face flip__front glass">
                  <span className="flip__num mono">{String(i + 1).padStart(2, '0')}</span>
                  <span className="flip__emoji">{s.emoji}</span>
                  <span className="flip__title">{s.title}</span>
                </span>
                <span className="flip__face flip__back">
                  <span className="flip__title">{s.title}</span>
                  <span className="flip__text">{s.text}</span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
