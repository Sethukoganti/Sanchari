# Explore India

Independent tourism platform built with **Next.js (App Router)**, **Tailwind CSS**, **Framer Motion-ready React**, **Drizzle ORM**, and **PostgreSQL**.

**Tagline:** A Billion Stories Await

## Features

- Cinematic home hero with rotating photography
- Live split-flap **Departures Board** fed by destination data
- Filterable destinations (region + theme + keyword)
- Interactive SVG India map with tooltips and state pages
- Multi-step itinerary builder with download + email save
- Experiences, stories/blog, events calendar, gallery lightbox
- Global search overlay + results page
- EN/HI language switcher
- Contact + newsletter forms with validation and DB persistence
- SEO: metadata, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`

## Setup

```bash
npm install
# ensure DATABASE_URL is set in .env
npx drizzle-kit push
npm run dev
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run typecheck` — TypeScript check

## Design tokens

| Role | Name | Hex |
|------|------|-----|
| Base | Dusk Ink | `#241934` |
| Surface | Limestone | `#EDE6DA` |
| Primary | Turmeric | `#E8A013` |
| Secondary | Peacock Teal | `#0F6B63` |
| Tertiary | Rani Pink | `#C23B6B` |
| Text on dark | Warm White | `#F7F3EC` |

Typography: **Baloo 2** (display), **Mukta** (body), **JetBrains Mono** (board).

## Note

Explore India is an **independent** travel platform and is not affiliated with any government tourism board.
