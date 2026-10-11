# Muhammad Kaif — 3D Portfolio

An interactive 3D portfolio built with **React 19, Three.js / React Three Fiber, GSAP and Lenis**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Update the content

**Everything lives in [`src/data/content.js`](src/data/content.js).** You never need to touch components to change text.

| What | Where in `content.js` |
| --- | --- |
| Name, roles (hero scramble), bio, email, phone, photo | `profile` |
| Social links | `socials` |
| "Currently" card in About | `currently` |
| Counters | `stats` |
| Skills (also feed the 3D sphere) | `skillCategories` (`level: 'core'` or `'familiar'`) |
| Soft skills (flip cards) | `softSkills` |
| Process steps (also drive the 3D pipeline) | `process` |
| Projects + filters + case-study modal | `projects`, `projectFilters` |
| Education / experience timeline | `journey` |
| Certifications | `certifications` |
| Testimonials (3D carousel) | `testimonials` |
| Live GitHub section | `github` |
| Contact form key + globe arcs | `contact` |

Items marked `// TODO` are placeholders. Set `enabled: false` to hide a section.

### Images
- Put files in `public/images/` and reference them as `/images/name.png`.
- `profile.photo` → front of the 3D ID badge, `profile.illustration` → its back.
- A project's `image` replaces the generated cover; `links.live` and `links.video` (YouTube embed URL) appear in the modal.
- Add `details: { Problem: '...', Approach: '...', Results: '...' }` to any project for a full case study.
- Drop your CV at `public/resume.pdf` (the hero "Resume" button points there).

## How the 3D works

- One fixed WebGL canvas sits behind the page (`src/three/Scene.jsx`).
- Each 3D object is glued to an empty `<div id="...">` in the HTML via `useAnchor` — the layout decides where things are, so it stays responsive on every screen.
  - `hero-core` → AI core (click it to fire a pulse)
  - `about-badge` → lanyard ID badge (drag to swing, click to flip)
  - `skills-sphere` → skill cloud (drag to spin, click a category card to highlight)
  - `process-3d` → build pipeline that lights up as you read each step
  - `contact-globe` → globe with Islamabad pinned and arcs to the world
- Lenis smooth scroll, GSAP ScrollTrigger and the WebGL render all run on one ticker so 3D never lags behind the page.
- Mobile / low-end devices get fewer particles, lower resolution and no bloom; `prefers-reduced-motion` disables smooth scroll and heavy motion; browsers without WebGL get a static fallback.

## Extras
- `Ctrl / ⌘ + K` command palette (navigate, open projects, copy email, download resume)
- Custom cursor with contextual labels, magnetic buttons, tilt + glare cards
- Live GitHub repos & language breakdown (cached per session)
- Contact form via Web3Forms with toast notifications, local Islamabad time

## Deploy (Vercel)
Push this folder to your GitHub repo and import it in Vercel — it is detected as a Vite app (`npm run build`, output `dist`).
