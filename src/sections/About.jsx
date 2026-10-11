import Icon from '../components/Icon'
import { Counter, SplitText, TiltCard } from '../components/ui'
import { coreStacks, currently, profile, projects, skillCategories, stats } from '../data/content'
import { useGitHub } from '../lib/github'

function statValue(s, gh) {
  if (s.from === 'projects') return projects.length
  if (s.from === 'skills') return skillCategories.reduce((n, c) => n + c.skills.length, 0)
  if (s.live === 'repos' && gh?.user?.public_repos) return gh.user.public_repos
  return s.value
}

export default function About() {
  const { data } = useGitHub()
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__badge-col">
          {/* The WebGL lanyard badge hangs inside this box */}
          <div id="about-badge" className="anchor anchor--badge">
            <img className="anchor-fallback badge-fallback" src={profile.photo} alt={profile.name} />
          </div>
          <p className="about__hint mono">
            <Icon name="sparkle" /> drag the badge · click to flip
          </p>
        </div>

        <div className="about__copy">
          <span className="eyebrow" data-reveal>
            <span className="eyebrow__index">01</span>About me
          </span>
          <SplitText as="h2" className="section-title" text="Hello! I build things that think." accent={['think.']} />
          <p className="about__bio" data-reveal>
            {profile.bio}
          </p>

          <div className="chips" data-reveal>
            {coreStacks.map((c) => (
              <span className="chip chip--lg" key={c.label}>
                <Icon name={c.icon} /> {c.label}
              </span>
            ))}
          </div>

          <TiltCard className="now-card glass" max={6} data-reveal>
            <div className="now-card__head pop">
              <span className="pulse-dot" /> Currently
            </div>
            <ul className="now-card__list">
              {currently.map((c) => (
                <li key={c.label} className="pop">
                  <span className="now-card__icon">
                    <Icon name={c.icon} />
                  </span>
                  <span>
                    <small>{c.label}</small>
                    {c.value}
                  </span>
                </li>
              ))}
            </ul>
          </TiltCard>
        </div>
      </div>

      <div className="container stats" data-reveal-group>
        {stats.map((s) => (
          <div className="stat" key={s.label} data-reveal>
            <div className="stat__value">
              <Counter value={statValue(s, data)} plain={s.plain} suffix={s.suffix || ''} />
            </div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
