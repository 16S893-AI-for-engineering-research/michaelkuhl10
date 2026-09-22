# michaelkuhl10 — AI Agent for In-Space Assembly

Portfolio and project site for **MIT 16.S893: AI Agents for Engineering Research**.

**Live site:** https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/

## Project

AI agent to accelerate in-space assembly engineering research. Project
direction (visual fiducial markers vs. assembly under uncertainty, etc.) is
still being decided — the [Project](https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/project)
page is intentionally minimal until that's settled. See the
[Dev Log](https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/dev-log)
for session-by-session progress.

## Tech stack

- [Astro](https://astro.build) (static output)
- [Tailwind CSS](https://tailwindcss.com)
- React (via `@astrojs/react`)
- Deployed to GitHub Pages via GitHub Actions

## Local development

```bash
npm install
npm run dev      # http://localhost:4321  (base path '/')
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

> `npm run dev` sets `DEV=true`, which serves from `/`. Production builds use
> the base path `/michaelkuhl10` to match the GitHub Pages project URL.

## Structure

```
src/
  components/   Header, Footer
  layouts/      BaseLayout.astro
  lib/          paths.ts (base-path helper)
  pages/        index, about, project, dev-log, schedule
  styles/       globals.css
.github/workflows/deploy.yml   CI build + deploy to Pages
```

## Editing content

- **Project summary:** `src/pages/project.astro` (kept minimal on purpose)
- **About you:** `src/pages/about.astro`
- **Dev log entries:** add to the `entries` array in `src/pages/dev-log.astro`.
  Each entry is a list of fact-based bullets, written by hand, not AI-generated.
- **Schedule:** `src/pages/schedule.astro`. Edit the `weeks`, `deadlines`, and
  `grading` arrays. Each week has a `course` track (sessions and assignments
  from the 16.S893 syllabus) and a parallel `research` track (ORLO* vision
  work). Mark items complete with `done: true`.

  The page is passphrase protected (**`Schedule`**). Since GitHub Pages is
  static and has no server to check a password, the content is rendered at
  build time, encrypted with AES-256-GCM (PBKDF2-SHA256, 150k iterations), and
  only the ciphertext ships in the HTML — the browser decrypts it via Web
  Crypto after the passphrase is entered. Viewing source does not reveal the
  schedule. To change the passphrase, edit `PASSPHRASE` in that file and
  rebuild.
- **Personal notes:** kept separately in `notes/` (untracked, private — see
  `notes/README.md`), not on the public site.
