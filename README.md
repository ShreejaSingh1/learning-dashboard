# LearnOS — Student Dashboard

A futuristic, animated learning dashboard built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## Live Demo
[Deploy link here after Vercel deployment]

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/your-username/learning-dashboard
cd learning-dashboard
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env.local
```
Fill in your Supabase credentials:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up Supabase database

Create a `courses` table in your Supabase project with the following SQL:

```sql
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  icon_name TEXT NOT NULL DEFAULT 'book-open',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data
INSERT INTO courses (title, progress, icon_name) VALUES
  ('Advanced React Patterns', 75, 'code-2'),
  ('TypeScript Deep Dive', 42, 'file-code'),
  ('System Design Fundamentals', 90, 'network'),
  ('Databases & SQL Mastery', 28, 'database');
```

### 4. Run locally
```bash
npm run dev
```

---

## Architecture Decisions

### Server / Client Component Split

**Server Components** are used wherever possible for data fetching:
- `CoursesGrid` — async Server Component that calls `getCourses()` directly using `@supabase/ssr`
- `lib/data.ts` — server-side data access layer, never runs in the browser
- `lib/supabase/server.ts` — Supabase client using `cookies()` from `next/headers` (server-only)

**Client Components** (`"use client"`) are used only where interactivity or browser APIs are needed:
- `Sidebar` — collapsible state, hover tracking, layout animations
- `MobileNav` — active route state
- `CourseCard` — `useInView` for progress bar trigger, Framer Motion hover effects
- `ActivityTile` — client-rendered contribution graph with `useMemo`
- `HeroTile` — `getGreeting()` depends on `new Date()` at render time
- `StatsRow` — Framer Motion hover effects
- `BentoGrid` — orchestrates staggered entrance animations

### Supabase Integration
- Uses `@supabase/ssr` package with `createServerClient` for all server-side queries
- Environment variables prefixed with `NEXT_PUBLIC_` are safe to expose (anon key only)
- No service role key is used — RLS policies should be configured in Supabase for production

### Animation Strategy
All animations use only `transform` and `opacity` — no properties that trigger layout reflow (no `width/height` changes on hover, no `margin/padding` changes). This ensures:
- Zero layout shifts during interactions
- GPU-accelerated compositing via CSS `will-change: transform`
- Spring physics (`type: "spring"`) for natural, non-linear feel

### Suspense Boundaries
`<Suspense>` wraps `<CoursesGrid>` with a `<CoursesSkeleton>` fallback, so:
1. The page shell (Hero, Stats, Activity) renders immediately
2. Course tiles stream in once Supabase responds
3. Skeleton pulsing animation keeps the UI alive during fetch

### Responsive Breakpoints
| Viewport | Sidebar | Bento Layout |
|---|---|---|
| `< 768px` (mobile) | Hidden → Bottom nav bar | Single column |
| `768px – 1024px` (tablet) | Collapsed to icon-only (68px) | 2-column courses grid |
| `> 1024px` (desktop) | Full sidebar (220px, collapsible) | Full bento grid |

---

## Challenges

1. **Icon resolution from string**: Lucide exports ~1000 icons. I dynamically resolve them by converting `kebab-case` (stored in DB) to `PascalCase` and indexing into the `lucide-react` module. A fallback to `BookOpen` prevents crashes on unknown icon names.

2. **Progress bar entry animation with `useInView`**: The progress bar should animate from 0% only when visible. Using Framer Motion's `useInView` hook with `once: true` triggers the animation precisely when the card enters the viewport.

3. **Staggered tile entrance without layout shift**: Framer Motion's `variants` + `staggerChildren` on the parent `BentoGrid` ensures tiles fade/slide in sequentially without affecting surrounding layout, since we only animate `opacity` and `translateY`.

---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS + CSS custom properties
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Type Safety**: TypeScript (strict mode)
- **Deployment**: Vercel
