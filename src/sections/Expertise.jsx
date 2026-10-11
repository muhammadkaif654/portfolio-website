import Icon from '../components/Icon'
import { SectionHeading, TiltCard } from '../components/ui'
import { aiExpertise } from '../data/content'

/** Core AI focus areas — each one backed by a measurable result from a real project. */
export default function Expertise() {
  return (
    <section id="expertise" className="section expertise">
      <div className="container">
        <SectionHeading
          eyebrow="AI Expertise"
          title="Artificial Intelligence is my core"
          accent={['core']}
          sub="Full-stack and databases are how I ship — AI is what I build. These are the areas I go deep in, each backed by a project you can open."
        />
        <div className="expertise__grid">
          {aiExpertise.map((e, i) => (
            <TiltCard key={e.title} className="xcard glass" max={8} data-reveal>
              <div className="xcard__top pop">
                <span className="xcard__icon">
                  <Icon name={e.icon} />
                </span>
                <span className="xcard__num mono">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="pop-2">{e.title}</h3>
              <p>{e.text}</p>
              <div className="xcard__tags">
                {e.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {e.proof && (
                <div className="xcard__proof pop-2">
                  <Icon name="check" /> {e.proof}
                </div>
              )}
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
