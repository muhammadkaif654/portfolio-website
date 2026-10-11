import { useEffect, useState } from 'react'
import Icon from '../components/Icon'
import { Magnetic, SplitText } from '../components/ui'
import { contact, profile, socials } from '../data/content'

function LocalTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: profile.timezone }).format(new Date())
  const [t, setT] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setT(fmt()), 1000)
    return () => clearInterval(id)
  }, [])
  return <span>{t}</span>
}

export default function Contact({ toast }) {
  const [status, setStatus] = useState('idle')

  const submit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('sending')
    const data = Object.fromEntries(new FormData(form))
    data.access_key = contact.web3formsKey
    data.subject = `Portfolio message from ${data.firstname} ${data.lastname}`
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok && json.success !== false) {
        setStatus('sent')
        form.reset()
        toast('Message sent — I will get back to you soon!')
      } else {
        setStatus('idle')
        toast(json.message || 'Something went wrong. Please try again.', 'error')
      }
    } catch {
      setStatus('idle')
      toast('Unable to send right now. Please email me directly.', 'error')
    }
  }

  const copyEmail = () => {
    navigator.clipboard?.writeText(profile.email)
    toast('Email copied to clipboard')
  }

  return (
    <section id="contact" className="section contact">
      <h2 className="contact__bg" aria-hidden="true">
        CONTACT
      </h2>
      <div className="container contact__grid">
        <div className="contact__left">
          <span className="eyebrow" data-reveal>
            <span className="eyebrow__index">07</span>Reach me
          </span>
          <SplitText as="h2" className="section-title" text={contact.heading} accent={['intelligent.']} />
          <p className="section-sub" data-reveal>
            {contact.sub}
          </p>

          {/* WebGL globe is glued to this box */}
          <div className="contact__globe-wrap">
            <div id="contact-globe" className="anchor anchor--globe" />
            <div className="contact__loc mono">
              <span>
                <Icon name="pin" /> {profile.location}
              </span>
              <span>
                <Icon name="clock" /> <LocalTime /> PKT
              </span>
            </div>
          </div>
        </div>

        <div className="contact__right">
          <div className="contact__quick" data-reveal>
            <button className="quick glass" onClick={copyEmail} data-cursor="Copy">
              <Icon name="mail" />
              <span>
                <small>Email</small>
                {profile.email}
              </span>
              <Icon name="copy" className="quick__end" />
            </button>
            <a className="quick glass" href={profile.phoneHref}>
              <Icon name="phone" />
              <span>
                <small>Phone</small>
                {profile.phone}
              </span>
              <Icon name="arrowRight" className="quick__end" />
            </a>
          </div>

          <form className="form glass" onSubmit={submit} data-reveal>
            <div className="form__row">
              <label className="field">
                <input type="text" name="firstname" placeholder=" " required autoComplete="given-name" />
                <span>First name</span>
              </label>
              <label className="field">
                <input type="text" name="lastname" placeholder=" " required autoComplete="family-name" />
                <span>Last name</span>
              </label>
            </div>
            <label className="field">
              <input type="email" name="email" placeholder=" " required autoComplete="email" />
              <span>Email</span>
            </label>
            <label className="field">
              <textarea name="message" placeholder=" " rows="5" required />
              <span>Type your message here</span>
            </label>
            <label className="check">
              <input type="checkbox" required />
              <span className="check__box">
                <Icon name="check" />
              </span>
              I give permission to contact me at this email address.
            </label>
            <div className="form__foot">
              <p className="mono">
                For urgent inquiries: <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </p>
              <Magnetic>
                <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent ✓' : 'Send Message'} <Icon name="arrowRight" />
                </button>
              </Magnetic>
            </div>
          </form>

          <div className="contact__socials" data-reveal>
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="social-link">
                <Icon name={s.icon} /> {s.label} <Icon name="external" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
