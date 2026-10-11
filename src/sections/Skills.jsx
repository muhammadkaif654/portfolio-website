import Icon from '../components/Icon'
import { SectionHeading, TiltCard } from '../components/ui'
import { skillCategories } from '../data/content'
import { setStore, useStore } from '../lib/store'

export default function Skills() {
  const active = useStore((s) => s.activeCategory)
  const hovered = useStore((s) => s.hoveredSkill)
  const toggle = (id) => setStore({ activeCategory: active === id ? null : id })

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Technical Stack"
          title="My Skillset"
          sub="A comprehensive overview of my expertise in AI systems, automation, and full-stack development. Spin the sphere — or pick a category to light it up."
        />
        <div className="skills__legend" data-reveal>
          <span>
            <i className="dot dot--core" /> Solid = Hands-on project experience
          </span>
          <span>
            <i className="dot dot--familiar" /> Outline = Familiar / Learning
          </span>
        </div>

        <div className="skills__grid">
          <div className="skills__sphere-col">
            <div id="skills-sphere" className="anchor anchor--sphere" />
            <div className={`skills__readout mono ${hovered ? 'is-on' : ''}`} aria-live="polite">
              {hovered ? (
                <>
                  <span className={`dot ${hovered.level === 'core' ? 'dot--core' : 'dot--familiar'}`} />
                  {hovered.name}
                  <em>{hovered.level === 'core' ? 'hands-on' : 'learning'}</em>
                </>
              ) : (
                <>drag to spin · hover a skill</>
              )}
            </div>
          </div>

          <div className="skills__cards">
            {skillCategories.map((c, i) => (
              <TiltCard
                key={c.id}
                as="button"
                type="button"
                max={8}
                className={`skill-card glass ${active === c.id ? 'is-active' : ''} ${active && active !== c.id ? 'is-dim' : ''}`}
                onClick={() => toggle(c.id)}
                aria-pressed={active === c.id}
                data-reveal
                style={{ '--d': `${i * 0.04}s` }}
              >
                <div className="skill-card__head pop">
                  <span className="skill-card__icon">
                    <Icon name={c.icon} />
                  </span>
                  <h3>{c.title}</h3>
                  <span className="skill-card__count mono">{String(c.skills.length).padStart(2, '0')}</span>
                </div>
                <div className="pills pop-2">
                  {c.skills.map((s) => (
                    <span key={s.name} className={`pill ${s.level === 'core' ? 'pill--core' : 'pill--familiar'}`}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
