import Icon from '../components/Icon'
import { footer, profile, socials } from '../data/content'
import { scrollToId } from '../lib/loop'

export default function Footer() {
  const letters = profile.name.toLowerCase().split('')
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div>
            {footer.columns[0].map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="footer__center">
            <p>
              {profile.university}, {profile.location.split(',')[0]}
            </p>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projects')
              }}
            >
              View Work
            </a>
          </div>
          <div className="footer__right">
            <p>{profile.availabilityText}</p>
            <button className="to-top" onClick={() => scrollToId('home')} aria-label="Back to top">
              <Icon name="arrowUp" />
            </button>
          </div>
        </div>

        <h2 className="footer__name" aria-label={profile.name}>
          {letters.map((ch, i) => (
            <span key={i} style={{ '--i': i }} aria-hidden="true">
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </h2>

        <div className="footer__bottom">
          <p>
            {footer.copyright} · Built with React, Three.js & GSAP
          </p>
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
          <p className="mono">
            Press <kbd>Ctrl</kbd> <kbd>K</kbd> anywhere
          </p>
        </div>
      </div>
    </footer>
  )
}
