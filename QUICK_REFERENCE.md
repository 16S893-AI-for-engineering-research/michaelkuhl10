# Quick Reference — Editing Your Portfolio Site

## Live URL
**https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/**

## Local repo
```bash
cd /Users/mikek/Programming/michaelkuhl10
```

---

## Editing pages

### Edit bio, photos, links
**File:** `src/pages/about.astro`
- Your bio is in the `<p>` tags
- Photos are `<img src={resolvePath('/images/...')}` — add new photos to `public/images/`

### Edit one-pager (for advisor sign-off)
**File:** `src/pages/project.astro`
- Problem section: update with your specific research
- Approach, milestones, metrics — all editable
- The animated loop is near the top; don't remove the divs with `animate-pulse` class

### Add a dev log entry
**File:** `src/pages/dev-log.astro`
- Find the `entries` array (near the top of the component)
- Add a new object to the front of the list:
```javascript
{
  date: '2026-09-18',
  title: 'Started perception module',
  body: `Built a basic wrapper around the existing fiducial reader
    and added confidence scoring. Next: test against real zero-g imagery.`,
},
```
- The date appears as a timeline badge, the title is a heading, body is the text

### Edit home page summary
**File:** `src/pages/index.astro`
- Update the tagline, problem summary, or call-to-action text as needed

---

## Test locally

```bash
# Start dev server at http://localhost:4321
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

In dev mode, the base path is `/` (so links look like `/about`).  
In production build, base path becomes `/michaelkuhl10` (as it will on GitHub Pages).

---

## Deploy

```bash
# Make your edits, then:
git add -A
git commit -m "Describe what you changed"
git push

# The GitHub Actions workflow automatically builds and deploys.
# Check the live site in 1–2 minutes.
```

---

## Add photos

1. Drop new JPEG/PNG files in `public/images/`
2. Reference them in a page:
```astro
<img src={resolvePath('/images/myfile.jpeg')} alt="description" />
```

All photos are automatically bundled and deployed.

---

## Structure reference

```
src/
  pages/
    index.astro         ← Home
    about.astro         ← About + photos
    project.astro       ← One-pager (animated loop here)
    dev-log.astro       ← Dev log timeline

  layouts/
    BaseLayout.astro    ← Wraps all pages (header, footer, styles)

  components/
    Header.astro        ← Navigation bar
    Footer.astro        ← Footer with links

  lib/
    paths.ts            ← DO NOT EDIT (handles /michaelkuhl10 base path)

  styles/
    globals.css         ← Theme colors, typography, animations

public/
  images/               ← Your photos
  favicon.svg           ← Site icon

.github/workflows/
  deploy.yml            ← DO NOT EDIT (auto-deploys on push)
```

---

## Troubleshooting

**"Image isn't showing up"**
- Use `{resolvePath('/images/filename.jpeg')}` (not a hardcoded URL)
- Check the filename matches exactly (case-sensitive)
- Image must be in `public/images/`

**"Links don't work locally"**
- Links should use `{resolvePath('/page')}` in Astro files
- In dev mode (`npm run dev`), this resolves to `/page`

**"Layout looks broken"**
- Check that Tailwind classes are spelled correctly (e.g., `text-orbit`, not `text-orbital`)
- The color names are custom; see `tailwind.config.mjs` for the full palette

**"Deploy didn't happen after git push"**
- Check the GitHub Actions tab on your repo: https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/actions
- Workflow takes 1–2 minutes; refresh the live site after that

---

## Deadline reminders

**Sept 22:** One-pager due (email as PDF, advisor cc'd)  
**Sept 24:** Lightning talk (3 minutes, use the one-pager as script)  
**Ongoing:** Weekly dev log entries as you build

---

## Need more help?

- **Content guide:** `docs/orlo-agent-site-content.md` — ground truth for all project info
- **Full editing guide:** `SITE_GUIDE.md` — detailed walkthrough
- **Astro docs:** https://docs.astro.build
- **Tailwind docs:** https://tailwindcss.com/docs

---

**Good luck with ORLO Assembly Agent! 🚀**
