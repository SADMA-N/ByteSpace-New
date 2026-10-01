# ByteSpace — Learn Without Limits

A pixel-accurate implementation of the ByteSpace educational landing page, built as a company frontend engineering assessment. The implementation reproduces the provided Figma design with full responsive layout coverage and Vercel production deployment.

---

## Live URL

**Production:** https://byte-space-new-eosin.vercel.app

---

## Repository

https://github.com/SADMA-N/ByteSpace-New

---

## Figma Design Source

https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website?node-id=0-1

---

## Tech Stack

| Technology | Installed Version |
| :--- | :--- |
| React | 19.3.0 |
| React DOM | 19.3.0 |
| TypeScript | 6.0.3 |
| Vite | 8.3.1 |
| @vitejs/plugin-react | 6.1.1 |
| Tailwind CSS | 4.3.3 |
| @tailwindcss/vite | 4.3.3 |

---

## Project Structure

```
src/
  components/    -- shared, reusable UI components (Button, CourseCard, StarRating, AvatarStack, CategoryPill, SectionLabel, icons/)
  sections/      -- page sections organised under home/
  pages/         -- page-level component (HomePage.tsx)
  assets/        -- images, icons, SVG logos, avatar SVGs, ornament PNGs
  styles/        -- globals.css (Tailwind entry point + @theme design tokens), fonts.css (font-face declarations)
  data/          -- static mock data (categories, courses, heroOrnaments)
  types/         -- shared TypeScript interfaces
```

---

## Setup and Installation

```bash
npm install
```

## Development Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start local development server at http://localhost:5173 |
| `npm run build` | TypeScript compile + Vite production build to `dist/` |
| `npm run lint` | Run ESLint across all source files |
| `npm run preview` | Locally preview the production build |

---

## Architecture and Technical Decisions

### Tailwind CSS v4 Design Token System

All Figma design values are codified as CSS custom properties inside `@theme` in `src/styles/globals.css`. This makes every token available both as a Tailwind utility class and as a raw CSS custom property throughout the codebase.

Token naming follows a strict no-collision rule: names must not match Tailwind's built-in utility suffixes (e.g. `sm`, `lg`, `xl`, `inner`). Descriptive suffixes are used instead:

- Border radius: `--radius-card` (16px), `--radius-control` (24px), `--radius-feature` (40px), `--radius-tag` (8px)
- Shadows: `--shadow-card`, `--shadow-float`, `--shadow-subtle`

### Typography System

Three typefaces are used across the design:

| Token | Family | Role |
| :--- | :--- | :--- |
| `font-heading` | Poppins | Section headings, stats, metric labels |
| `font-body` | Satoshi | Body copy, labels, tags, navigation links |
| `font-logo` | Clash Display | ByteSpace brand wordmark only |

All fonts are loaded via Google Fonts `<link>` tags in `index.html`. No per-component `@import` statements are used.

### Responsive Layout Strategy

Figma provides a single 1440px desktop frame. Responsive behavior for all other breakpoints is inferred using these rules:

- Mobile (375px): fully stacked single-column layout; hamburger navigation drawer; footer form stacked vertically.
- Tablet (768px): 2-column category grids; vertical footer column reflow; floating cards in StatsSection hidden.
- Narrow desktop (1024–1279px): desktop navigation visible; floating stat cards appear (`hidden lg:flex`); Footer reflows fluidly (no fixed 1200px proportions enforced at this range).
- Primary desktop (1280px+): exact Figma proportions enforced — 1200px content width, Footer brand block 528px + 92px gap + 580px link directory.

The `wide` custom breakpoint (`min-width: 1280px`) is defined in `@theme` and enables the 6-column Featured Categories grid.

### Accessibility

- `<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<form>` semantic landmarks are used throughout.
- All interactive elements have explicit `aria-label` or `aria-labelledby` attributes.
- Hamburger navigation: `aria-expanded`, `aria-controls`, toggled on click.
- Progress bar in Hero float card: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Logo marquee: wrapped in `aria-hidden="true"` (decorative) with `@media (prefers-reduced-motion: reduce)` pausing the animation via `animation-play-state: paused`.
- SVG icons used decoratively are marked `aria-hidden="true"`.

### Styling Conventions

- All styling is applied via Tailwind utility classes in `.tsx` files.
- No per-component CSS files. No inline `style={{}}` objects except for dynamic values (e.g. progress bar fill percentage which cannot be expressed as a static Tailwind class).
- `src/styles/globals.css` is the single source of truth for all design tokens.
- `src/styles/fonts.css` is documentation only (actual loading is done via `<link>` tags).

---

## Notes for the Reviewer

### Exact Figma Measurements Implemented

| Element | Value |
| :--- | :--- |
| Navbar height | 120px |
| Hero heading (desktop) | Poppins 72px, semibold, line-height 1.2em |
| Featured Categories card width (1440px) | ~167px (6 cards across 1200px container, 40px gaps) |
| Featured Categories card border radius | 24px |
| Featured Categories icon-circle fill | Shuttle Gray/50 (#F5F5F6), as implemented in T6 |
| Explore Categories icon-circle fill | Electric Lime (#D4FB20 / bg-lime-400) |
| Footer outer height (desktop) | 525px |
| Footer top padding | 71px |
| Footer brand block (1280px+) | 528px |
| Footer gap (1280px+) | 92px |
| Footer link directory (1280px+) | 580px |
| Footer copyright vertical gap | 130px |
| Logo Marquee container height | 202px |

### Deviations from Figma

| Section | Deviation | Reason |
| :--- | :--- | :--- |
| Hero | Hero photo positioned at `top-[440px]` instead of Figma's 392px | Creates a 30px clear gap below the search form; prevents overlap in implementation |
| Hero | Section `lg:min-h-[960px]` instead of Figma's 904px | Provides space for photo bottom at the adjusted photo position |
| Hero | Ornaments shown only at `lg+` (1024px), not at `md` (768px) | At 768px, ornaments overlap content areas due to narrower layout |
| Hero | Mobile float cards: 2-column at 640px+, 1-column below 640px | Figma only provides a desktop arrangement; this is a responsive inference |
| Navbar | `wide:grid-cols-6` custom breakpoint (1280px) for 6-column card grid | Tailwind's built-in `2xl` starts at 1536px which is too wide for the Figma intent |
| StatsSection | Floating cards hidden below 1024px (`hidden lg:flex`) | Prevents overflow on tablet; no Figma mobile spec for these elements |
| Footer | Fluid proportions between 1024px and 1279px | Exact 528px+92px+580px would overflow at these widths; fluid reflow is the safe inference |

---

## Intentionally Skipped Features

The following are out of scope for this assessment's primary deliverable and were deferred:

- **Bonus Milestone 2**: Login page (B2), Signup page (B3), and React Router (B1) were not implemented. The assessment requires only the Landing/Home page. Bonus pages are noted as optional in AGENTS.md.
- **Functional backend/API integration**: All course and category data is static mock data in `src/data/`.
- **Animations beyond the logo marquee**: No scroll-triggered animations were added as none were specified in the Figma design.
