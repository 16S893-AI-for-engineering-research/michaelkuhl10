# michaelkuhl10 — Robotic assembly in space

Project site for **MIT 16.S893: AI Agents for Engineering Research**.

**Live site:** https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/

The site follows the ORLO* in-space assembly project: robot strategy, build
order (outward spiral), reaction wheel sizing, and a literature review toolkit
built on the side. The simulation code lives in a separate repo (ORLO-Zig);
this repo holds the website and the figures it shows.

## Pages

| Page | File | Content |
|---|---|---|
| Home | `src/pages/index.astro` | Summary, progress cards, latest sessions |
| Project | `src/pages/project.astro` | The project story with figures 1–10 |
| Dev Log | `src/pages/dev-log.astro` | Renders `src/data/dev-log.ts` |
| Documents | `src/pages/documents.astro` | Every report, walkthrough, essay and reference |
| About | `src/pages/about.astro` | Bio and photos |

## Structure

```
src/
  data/dev-log.ts     Dev log entries (newest first) — edit this to add sessions
  pages/              One file per page
  components/         Header, Footer, Figure
  layouts/            BaseLayout
  essays/             Debate essay (Markdown, shown in the dev log)
  lib/paths.ts        resolvePath() for the GitHub Pages base path
  styles/globals.css  Tailwind base and shared classes
public/
  media/              Figures and videos used on the site
  docs/               PDFs linked from the Documents page
  walkthroughs/       Standalone HTML walkthrough pages
  images/             About-page photos
pod-clinic/           Class pod clinic briefing; GitHub issue 2 links these files
research/             Proposal source text, reference papers, PID figure reproduction
.pi/skills/           dev-log-entry skill (adds entries to src/data/dev-log.ts)
```

## Local development

```bash
npm install
npm run dev      # http://localhost:4321  (base path '/')
npm run build    # outputs to ./dist
npm run preview  # preview the production build
```

`npm run dev` sets `DEV=true`, which serves from `/`. Production builds use the
base path `/michaelkuhl10`. A push to `main` deploys to GitHub Pages.

## Tech stack

[Astro](https://astro.build) (static output) and [Tailwind CSS](https://tailwindcss.com).
Accent colour: arc-reactor blue (`arc` palette in `tailwind.config.mjs`).
