# AGENTS.md — ByteSpace New Project Workflow Rules

> Re-read this file at the start of every task or session.
> Follow every rule here throughout the entire project.

---

## Project Context

**Project:** ByteSpace New website  
**Assessment type:** Company assessment  
**Figma design:** https://www.figma.com/design/26TBgRjmpuxudcErJsHUfy/ByteSpace-New-Check-website?node-id=0-1  
**Stack:** React + TypeScript + Vite  
**Deadline:** October 1, 2026  
**Required:** Landing / Home page  
**Bonus:** Login, Signup  

---

## Task Loop (Repeat for Every Approved Task)

### Step 1 — Announce the Task (WAIT for approval)

Before starting any task, tell the user:
- Task name
- What will be built
- Relevant Figma node(s)
- Proposed branch name
- Dependencies

**WAIT for explicit approval before doing anything.**

---

### Step 2 — Set Up the Branch

After the user approves:

1. Verify `git status` is clean.
   - The only allowed exception: untracked `AGENTS.md` during T1.
2. Sync with latest main:
   ```bash
   git checkout main
   git pull origin main
   ```
3. Create the approved feature branch:
   ```bash
   git checkout -b feature/<task-id>-<short-name>
   ```

**Never commit directly to main.**

---

### Step 3 — Read the Figma

Before writing any code:
- Read the relevant Figma node(s) using the Figma MCP.
- Inspect carefully: spacing, colors, typography, layout, assets, responsive behavior.
- Reuse exact Figma assets whenever available.
- Preserve intended visual hierarchy.

---

### Step 4 — Implement the Approved Task Only

- Implement exactly what was approved. No scope creep.
- Do not make unrelated changes.
- Use design tokens for all colors, fonts, and spacing.
- Write semantic HTML with explicit TypeScript prop interfaces.

---

### Step 5 — Verify

After implementation:

```bash
npm run build      # Must exit 0 — no TypeScript or Vite errors
npm run lint       # Must exit 0 — no ESLint errors (if available)
```

**Responsive check (every task, before showing results):**
- ~375px mobile
- ~768px tablet
- 1440px desktop

**Figma comparison:** Compare the implementation against the relevant Figma design.

**Fix all issues before reporting results.**

> Every task must be responsive at all three breakpoints before the user approves it.
> Do NOT postpone responsive work to the final QA task.

---

### Step 6 — Responsive Inference (Figma = desktop only)

Figma provides desktop frames only. Where no mobile/tablet spec exists, infer sensible behavior:
- Stack sections vertically on mobile
- Wrap grids to 1- or 2-column
- Collapse navigation to hamburger menu on mobile
- Adjust spacing proportionally
- Record every inference under **Deviations**

---

### Step 7 — Show Results (WAIT for approval)

Show:
- Files changed
- What was implemented
- Build result
- Lint result
- Responsive verification (mobile / tablet / desktop)
- Figma comparison result
- Any deviations from Figma

**WAIT for explicit approval before committing.**

---

### Step 8 — Commit, Push, Open PR

After the user approves:

1. Create a Conventional Commit:
   - `feat:` — new feature
   - `fix:` — bug fix
   - `style:` — visual/CSS changes
   - `refactor:` — code restructuring
   - `chore:` — tooling, config, assets

2. Push the branch:
   ```bash
   git push origin feature/<task-id>-<short-name>
   ```

3. Open a Pull Request targeting `main`.

   If GitHub CLI is available, use it:
   ```bash
   gh pr create --title "..." --body "..." --base main
   ```
   Otherwise provide the GitHub compare link.

   The PR must include:
   - Clear title
   - Description
   - Summary of changes
   - Testing performed
   - Figma verification
   - Screenshots when useful
   - Checklist

4. **NEVER merge the PR yourself.**

---

### Step 9 — Stop and Wait

Show the PR link/details and **STOP**.

Wait for the user to confirm the PR has been merged.

---

### Step 10 — Proceed to Next Task

Only after the user confirms the PR is merged, proceed to the next approved task.

---

## Branching Rules

- One branch per meaningful PR-sized implementation unit.
- Do NOT create a separate branch for every tiny subtask.
- Tightly related subtasks → one branch, one PR.
- Genuinely independent subtasks → propose separate branches, wait for approval.
- Every new branch must start from the latest `main`.
- `git status` must be clean before branching (except AGENTS.md during T1).

---

## Figma Rules

Figma is the **visual source of truth**.

- Read the relevant Figma nodes before coding.
- Use exact Figma assets wherever available.
- Preserve spacing, typography, colors, layout, and visual hierarchy.
- Save exported assets under `src/assets/`.
- Use SVG for icons and logos where the original is SVG.
- For minor/ambiguous details: choose the closest reasonable implementation, continue, record under **Deviations**.
- **Only stop and ask** if ambiguity blocks implementation or could materially change the design/functionality.

