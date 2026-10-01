# ByteSpace — Learn Without Limits

A pixel-accurate implementation of the ByteSpace educational platform, built as a company engineering assessment. The platform features the complete responsive Landing page and bonus Authentication (Login and Register) pages, backed by an Express serverless backend, Prisma ORM, and Neon Serverless PostgreSQL.

---

## Live URL & Repository

- **Production Deployment:** https://byte-space-new-eosin.vercel.app/
- **GitHub Repository:** https://github.com/SADMA-N/ByteSpace-New
- **Figma Design Source:** https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website?node-id=0-1

---

## Reviewer Demo Credentials

A pre-seeded demo user account is provided for immediate evaluation of authenticated features without registration:

- **Email:** `demo@bytespace.dev`
- **Password:** `demo1234`

Registering a new account through the Register page (`/register`) creates real rows in the development database.

---

## Tech Stack

All dependencies and versions are installed as defined in `package.json`:

### Runtime Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `react` | `^19.2.8` | UI library |
| `react-dom` | `^19.2.8` | React DOM renderer |
| `react-router-dom` | `^7.18.4` | Client-side routing |
| `express` | `^5.2.1` | Backend HTTP API framework |
| `@prisma/client` | `^7.10.0` | Type-safe database client |
| `@prisma/adapter-neon` | `^7.10.0` | Prisma database driver adapter for Neon |
| `@neondatabase/serverless` | `^1.1.0` | Neon serverless database driver |
| `ws` | `^8.22.0` | WebSocket client for Neon pooled connections |
| `zod` | `^4.6.5` | Schema validation |
| `bcryptjs` | `^3.0.3` | Password hashing |
| `jsonwebtoken` | `^9.0.3` | Session token generation and verification |
| `cookie-parser` | `^1.4.7` | Cookie parsing middleware |

### Development Dependencies

| Package | Version | Purpose |
| :--- | :--- | :--- |
| `vite` | `^8.3.0` | Development server and bundler |
| `@vitejs/plugin-react` | `^6.1.1` | React support for Vite |
| `tailwindcss` | `^4.3.3` | Utility-first CSS framework |
| `@tailwindcss/vite` | `^4.3.3` | Tailwind CSS v4 Vite integration |
| `typescript` | `~6.0.2` | Static type checking |
| `prisma` | `^7.10.0` | Database schema migrations and management CLI |
| `tsx` | `^4.23.15` | TypeScript execution runner for local server and seeds |
| `eslint` | `^10.10.0` | Code quality linter |

---

## Project Structure

The repository organizes frontend, backend, database configuration, and shared code:

```
.
├── api/
│   └── index.ts               -- Vercel serverless entry point exporting the Express application
├── prisma/
│   ├── migrations/            -- Versioned SQL database migrations
│   ├── schema.prisma          -- Prisma schema definition
│   └── seed.ts                -- Database seed script (mock courses, categories, demo user)
├── server/
│   ├── app.ts                 -- Express application configuration and middleware
│   ├── dev.ts                 -- Local standalone Express development server (port 3001)
│   ├── lib/
│   │   └── prisma.ts          -- Neon driver adapter and PrismaClient singleton
│   └── routes/
│       ├── auth.ts            -- Authentication endpoints (/api/auth/*)
│       └── health.ts          -- Health check endpoint (/api/health)
├── src/
│   ├── App.tsx                -- React Router root component and route configuration
│   ├── assets/                -- Static media (SVG icons, partner logos, avatar SVGs, images)
│   ├── components/
│   │   ├── auth/              -- Authentication components (AuthLayout, FormField, SocialAuthButtons)
│   │   ├── icons/             -- Inline SVG icon components (LogoIcon)
│   │   └── ui/                -- Reusable UI components (Button, CourseCard, StarRating, Badge, etc.)
│   ├── context/               -- React context (AuthContext, auth-context-base, useAuth hook)
│   ├── data/                  -- Static mock data for landing sections (courses, categories, heroOrnaments)
│   ├── lib/
│   │   └── api.ts             -- Client-side fetch wrapper with credential handling
│   ├── pages/                 -- Page components (HomePage, LoginPage, RegisterPage)
│   ├── sections/
│   │   └── home/              -- Landing page sections (Navbar, Hero, LogoMarquee, CoursesSection, etc.)
│   ├── shared/
│   │   └── validators/        -- Shared validation schemas (auth validation schemas)
│   └── styles/
│       ├── fonts.css          -- Font documentation and fallback declarations
│       └── globals.css        -- Main CSS entry point with @theme design tokens
├── package.json
├── prisma.config.ts           -- Prisma database connection and migration configuration
├── tsconfig.json              -- Root TypeScript configuration
├── tsconfig.app.json          -- Client-side TypeScript configuration
├── tsconfig.server.json       -- Server-side TypeScript configuration
├── vercel.json                -- Vercel deployment rewrites and function configuration
└── vite.config.ts             -- Vite configuration and local /api proxy configuration
```

---

## Setup and Installation

### 1. Clone Repository and Install Dependencies

```bash
git clone https://github.com/SADMA-N/ByteSpace-New.git
cd ByteSpaceNew
npm install
```

