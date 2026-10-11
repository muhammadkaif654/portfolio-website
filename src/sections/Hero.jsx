import { useEffect, useRef } from 'react'
import Icon from '../components/Icon'
import { Magnetic, Scramble } from '../components/ui'
import { profile, socials } from '../data/content'
import { useStore } from '../lib/store'
import { gsap, scrollToId } from '../lib/loop'

export default function Hero() {
  const loaded = useStore((s) => s.loaded)
  const root = useRef()

  useEffect(() => {
    if (!loaded) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'expo.out' } })
        .from('.hero__chip', { y: 20, opacity: 0, duration: 1 })
        .from('.hero__line > span', { yPercent: 110, rotateX: -60, opacity: 0, duration: 1.4, stagger: 0.1 }, '-=0.8')
        .from('.hero__tagline, .hero__ctas > *, .hero__socials > *', { y: 24, opacity: 0, duration: 1, stagger: 0.06 }, '-=1')
        .from('.hero__hud', { opacity: 0, duration: 1.2 }, '-=0.8')
    }, root)
    return () => ctx.revert()
  }, [loaded])

  return (
    <section id="home" className="hero" ref={root}>
      <div className="hero__grid container">
        <div className="hero__copy">
          {profile.available && (
            <div className="hero__chip">
              <span className="pulse-dot" /> {profile.availabilityText}
            </div>
          )}
          <h1 className="hero__title">
            <span className="hero__line">
              <span>Hi, I'm {profile.firstName},</span>
            </span>
            <span className="hero__line hero__line--accent">
              <span>
                <Scramble words={profile.roles} start={loaded} />
              </span>
            </span>
          </h1>
          <p className="hero__tagline">{profile.tagline}</p>
          <div className="hero__ctas">
            <Magnetic>
              <a
                href="#projects"
                className="btn btn--primary"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('projects')
                }}
              >
                View My Work <Icon name="arrowRight" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="btn btn--ghost"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('contact')
                }}
              >
                Contact Me
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resumeUrl} className="btn btn--ghost" target="_blank" rel="noreferrer">
                <Icon name="download" /> Resume
              </a>
            </Magnetic>
          </div>
          <div className="hero__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="icon-btn">
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* The WebGL "AI core" is glued to this box */}
        <div className="hero__stage">
          <div id="hero-core" className="anchor anchor--core" data-cursor="">
            <div className="anchor-fallback core-fallback" />
          </div>
          <div className="hero__hud">
            <span className="hud hud--tl">
              <b>NEURAL CORE</b> v2.0
            </span>
            <span className="hud hud--br">
              click the core <Icon name="sparkle" />
            </span>
          </div>
        </div>
      </div>

      <button className="scroll-cue" onClick={() => scrollToId('about')} aria-label="Scroll to about">
        <span className="scroll-cue__mouse">
          <span />
        </span>
        <span className="mono">Scroll to explore</span>
      </button>
    </section>
  )
}