---

## Implementation Rules

**Use:**
- React + TypeScript
- Reusable components
- Semantic HTML
- Responsive layouts
- Explicit TypeScript prop interfaces
- Design tokens for all colors, fonts, and spacing

**Project structure:**
```
src/
  components/    ← shared, reusable UI components
  sections/      ← page sections (home/, auth/)
  pages/         ← page-level components
  assets/        ← images, icons, logos
  styles/        ← tokens.css, typography.css, fonts.css, reset.css, globals.css
  data/          ← static mock data
  types/         ← shared TypeScript interfaces
```

**Avoid:**
- Unnecessary dependencies
- Duplicated code
- Giant monolithic components
- Unnecessary abstractions
- Hardcoded magic values
- Excessive inline styles

**Do not leave:**
- `console.log` statements
- Commented-out dead code
- Unused files or imports
- Unnecessary dependencies

**Before installing ANY new dependency:**
- Tell the user which dependency and why it is needed
- Wait for explicit approval

---

## Dependency Installation Protocol

Before running `npm install <package>`:

1. State: what package, what version, why needed
2. Wait for explicit user approval
3. Only then install

---

## Git Hard Rules

| Rule | Status |
|------|--------|
| Never push directly to `main` | MANDATORY |
| Never commit directly to `main` | MANDATORY |
| Never force-push | MANDATORY |
| Never merge PRs | MANDATORY |
| Never start next task without explicit approval | MANDATORY |
| Never modify unrelated files | MANDATORY |
| Never overwrite existing work without asking | MANDATORY |
| Always branch from latest `main` | MANDATORY |

---

## Never Commit These

- `node_modules/`
- `.env` files
- Build output (`dist/`)
- Generated or unnecessary files

---

## Deployment Strategy

After the first meaningful feature PR is successfully merged into main (recommended: after T4 Hero is merged):

- Set up Vercel deployment
- Goal: `main` → automatic Vercel deployment
- Every merge to `main` → updated live deployment
- Public live URL available early

Do not let deployment setup block feature development.

---

## Scope Priority

1. Complete the required Landing/Home page
2. Verify it thoroughly against Figma
3. Ensure every completed task is responsive
4. Ensure the production build works
5. Set up Vercel after the first meaningful merged milestone
6. Continue the remaining required work
7. Complete final production verification
8. Prepare final submission
9. Only after required work is complete → consider Login and Signup

---

## Time Budget

| Date | Target |
|------|--------|
| Sep 29, 2026 (Today) | T1–T4 merged and deployed |
| Sep 30, 2026 | T5–T9 complete |
| Oct 1, 2026 | T10–T11 buffer / submission |
| Oct 1, 2026 | Deadline |

---

## Task List

### Milestone 1 — Required (Home/Landing Page)

| ID | Task | Branch |
|----|------|--------|
| T1 | Foundation + Assets | `feature/T1-foundation-assets` |
| T2 | UI Atoms | `feature/T2-ui-atoms` |
| T3 | Navbar | `feature/T3-navbar` |
| T4 | Hero | `feature/T4-hero` |
| T5 | Logo Marquee | `feature/T5-logo-marquee` |
| T6 | Featured Categories | `feature/T6-featured-categories` |
| T7 | Courses (CourseCard + Grid/Tabs) | `feature/T7-courses` |
| T8 | Stats + Explore Learning Paths | `feature/T8-stats-explore` |
| T9 | Footer + Home Assembly | `feature/T9-footer-assembly` |
| T10 | Final Responsive + Figma QA Sweep | `feature/T10-qa-responsive` |
| T11 | Deploy & Submit | `feature/T11-deploy-submit` |

### Milestone 2 — Bonus (only after T11)

| ID | Task | Branch |
|----|------|--------|
| B1 | React Router | `feature/B1-react-router` |
| B2 | Login Page | `feature/B2-login` |
| B3 | Signup Page | `feature/B3-signup` |

---

## Deviations Log

Record all design deviations here as they are made:

| Task | Deviation | Reason |
|------|-----------|--------|
| *(populated during implementation)* | | |

---

## Final Task: Deploy & Submit (T11)

Must include:
- Final production build verification
- Fix any production build/deployment issues
- Vercel deployment verification
- Confirm public Vercel URL opens successfully
- Test live website in incognito/private window
- Final responsive check (375px / 768px / 1440px)
- Final Figma visual check
- Remove remaining `console.log`, dead code, unused files
- Prepare/update README

**README must include:**
- Project overview
- Tech stack
- Setup/install instructions
- Development commands
- Live/production URL
- Important technical/design decisions
- Notes for the reviewer
- Intentionally skipped features

**Final submission information:**
- Live Vercel URL
- Public GitHub repository URL
- Relevant reviewer notes
