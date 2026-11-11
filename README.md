# Jerk at Nite

Website for Jerk at Nite, built with **Next.js 16** (App Router, TypeScript) and **Tailwind CSS 4**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Requires Node.js 20+.

## Project structure

```
src/
  app/                 Pages (App Router)
    page.tsx           Home
    menu/              Food menu
    locations/         All locations + /locations/[slug] detail pages
    catering/          Catering info + request form
    private-events/    Events info + booking form
    about/  contact/
    sitemap.ts         sitemap.xml
  components/          Header, footer, order dialog, forms, shared UI
  data/
    site.ts            Locations, hours, links, socials, reviews, FAQs
    menu.ts            Menu sections and items
```

Most content edits only touch `src/data/site.ts` and `src/data/menu.ts`.

## To do before launch

- [ ] Fill in the real DoorDash / Uber Eats / Grubhub / Toast links per location (`order` in `src/data/site.ts`; currently `#`).
- [ ] Replace placeholder menu items and add prices in `src/data/menu.ts`.
- [ ] Move photos from the WordPress site into `public/images/` and update `images` in `src/data/site.ts`.
- [ ] Hook the inquiry forms up to a form service (they currently open the visitor's email app).
- [ ] Confirm the Houston ZIP code and the Washington, DC address.
- [ ] Add the licensed "Thunder" display font to `src/app/` via `next/font/local` (Anton is used as a stand-in).

## Deploying

Deploy on [Vercel](https://vercel.com/new) (import this repo, no extra config needed) or any Node.js host with `npm run build && npm start`.
