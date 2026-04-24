# Ethereal Portfolio

A single-page portfolio site for AI Automation services, built with Next.js 14,
Tailwind CSS, and Framer Motion. Designed with an ethereal aesthetic — aurora
gradients, drifting orbs, a starfield, and a dreamy loading screen.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Editing content

All copy (name, tagline, bio, services, work, testimonials, contact) lives in a
single file:

- [`src/content/portfolio.ts`](src/content/portfolio.ts)

## Structure

- `src/app/layout.tsx` — root layout (fonts, background, nav, footer, loading screen)
- `src/app/page.tsx` — composes the sections in order
- `src/components/ethereal/` — visual primitives (BackgroundMesh, Orbs, Starfield, LoadingScreen, GlowText, Reveal, AuroraMark)
- `src/components/portfolio/` — section components (Nav, Hero, About, Services, Work, Testimonials, Contact, Footer)
- `src/scss/globals.scss` — base styles, frost/aurora utilities, reduced-motion rules
- `tailwind.config.ts` — ethereal palette + keyframes/animations

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint + `tsc --noEmit`
- `npm run start` — run the production build
