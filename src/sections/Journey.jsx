import { useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { SectionHeading, TiltCard } from '../components/ui'
import { certifications, journey } from '../data/content'
import { gsap } from '../lib/loop'

const TYPE_ICON = { education: 'graduation', experience: 'briefcase', leadership: 'users', award: 'award' }

export default function Journey() {
  const line = useRef()
  const wrap = useRef()

  useEffect(() => {
    const t = gsap.fromTo(
      line.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: wrap.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
      },
    )
    return () => {
      t.scrollTrigger?.kill()
      t.kill()
    }
  }, [])

  return (
    <section id="journey" className="section journey">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Journey"
          title="Academic & Professional Journey"
          sub="Building a robust foundation in engineering and intelligent systems."
        />

        <div className="timeline" ref={wrap}>
          <div className="timeline__rail">
            <div className="timeline__fill" ref={line} />
          </div>
          {journey.map((j, i) => (
            <div key={j.title + i} className={`timeline__item ${i % 2 ? 'is-right' : 'is-left'}`} data-reveal>
              <span className="timeline__node">
                <Icon name={TYPE_ICON[j.type] || 'sparkle'} />
              </span>
              <TiltCard className="timeline__card glass" max={7}>
                <div className="pop">
                  <div className="timeline__meta mono">
                    <span className={`type type--${j.type}`}>{j.type}</span>
                    <span>{j.period}</span>
                  </div>
                  <h3>{j.title}</h3>
                  <p className="timeline__org">
                    {j.org}
                    {j.location && (
                      <span>
                        <Icon name="pin" /> {j.location}
                      </span>
                    )}
                  </p>
                  <p>{j.text}</p>
                  {j.tags?.length > 0 && (
                    <div className="chips">
                      {j.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

        {certifications.enabled && (
          <div className="certs">
            <SectionHeading
              eyebrow="Certifications"
              title="Certifications & Milestones"
              sub="Milestones and program validations that showcase my technical and community engagements."
            />
            <div className="certs__grid">
              {certifications.items.map((c) => {
                const Tag = c.url ? 'a' : 'div'
                return (
                  <TiltCard key={c.title} className="cert holo" max={14} data-reveal>
                    <Tag className="cert__link" {...(c.url ? { href: c.url, target: '_blank', rel: 'noreferrer' } : {})}>
                      <span className="cert__icon pop">
                        <Icon name={c.icon} />
                      </span>
                      <span className="cert__info pop-2">
                        <strong>{c.title}</strong>
                        <span>{c.issuer}</span>
                        {c.date && <small className="mono">{c.date}</small>}
                      </span>
                    </Tag>
                  </TiltCard>
                )
              })}
            </div>
            {certifications.folderUrl && (
              <div className="center" data-reveal>
                <a className="btn btn--primary" href={certifications.folderUrl} target="_blank" rel="noreferrer">
                  <Icon name="award" /> View All Certificates <Icon name="arrowRight" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
