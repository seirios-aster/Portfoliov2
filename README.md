# Richard Puig – Portfolio

A scroll-driven 3D portfolio built with React, three.js (React Three Fiber), Framer Motion, Lenis and Tailwind CSS.

Live: https://portfoliov2-nu-olive.vercel.app/

## Develop

```bash
npm install
npm run dev
```

## Where things live

- `src/constants/index.js`: all content (profile, experience, skills, projects). Edit this to update the site.
- `src/three/Scene.jsx`: the persistent 3D background. `KEYS` sets where the blob sits, how big it is and its colour for each section.
- `src/components/`: one file per section (Hero, About, Experience, Skills, Projects, Contact) plus shared pieces.
- `src/lib/scroll.js`: smooth-scroll helpers and the scroll/pointer state the 3D scene reads every frame.
- `public/Richard-Puig-CV.pdf`: the CV served by the "Download CV" buttons.

The 3D scene is lazy-loaded so text paints first. Visitors with `prefers-reduced-motion` get no smooth scrolling and a calmer scene, and browsers without WebGL get a CSS gradient instead.

## Contact form

The form uses EmailJS. Provide these in `.env` (see `.env.example`):

`VITE_APP_EMAILJS_SERVICE_ID`, `VITE_APP_EMAILJS_TEMPLATE_ID`, `VITE_APP_EMAILJS_PUBLIC_KEY`
