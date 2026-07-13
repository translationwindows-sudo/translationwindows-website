# Translation Windows — Website

Production codebase for translationwindows.com (Project Atlas, V1).

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn-convention UI ·
Framer Motion · Zustand · React Hook Form + Zod · Vercel

## Develop
```bash
npm install
npm run dev
```

## Architecture
- `src/config` — single source of truth (site data, nav)
- `src/components` — ui / layout / seo
- `src/features` — vertical feature slices (grows per milestone)
- `src/services` — provider-agnostic interfaces + mock implementations,
  selected via env vars in `src/services/index.ts`
- `src/future-modules` — reserved platform architecture (see README inside)

V1 ships mocked services only: no database, AI, email or payments yet.
