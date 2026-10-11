import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import CommandPalette from './components/CommandPalette'
import ProjectModal from './components/ProjectModal'
import Hero from './sections/Hero'
import Marquee from './sections/Marquee'
import About from './sections/About'
import Expertise from './sections/Expertise'
import Skills from './sections/Skills'
import SoftSkills from './sections/SoftSkills'
import Process from './sections/Process'
import Projects from './sections/Projects'
import Journey from './sections/Journey'
import GitHubSection from './sections/GitHubSection'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import { gsap, ScrollTrigger } from './lib/loop'
import { prefersReducedMotion, webglAvailable } from './lib/device'

const Scene = lazy(() => import('./three/Scene'))

function useRevealAnimations() {
  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.set('[data-reveal]', { opacity: 0, y: 50, rotateX: -10, transformPerspective: 900, transformOrigin: '50% 100%' })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: (els) =>
          gsap.to(els, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.08,
            clearProps: 'opacity,transform',
          }),
      })
      gsap.utils.toArray('[data-split]').forEach((el) => {
        gsap.from(el.querySelectorAll('.split__word'), {
          yPercent: 115,
          rotateX: -75,
          opacity: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    })
    // fonts / images change layout after first paint → recalc trigger positions
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      ctx.revert()
      window.removeEventListener('load', refresh)
    }
  }, [])
}

export default function App() {
  const [palette, setPalette] = useState(false)
  const [project, setProject] = useState(null)
  const [toasts, setToasts] = useState([])

  useRevealAnimations()

  useEffect(() => {
    document.documentElement.classList.toggle('no-webgl', !webglAvailable)
  }, [])

  const toast = useCallback((msg, type = 'ok') => {
    const id = Math.random()
    setToasts((t) => [...t, { id, msg, type }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200)
  }, [])

  const openProject = useCallback((p) => setProject(p), [])
  const closeProject = useCallback(() => setProject(null), [])

  return (
    <>
      <Loader webgl={webglAvailable} />
      {webglAvailable && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Navbar onOpenPalette={() => setPalette(true)} />

      <main>
        <Hero />
        <Marquee />
        <About />
        <Expertise />
        <Skills />
        <SoftSkills />
        <Process />
        <Projects onOpen={openProject} />
        <Journey />
        <GitHubSection />
        <Testimonials />
        <Contact toast={toast} />
      </main>
      <Footer />

      <ProjectModal project={project} onClose={closeProject} />
      <CommandPalette open={palette} setOpen={setPalette} onOpenProject={openProject} toast={toast} />

      <div className="toasts" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.type}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </>
  )
}
