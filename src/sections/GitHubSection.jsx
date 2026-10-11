import Icon from '../components/Icon'
import { SectionHeading, TiltCard } from '../components/ui'
import { github } from '../data/content'
import { useGitHub } from '../lib/github'

const LANG_COLORS = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
  Dart: '#00B4AB',
}

function timeAgo(date) {
  const s = (Date.now() - new Date(date).getTime()) / 1000
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
  ]
  for (const [u, sec] of units) {
    const n = Math.floor(s / sec)
    if (n >= 1) return `${n} ${u}${n > 1 ? 's' : ''} ago`
  }
  return 'just now'
}

/** Live data from the GitHub API — always up to date, no manual edits needed. */
export default function GitHubSection() {
  const { data, error } = useGitHub()
  if (!github.enabled) return null

  const repos = (data?.repos || []).filter((r) => !r.fork && !github.exclude.includes(r.name))
  const shown = repos.slice(0, github.maxRepos)
  const langs = {}
  repos.forEach((r) => r.language && (langs[r.language] = (langs[r.language] || 0) + 1))
  const totalLang = Object.values(langs).reduce((a, b) => a + b, 0)
  const langList = Object.entries(langs).sort((a, b) => b[1] - a[1])
  const profileUrl = `https://github.com/${github.username}`

  return (
    <section id="github" className="section gh">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Live from GitHub"
          title="Latest commits & experiments"
          sub="Pulled live from the GitHub API — what I'm shipping right now."
        />

        <div className="gh__summary glass" data-reveal>
          <div className="gh__user">
            {data?.user?.avatar_url ? <img src={data.user.avatar_url} alt="" width="56" height="56" /> : <span className="gh__avatar" />}
            <div>
              <strong>@{github.username}</strong>
              <span className="mono">
                {data ? `${data.user.public_repos} public repos · since ${new Date(data.user.created_at).getFullYear()}` : error ? 'GitHub is taking a break — try again later' : 'Connecting to GitHub…'}
              </span>
            </div>
            <a className="btn btn--ghost btn--sm" href={profileUrl} target="_blank" rel="noreferrer">
              <Icon name="github" /> Follow
            </a>
          </div>
          {langList.length > 0 && (
            <div className="gh__langs">
              <div className="gh__bar">
                {langList.map(([l, n]) => (
                  <span key={l} style={{ flex: n, background: LANG_COLORS[l] || '#888' }} title={l} />
                ))}
              </div>
              <div className="gh__legend">
                {langList.map(([l, n]) => (
                  <span key={l}>
                    <i style={{ background: LANG_COLORS[l] || '#888' }} />
                    {l} <em>{Math.round((n / totalLang) * 100)}%</em>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="gh__grid">
          {(shown.length ? shown : Array.from({ length: error ? 0 : github.maxRepos })).map((r, i) =>
            r ? (
              <TiltCard key={r.id} as="a" href={r.html_url} target="_blank" rel="noreferrer" className="repo glass" max={10} data-cursor="Repo">
                <div className="repo__head pop">
                  <Icon name="folder" />
                  <strong>{r.name}</strong>
                  <Icon name="external" className="repo__ext" />
                </div>
                <p className="repo__desc">{r.description || 'No description yet.'}</p>
                <div className="repo__meta mono">
                  {r.language && (
                    <span>
                      <i style={{ background: LANG_COLORS[r.language] || '#888' }} />
                      {r.language}
                    </span>
                  )}
                  <span>
                    <Icon name="star" /> {r.stargazers_count}
                  </span>
                  <span>
                    <Icon name="fork" /> {r.forks_count}
                  </span>
                  <span className="repo__time">{timeAgo(r.pushed_at)}</span>
                </div>
              </TiltCard>
            ) : (
              <div key={i} className="repo repo--skeleton glass" />
            ),
          )}
        </div>
      </div>
    </section>
  )
}
