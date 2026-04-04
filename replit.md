# ArthaShield

## Overview

ArthaShield is India's first AI-powered parametric income insurance web app for Zepto and Blinkit dark-store gig riders. Built for the Guidewire DEVTrails 2026 hackathon. When rain, smog, or a curfew stops a rider's work, ArthaShield pays them in 60 seconds — zero forms, zero calls.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React 18 + Vite + Tailwind CSS (artifacts/arthashield)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **API framework**: Express 5 (artifacts/api-server — not used by frontend)
- **Database**: PostgreSQL + Drizzle ORM (not used by frontend)

## Pages

- `/splash` — Animated splash screen (3s auto-redirect to /home)
- `/home` — Hero landing page with stats, how-it-works, coverage details, comparison table
- `/onboard` — 5-step onboarding wizard (phone → hub selection → earnings → plan → activate)
- `/dashboard` — Worker dashboard with coverage map, payouts, premium breakdown
- `/trigger-demo` — Live trigger simulation with 4-step animated sequences
- `/admin` — Insurer command center with India zone map, claims table, fraud queue, charts

## Architecture

- **Frontend-only**: All data is mock/hardcoded in `src/data/mockData.ts`
- **Global state**: React Context + localStorage (`src/context/AppContext.tsx`)
- **No backend needed**: Everything runs client-side

## Color System

- `--bg-primary: #06060F` — Near black background
- `--purple: #7C3AED` — Primary purple
- `--teal: #14B8A6` — Primary teal
- `--teal-bright: #00FFD1` — Electric teal for numbers
- Gradient text: `linear-gradient(135deg, #A855F7 0%, #14B8A6 100%)`

## Key Commands

- `pnpm --filter @workspace/arthashield run dev` — Run frontend locally
- `pnpm run typecheck` — Full typecheck
- `pnpm run build` — Build all packages
