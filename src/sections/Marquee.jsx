import { marquee } from '../data/content'

export default function Marquee() {
  const row = [...marquee, ...marquee]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__band marquee__band--a">
        <div className="marquee__track">
          {row.map((m, i) => (
            <span key={i}>
              {m} <i>✦</i>
            </span>
          ))}
        </div>
      </div>
      <div className="marquee__band marquee__band--b">
        <div className="marquee__track marquee__track--rev">
          {row.map((m, i) => (
            <span key={i}>
              {m} <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