The `postinstall` script runs `prisma generate` automatically upon dependency installation.

### 2. Configure Environment Variables

Create a local `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Set the required environment variable names (values obtained from your Neon project dashboard):

```env
DATABASE_URL=
DIRECT_URL=
JWT_SECRET=
```

---

## NPM Scripts

The following scripts are defined in `package.json`:

| Script | Command | Description |
| :--- | :--- | :--- |
| `dev` | `vite` | Start local client development server with Vite proxy |
| `dev:client` | `vite` | Alias for starting the Vite client server |
| `dev:server` | `tsx server/dev.ts` | Start standalone Express API server locally on port 3001 |
| `build` | `tsc -b && vite build` | Compile TypeScript and bundle frontend for production |
| `lint` | `eslint .` | Run ESLint across all source files |
| `preview` | `vite preview` | Locally preview the built production bundle |
| `postinstall` | `prisma generate` | Automatically generates Prisma Client after npm install |

*Note: Database seeding can be executed via `npx tsx prisma/seed.ts` (configured under the `"prisma": { "seed": "tsx prisma/seed.ts" }` key in `package.json` and callable via `npx prisma db seed`). Running the seed script writes initial courses, categories, and the reviewer demo account to the development database.*

---

## Environment Variables

Names only (no secrets):

- `DATABASE_URL`: Connection string for the pooled database endpoint used by the application at runtime.
- `DIRECT_URL`: Direct database connection string used for schema migrations.
- `JWT_SECRET`: Secret key used for signing and verifying JSON Web Tokens. If unset, authentication endpoints return a clean 500 error without fallback secrets.

---

## Key Decisions

### 1. Tailwind CSS v4 Design Token System
All design values from Figma are defined inside `@theme` in `src/styles/globals.css`. Descriptive suffixes avoid collision with Tailwind's built-in sizing utilities:
- Border radius: `--radius-card` (16px), `--radius-control` (24px), `--radius-feature` (40px), `--radius-tag` (8px).
- Typography: Poppins for headings (`font-heading`), Satoshi for body copy (`font-body`), and Clash Display for the brand wordmark (`font-logo`).

### 2. Reusable Component Architecture
UI elements are modularized under `src/components/ui/` (`Button`, `CourseCard`, `CategoryPill`, `StarRating`, `AvatarStack`) and `src/components/auth/` (`AuthLayout`, `FormField`, `SocialAuthButtons`). Forms reuse the project's primary lime CTA button (`bg-lime-400 text-shuttle-950`).

### 3. Unified Monorepo on Vercel
The frontend and backend reside in the same repository and Vercel project:
- The Express app in `server/app.ts` is exported through `api/index.ts` as a Node serverless function.
- `vercel.json` routes `/api/*` requests to the serverless function and rewrites remaining routes to `/index.html` for client-side routing.
- Local development uses a Vite proxy in `vite.config.ts` mapping `/api` to port 3001.

### 4. Authentication and Cookie Security
- Sessions use an `httpOnly` JWT cookie (`token`) with `SameSite=Lax` and the `Secure` flag enabled in production.
- Unknown email logins execute a dummy `bcrypt.compare` to mitigate timing-based account enumeration attacks.
- Logging out clears the authentication cookie with matching security options without `maxAge`.

### 5. Neon Serverless Driver & IPv4 WebSocket Workaround
Prisma connects to Neon through `@prisma/adapter-neon` and `@neondatabase/serverless`. In environments where IPv6 network routing to AWS is unavailable or filtered, standard WebSocket handshakes can time out; a custom WebSocket class with `{ family: 4 }` forces reliable IPv4 connections for both local dev and serverless functions.

---

## Figma Alignment & Inferences

- Desktop 1440px canvas implemented with 1200px container width and 120px navbar.
- Responsive layout inferred for tablet (768px) and mobile (375px) via single-column stacking, collapsible mobile navigation drawer, and fluid element reflow.

---

## Intentionally Skipped & Not Yet Implemented

### Intentionally Skipped
- **Social OAuth Authentication**: Google and Apple login buttons are visually rendered to match Figma but have explicit HTML `disabled` attributes because third-party OAuth providers are out of scope.
- **Forgot Password Workflow**: Rendered as a disabled button without dead `href="#"` links.

### Not Yet Implemented
- **Course Catalog & Search Pages**: Dynamic catalog filtering, live search page (Figma 55:117), course details, lessons, and creator profiles are planned for subsequent phases. The landing page currently renders curated static courses from `src/data/courses.ts`.

---

## Known Limitations & Image Assets

- **Development Database**: Runtime database data and migrations live on the Neon development branch `dev/bytespace`.
- **Course Instructor Avatars**: Individual instructor profile photos are rendered with lightweight placeholder avatar circles (`bg-shuttle-100`) in `CourseCard.tsx` because individual instructor photo assets are not provided in the static Figma cards.
- **Student Avatars**: Student avatar stacks (`AvatarStack.tsx`) use stylized vector avatars (`src/assets/avatars/avatar-*.svg`). Hero 3D ornaments (`sphere-*.png`, `cone-*.png`) are real Figma asset exports.
