# michaelkuhl10 — AI Agent for In-Space Assembly

Portfolio and project site for **MIT 16.S893: AI Agents for Engineering Research**.

**Live site:** https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/

## Project

An autonomous AI agent that plans, reasons about, and verifies the robotic
assembly of large structures in orbit. See the [Project](https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/project)
page for the one-pager and the [Dev Log](https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/dev-log)
for progress.

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
  pages/        index, about, project, dev-log
  styles/       globals.css
.github/workflows/deploy.yml   CI build + deploy to Pages
```

## Editing content

- **Project one-pager:** `src/pages/project.astro`
- **About you:** `src/pages/about.astro`
- **Dev log entries:** add to the `entries` array in `src/pages/dev-log.astro`
