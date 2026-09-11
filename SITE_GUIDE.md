# ORLO Assembly Agent — Portfolio Site Complete

**Live URL:** https://16s893-ai-for-engineering-research.github.io/michaelkuhl10/

---

## What's now on the site

### **Home** — Project at a glance
- Title: **ORLO Assembly Agent** with tagline "Perceive → Detect → Replan"
- Summary of the problem (brittle perception and offline planning)
- Call-to-action buttons to the full project page, about, and dev log

### **About** — You and your work
- Full bio: graduate student, MIT AeroAstro, STAR Lab, Prof. Cahoy
- Real context: ORLO's history, SmallSat 2026 publication, qualification testing data (45 Hz, 2.5%), zero-g validation
- Your background: Harvard SEAS senior thesis on in-space assembly
- Why you took this class: applying AI agents to close the real gaps in ORLO's pipeline
- **Six personal photos** integrated into a grid (Grad, Hockey, Surfing, Fishing, Travel, plus a dedicated headshot)
- Links: GitHub, STAR Lab, MIT DSpace

### **Project** — The one-pager with interactive element
- Full problem statement: fiducial-marker brittleness, offline planning
- Why it matters: trust and reliability for autonomous assembly missions
- What the agent will do: perceive, detect, replan (O1 + O2 model)
- Development approach: simulation track + hardware-in-the-loop track
- Milestones 1–5 (from scoping through validation)
- Success metrics: perception accuracy, fault diagnosis rate, recovery time
- Data & restrictions: all public/synthetic, no proprietary material
- **Animated Perceive → Detect → Replan loop** (three pulsing boxes with staggered animation, representing the agent's decision loop)

### **Dev Log** — Tracking your research
- Two seed entries (real timestamps):
  1. **Sept 11 — Scoping:** How you selected this project from candidate directions, the two concrete gaps you identified
  2. **Sept 11 — Site scaffolded:** You've got the repo and portfolio live, next is confirming available ORLO datasets
- Template and invitation to add weekly entries as work progresses

---

## What changed since the first version

| Before | After |
|--------|-------|
| Placeholder "In-Space Assembly" title | Real project title: **ORLO Assembly Agent** |
| Generic generic problem/approach descriptions | Exact technical gaps (fiducials, open-loop planning) |
| No photos | **Six personal photos** (headshot, hobbies, grad photo) integrated throughout |
| Template one-pager | Full one-pager grounded in published ORLO work + your SmallSat paper |
| Empty dev log | Real seed entries with research context |
| No animation | **Perceive → Detect → Replan animated loop** on project page |
| Placeholder about page | Full bio with advisor, lab, publications, research narrative |

---

## Structure

```
michaelkuhl10/
├── src/
│   ├── pages/
│   │   ├── index.astro              (Home)
│   │   ├── about.astro              (About + photos)
│   │   ├── project.astro            (Full one-pager + animation)
│   │   └── dev-log.astro            (Research log)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── Figure.astro             (image component)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── paths.ts                 (base-path helper for /michaelkuhl10)
│   └── styles/
│       └── globals.css              (space theme + animations)
├── public/
│   ├── favicon.svg                  (orbital gantry icon)
│   └── images/                      (all 6 photos)
├── docs/
│   └── orlo-agent-site-content.md   (ground truth for all content)
├── .github/workflows/
│   └── deploy.yml                   (auto-deploy on main push)
└── [config files]
```

---

## To edit the site going forward

1. **Update the one-pager:** `src/pages/project.astro`
2. **Update your bio:** `src/pages/about.astro`
3. **Add dev log entries:** Add to the `entries` array in `src/pages/dev-log.astro` — template:
   ```javascript
   {
     date: 'YYYY-MM-DD',
     title: 'Short headline',
     body: `What you did, what you learned, what you're blocked on, next steps.`,
   },
   ```
4. **Update home page:** `src/pages/index.astro`
5. **Add more photos:** Drop JPEG files in `public/images/` and reference via `{resolvePath('/images/filename.jpeg')}`

All changes auto-deploy to the live site on `git push`.

---

## Key technical notes

- **Base path:** The site lives at `/michaelkuhl10`, not the root. All internal links use `resolvePath()` to handle this automatically in dev (`/`) vs. production (`/michaelkuhl10`).
- **Animation:** The perceive-detect-replan loop uses CSS `animate-pulse` with staggered `animation-delay` to create a cycling visual effect. Easy to extend if you want to add a fault-injection Easter egg later.
- **Theme:** Deep-space color palette (orbit cyan + thruster amber on a 050810 void background) matches the project's subject matter and uses Tailwind custom colors for consistency.
- **Deployment:** GitHub Actions workflow builds on every push to `main` and deploys to GitHub Pages automatically. No manual steps needed.

---

## What's ready right now

✅ Live, publicly viewable portfolio site  
✅ Real project content grounded in your ORLO work  
✅ All photos integrated  
✅ Animated perceive-detect-replan loop  
✅ Seed dev log entries with real research context  
✅ Full one-pager ready for advisor sign-off (just add advisor email to the email to the instructor per class policy)  
✅ Auto-deploy on push  

---

## Next steps (your action items)

1. **Advisor sign-off:** Email the one-pager (Project page) as a PDF to the instructor with your advisor cc'd. Request confirmation that:
   - They approve the project
   - It's not a duplication of your thesis work
   - Due **Tuesday, Sept 22**

2. **Lightning talk:** Prepare a 3-minute talk on the one-pager, due **Thursday, Sept 24**

3. **Start building:** Reach out to Jonah Goldstein and Leila Freitag about existing ORLO datasets (imagery, CAD, zero-g flight footage) to kick off the simulation environment.

4. **Log weekly:** Add a new dev log entry each week as work progresses. Keep it honest — "tried X, didn't work because Y" is more valuable than a polished recap.

---

## References & sources on the site

All content is grounded in:
- Your published SmallSat 2026 paper with Goldstein & Cahoy
- Freitag's MIT thesis on ORLO sequencing
- Existing ORLO zero-g flight data and qualification test results
- Harvard SEAS write-up of your senior project

Everything is public or will be redacted/synthetic before publication. No proprietary data.

---

**Questions?** The content document (`docs/orlo-agent-site-content.md`) contains all the source material for the site. Refer to it if you need to verify facts or add more context later.

Good luck with the project!
