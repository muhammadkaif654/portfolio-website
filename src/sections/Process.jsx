import { useEffect, useRef, useState } from 'react'
import { SplitText } from '../components/ui'
import { process } from '../data/content'
import { ScrollTrigger } from '../lib/loop'
import { setStore } from '../lib/store'

export default function Process() {
  const [step, setStep] = useState(0)
  const list = useRef()

  useEffect(() => {
    const items = [...list.current.querySelectorAll('.step')]
    let current = -1
    // active step = the last one whose top has crossed 60% of the viewport
    const update = () => {
      const line = window.innerHeight * 0.6
      let idx = 0
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top < line) idx = i
      })
      if (idx !== current) {
        current = idx
        setStep(idx)
        setStore({ processStep: idx })
      }
    }
    const trigger = ScrollTrigger.create({
      trigger: list.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: update,
      onRefresh: update,
    })
    return () => trigger.kill()
  }, [])

  return (
    <section id="process" className="section process">
      <div className="container process__grid">
        <div className="process__sticky">
          <span className="eyebrow" data-reveal>
            <span className="eyebrow__index">03</span>My Process
          </span>
          <SplitText as="h2" className="section-title section-title--sm" text={process.title} accent={['real-world']} />
          <p className="section-sub" data-reveal>
            {process.intro}
          </p>
          {/* WebGL pipeline is glued to this box */}
          <div id="process-3d" className="anchor anchor--pipeline" />
        </div>

        <ol className="process__steps" ref={list}>
          {process.steps.map((s, i) => (
            <li key={s.title} className={`step glass ${step === i ? 'is-active' : ''} ${i < step ? 'is-done' : ''}`}>
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {s.badge && <span className="step__badge">{s.badge}</span>}
              </div>
              <span className="step__bar" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
