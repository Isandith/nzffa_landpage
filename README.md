# Farm Forestry New Zealand — Homepage Prototype

A production-quality prototype of the [New Zealand Farm Forestry Association](https://www.nzffa.org.nz/)
homepage, built with the App Router, TypeScript and Tailwind CSS.

## Getting started

The project is already scaffolded. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

To produce an optimized production build and run it:

```bash
npm run build
npm run start
```

> If you were starting from scratch, the equivalent scaffold is:
> `npx create-next-app@latest nzffa_landpage --ts --app --tailwind --eslint`

## Stack notes

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**.
- **Tailwind CSS v4** — configured CSS-first. There is intentionally **no
  `tailwind.config.ts`**: in v4 the design tokens are declared once in the
  `@theme` block of [`app/globals.css`](app/globals.css) and become the single
  source of truth, generating first-class utilities (`bg-forest-700`,
  `text-display`, `py-section`, `shadow-md`, …). `content` scanning is
  automatic in v4, so no paths config is needed.
- Remote images are allowed via `images.remotePatterns` in
  [`next.config.ts`](next.config.ts) (scoped to `nzffa.org.nz` asset paths).

## Fonts

Loaded via `next/font/google` and wired to the `--font-serif` / `--font-sans`
theme tokens:

- **Fraunces** (display/headings) — a warm, high-contrast serif. Its rural,
  established, slightly editorial character suits a 1957-founded forestry
  association and gives the headings a premium, hand-considered feel.
- **Plus Jakarta Sans** (body/UI) — a clean, friendly geometric grotesque that
  stays highly legible at small sizes and pairs calmly with the serif without
  competing with it.

Both are variable fonts, so the full weight range is available with no extra
network cost.

## Structure

```
app/
  layout.tsx          # fonts, metadata, html/body shell, header + footer
  page.tsx            # homepage — composes the sections only
  globals.css         # Tailwind import + @theme design tokens + base layer
  [slug]/page.tsx     # on-brand placeholder for every nav/utility route
components/            # Header, MobileMenu, Hero, FeatureGrid, etc.
lib/nav.ts            # navigation config (declared once, reused everywhere)
```

All visible copy and imagery originate from the official NZFFA site.
