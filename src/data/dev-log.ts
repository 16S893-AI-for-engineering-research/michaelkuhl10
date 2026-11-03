// Dev log entries, newest first.
//   aiSummary:     fact-based bullets, one line per concrete thing done.
//   personalNotes: my own reflections on the same session.
// The dev-log-entry skill (.pi/skills/dev-log-entry) inserts new entries
// right after the "const entries = [" line below.

export interface DevLogEntry {
  date: string;
  title: string;
  aiSummary: string[];
  personalNotes: string;
  attachment?: { href: string; label: string };
  image?: { src: string; alt: string; caption?: string };
  essay?: 'debate';
}

export const entries: DevLogEntry[] = [
  {
    date: '2026-11-03',
    title: 'Rebuilt this website: light design, one project story, a Documents page, and no schedule',
    aiSummary: [
      'Replaced the dark theme with a light, white design and one arc-reactor blue accent.',
      'Rewrote the Project page in order: robot count, path search, robustness, outward spiral, wheel sizing, next steps.',
      'Added 10 key figures and videos, including a new project flow chart and a new reaction wheel results plot.',
      'Added a Documents page with every report, walkthrough, essay and reference in one place.',
      'Removed the Schedule page, 30 screenshot scripts, duplicate PDFs and the unused React setup.',
      'Moved the dev log entries to src/data/dev-log.ts and drafted notes for the 19 entries that had none.',
      'Changed the three looping GIFs to MP4 video: 9.7 MB down to 0.8 MB.',
    ],
    personalNotes: `I rebuilt this website as a clean, light site that tells the project story in order. The Project page now walks from the robot count study to the outward spiral and the reaction wheel, with the key figures and videos. I removed the schedule page and the clutter in the repo so that the site is easier to keep up to date.`,
  },
  {
    date: '2026-11-02',
    title: 'Made 9 checked paper cards from the first 12 pulled papers, and listed journals to follow',
    aiSummary: [
      'Asked which journals to follow; the list starts with Acta Astronautica, JGCD and IEEE Transactions on Robotics.',
      'Pulled 12 of the 23 pull-list papers from MIT Libraries and other sources; Git ignores the PDFs.',
      'Wrote card_tool.py: it extracts PDF page text and checks every quote on a card against that text.',
      'Nine agents wrote one card each; after a fix to the two-column text, all 140 quotes match the PDFs.',
      'Changed the cards to use plain concepts instead of task numbers, and added scope and gaps sections.',
      'Attached the 12 PDFs to their Zotero items as linked files and tagged the 9 carded papers.',
      'Cost: $7.04 across 20 session logs, including the card agents (from the Pi session logs).',
    ],
    personalNotes: `I pulled 12 papers from MIT Libraries and other sources, and the agents turned 9 of them into paper cards with checked quotes and page numbers. I asked for cards that use plain concepts instead of task numbers, and that include each paper's scope, gaps and future work. Next I will review the Hastings and HOTDOCK cards and then close out the breadth search.`,
  },
  {
    date: '2026-10-30',
    title: 'Checked the wheel masses and wrote a summary of the wheel sizing equations',
    attachment: {
      href: '/docs/Reaction_Wheel_Sizing_Equations.pdf',
      label: 'Reaction wheel sizing equations (PDF)',
    },
    aiSummary: [
      'Asked why the graphs show different wheel masses than the BCT website.',
      'The graphs show a set of three wheels (one per axis), for example 3 x 3.2 kg = 9.6 kg for RW4.',
      'The RW1 mass in the code (1.1 kg) does not match the 0.95 kg on the BCT website; RW2 and RW16 are not modelled.',
      'Wrote a Markdown summary with 7 numbered equations in 3 steps: momentum balance, peak needs, wheel size.',
      'Made a 2-page PDF of the summary with pandoc and pdflatex, and checked both pages as images.',
      'Cost: $1.42 across 2 sessions (from the Pi session logs).',
    ],
    personalNotes: `I wanted to understand the equations behind the reaction wheel sizing, not only the results. After a few tries, a short Markdown summary with seven equations and a two-page PDF was the best way to read the math. I also found that the graphs show the mass of three wheels, and that the RW1 mass in the code (1.1 kg) does not match the 0.95 kg on the BCT website.`,
  },
  {
    date: '2026-10-28',
    title: 'Installed the figure tools and rebuilt the literature toolkit walkthrough with diagrams',
    attachment: {
      href: '/walkthroughs/literature-toolkit-walkthrough.html',
      label: 'Literature toolkit walkthrough (HTML)',
    },
    aiSummary: [
      'Found the figure tools (figkit) inside the show-not-tell package; the class repo only points to it.',
      'Installed uv, librsvg, two fonts and TinyTeX; check-env.sh then printed "figkit: environment ok".',
      'Added the TinyTeX folder to PATH in ~/.zshrc so future Pi sessions find xelatex.',
      'Rebuilt the literature toolkit walkthrough with 2 diagrams and 1 plot; lint found 0 problems.',
      'Ran 8 unit tests and the workbook check (235 papers); 4 injected errors gave 6 messages, exit 1.',
      'Published the page under public/walkthroughs/ on this site; the deploy passed and the URL returned HTTP 200.',
      'Cost: $2.24 across 3 sessions, up to publishing the page (from the Pi session logs).',
    ],
    personalNotes: `My core contribution to this overall project is:
1. Establishing a robotic assembly strategy and mapping the attitude effects of that strategy.
2. Sizing and programming an appropriate reaction wheel for that robotic assembly procedure, so that there is no attitude change throughout the duration of the assembly.
3. Using a team of robots (instead of one) to reduce the need for a reaction wheel.
4. How a robotic team operates and completes the intended assembly under uncertainty and failure. For example, if one robot fails in a 2 robot team, how does the surviving robot identify the failure, understand the state of the assembly, and achieve mission success regardless of the failed robot?

I do not yet know how to check step 4, and I plan to check it through simplified simulations. I will also refer back to the literature on how people have accomplished similar tasks and use their identified testing methodologies for my own work.`,
  },
  {
    date: '2026-10-28',
    title: 'Ran the breadth search for all four stages and committed the literature toolkit (ZO-30.5)',
    aiSummary: [
      'Approved the triage and a 23-paper pull list: 7 need the MIT library, 13 are free, 2 web, 1 not found.',
      'Four parallel subagents searched OpenAlex, NTRS and arXiv for stages S1 to S4, with snowballing.',
      'Kept 161 new papers after removing duplicates; 45 are at read level 1 to 3; 332 queries are logged.',
      'OpenAlex hit its daily limit: 65 queries returned a false zero and need a re-run after midnight UTC.',
      'A script checks each candidate against the raw database answer; it found 0 problems in 178 records.',
      'Committed everything as one commit of 339 files, mostly stored search answers.',
      'Cost: $11.48 across 5 session logs, including the 4 subagents (from the Pi session logs).',
    ],
    personalNotes: `I approved the triage and a 23-paper pull list, then had four subagents search the databases for all four stages at the same time. The search added 161 new papers, but OpenAlex hit its daily limit and 65 queries came back as false zeros that I still need to re-run. Running subagents in parallel was fast, but at $11.48 this was my most expensive literature session so far.`,
  },
  {
    date: '2026-10-27',
    title: 'Built the literature workbook, harvested 74 seed references and drafted their triage (ZO-30.1 to ZO-30.4)',
    aiSummary: [
      'Set up Zotero with Better BibTeX, 8 collections and an auto-export; checked through the local API.',
      'Built lit_toolkit.xlsx (10 sheets) and lit_tool.py (init, check, import, export); 7 unit tests passed.',
      'Harvested 74 seed references from two papers: 44 verified, 20 web-only, 10 not found, with evidence.',
      'Pushed 64 to Zotero and matched their citekeys to library.bib.',
      'Drafted a triage of all 74 by stage, topic and read level; 12 read levels were flagged as uncertain.',
      'Delegated the workbook, harvest and triage steps to three subagents.',
      'Cost: $8.19 across 4 session logs, including the subagents (from the Pi session logs).',
    ],
    personalNotes: `I set up Zotero and a spreadsheet workbook so that each paper has one record that joins the PDF to my notes. The agents harvested 74 references from my two seed papers and checked each one against a database, so nothing is cited from memory. I still need to review the 12 read levels that the agent marked as uncertain.`,
  },
  {
    date: '2026-10-27',
    title: 'Planned a literature review toolkit (Zotero plus spreadsheet) and committed the pending work',
    aiSummary: [
      'Brainstormed how agents can find and explain the in-space assembly literature; the output was a plan.',
      'Design: four stages (Value, Method, Improvement, Robustness) and a read level of 0 to 3 for each paper.',
      'Zotero holds the PDFs and a spreadsheet holds the notes; the Better BibTeX citekey joins the two.',
      'Saved the design and a resume guide as backlog docs; created tasks ZO-30 and ZO-30.1 to ZO-30.8.',
      'Committed the shorter ZO-24 animations (about 27 s), the ZO-25 wheel PDF and the pod clinic write-up.',
      'Did not commit the seed PDFs, or my filled-in notebook, which would put my answer in the shared copy.',
      'Cost: $3.07 for 1 session (from the Pi session logs).',
    ],
    personalNotes: `I wanted a way for agents to help me find and understand the in-space assembly literature without losing track of what I have read. We settled on four stages (value, method, improvement, robustness) and a read level for each paper, with Zotero for the PDFs and a spreadsheet for the notes. I kept my filled-in teaching notebook out of the shared repo so my own answers stay private.`,
  },
  {
    date: '2026-10-26',
    title: 'Caught up on the reaction wheel work and built a wheel comparison PDF',
    aiSummary: [
      'Asked for a summary of the wheel sizing work and the key documents.',
      'Built deliverables/zo25/wheel_comparison.pdf with the key tables and charts, plus a script to rebuild it.',
      'Checked the PDF pages as images and as text before handing it over.',
      'Asked for plain-language definitions of no wheel limit, uniform slow-down time and per-move slow-down time.',
      'Cost: $0.83 for 1 session (from the Pi session logs).',
    ],
    personalNotes: `I came back to the reaction wheel work after a break and needed one place to see the results. The wheel comparison PDF puts the key tables and charts side by side, and it made the torque problem clear. Plain definitions of the slow-down terms helped me explain the results to other people.`,
  },
  {
    date: '2026-10-25',
    title: 'Recorded the ZO-24 decision and sized a reaction wheel for spiral-outward assembly (ZO-25)',
    attachment: {
      href: '/walkthroughs/reaction-wheel-sizing-walkthrough.html',
      label: 'Reaction wheel sizing walkthrough (HTML)',
    },
    aiSummary: [
      'Decision: continue with spiral outward. Track 1: wheel, mirrored robots, recovery. Track 2: count paths.',
      'Holding attitude at full robot speed needs 7.33 N m s of stored momentum and 18.0 N m of torque (z axis).',
      'My candidate wheel (NanoAvionics 4RW0) is 235x too small in momentum; robot motion would take 4.8 h.',
      'Three BCT RW4-HT wheels (9.6 kg) give about 13.5 min of robot motion, against 5.15 min with no wheel limit.',
      'Wrote FlightController (wheel_control.py, 50 Hz, gyro and star tracker); it held attitude within 0.01 deg.',
      'Added 5 teaching notebooks in notebooks/zo25/; the full suite passed with 957 tests.',
      'Cost: $5.86 for 1 session (from the Pi session logs).',
    ],
    personalNotes: `After the pod clinic, I decided to keep the outward spiral and size a reaction wheel that holds the structure still during assembly. The result surprised me: no flown wheel has enough torque, so the robot must slow down, and the best set (three BCT RW4-HT wheels) stretches robot motion from about 5 minutes to 13.5 minutes. The teaching notebooks let me work through the momentum equations myself instead of only reading the answer.`,
  },
  {
    date: '2026-10-19',
    title: 'Wrote the class briefing and posted it as a GitHub issue on this repo',
    aiSummary: [
      'Drafted a briefing on the work so far, the problems I met and where the project goes next.',
      'Posted it as issue 2 on this repo, "Pod clinic: Attitude and time effects of a 10x10 tile structure".',
      'Added "Why spiral outward". Snake path: lower peak tilt (61.7 deg vs about 180 deg) and about 5 s faster.',
      'Spiral has the lower final tilt (46.4 vs 61.7 deg) and was chosen for the security of two-anchor joins.',
      'Added six feedback examples from the project data and three questions for the class.',
      'Cost: $1.01 for 1 session (from the Pi session logs).',
    ],
    personalNotes: `I wrote up my work so far for the class pod clinic and posted it as a GitHub issue. Writing the "Why spiral outward" section made me state the trade clearly: the snake path is slightly faster with a lower peak tilt, but the spiral ends with less tilt and joins new tiles to two existing tiles sooner. My main questions for the class were how much testing an early study needs and how to keep compute cost down.`,
  },
  {
    date: '2026-10-16',
    title: 'Made the report videos 3x faster by re-rendering them',
    aiSummary: [
      'Main and four-way videos went from 83 s to 30 s; a1_vs_a2 went from 63 s to 23 s.',
      'Changed speeds in render_jobs.json and re-rendered; an ffmpeg speed-up would break the on-screen readout.',
      'The close-up now plays at 1.2x real speed, so the report text says "close-up", not "slowed down".',
      'Rebuilt report.pdf, slides.pdf and report.html; the render check and 33 tests passed.',
      'Cost: $0.37 for 1 session (from the Pi session logs).',
    ],
    personalNotes: `The report videos were too long for a short presentation, so I had them re-rendered about 3 times faster. A plain ffmpeg speed-up would have broken the on-screen time readout, so re-rendering was the correct fix. This was a cheap session that made the results much easier to present.`,
  },
  {
    date: '2026-10-15',
    title: 'Finished ZO-24: shareable report, slides and decision package with one independent review',
    aiSummary: [
      'ZO-24.6: one command builds a 16-page report, an 18-slide deck and a self-contained HTML with the video.',
      'Every number in the report comes from the claim ledger; a script fails the build on a hand-typed number.',
      'Found a ZO-24.4 caption error: motion share at 600 s per seam was 50.07 %, the correct value is 0.28 %.',
      'One read-only reviewer agent gave 16 findings; I checked each against the sources and fixed all 16.',
      'Fixed covered labels in 4 figures and all movie layouts, re-rendered the media, added overlap tests.',
      'Checks: 937 tests passed, render verify passed, and the evidence check loaded 167 of 167 sources.',
      'Cost: $8.51 across 3 sessions, including the reviewer run (from the Pi session logs).',
    ],
    personalNotes: `This session turned the simulation results into a report, a slide deck and an HTML page that I can share. Tying every number to a claim ledger caught a real caption error (50.07 % that should have been 0.28 %), which showed me the value of that check. One independent reviewer found 16 problems, and all of them were fixed before I shared the package.`,
  },
  {
    date: '2026-10-15',
    title: 'Made a plain-language rule file that shapes every agent reply, not a tool or a skill',
    aiSummary: [
      'Goal: short, plain replies in every session, guided by Simplified Technical English (ASD-STE100).',
      'I asked if this should be a tool or a skill. The answer was neither.',
      'A tool is an action the agent calls. A skill loads only when the agent decides it needs it.',
      'Chose ~/.pi/agent/APPEND_SYSTEM.md. Pi adds it to the base instructions in every session and folder.',
      'First version: rules for sentences, words and structure, plus a list of plain replacement words.',
      'Added a rule for vague references like "per note 4.1S": restate the point and say where it came from.',
      'Limits: a project-level file replaces this one, and the full 900-word STE dictionary was left out.',
    ],
    personalNotes: `I wanted shorter, plainer replies from the agent in every session. I learned the difference between a tool, a skill and a system prompt file, and the right choice was an always-loaded rule file based on Simplified Technical English. Replies are now easier to read, especially when the agent refers back to earlier work.`,
  },
  {
    date: '2026-10-15',
    title: 'Closed ZO-23 robustness study and built the ZO-24 animations, figures and decision package',
    aiSummary: [
      'ZO-23.3 and 23.4: 20 robustness runs finished (12 pass, 8 unknown, 0 fail); snake passed 10 of 10.',
      'Snake peak attitude is 0.983 to 1.355 rad (nominal 1.077); the outward spiral peak sits near 180 degrees.',
      'ZO-23.5 and 23.6: peak 71.0 N and 570 W are gantry events; the report calls the snake a sound baseline.',
      'ZO-23 closed. The report does not claim the snake is buildable or optimal.',
      'ZO-24.1 and 24.2: froze 167 hash-bound sources and a 207-claim ledger; built a renderer for saved histories.',
      'ZO-24.3 and 24.4: rendered 5 movies and 32 stills, fixed an ffmpeg hang, and made 8 figures.',
      'ZO-24.5: drafted the decision package with 3 candidate validation experiments; it awaits your review.',
    ],
    personalNotes: `The robustness runs showed that the snake path holds up when the mass and inertia change, and none of the 20 runs failed. I also built the animations, figures and source ledger that I later used for the pod clinic. The report does not claim that the snake is buildable or optimal, which matches how early the model still is.`,
  },
  {
    date: '2026-10-14',
    title: 'Started ZO-23: mass-property override and the robustness run matrix',
    aiSummary: [
      'ZO-23.1: added a per-run mass-property override to the evaluator; default output is unchanged.',
      'A non-uniform time-warp test shows that attitude does not change with timing.',
      'ZO-23.2: froze the run matrix and wrote a parallel, resumable run driver.',
      'The nominal snake reproduces through the override path with zero difference.',
    ],
    personalNotes: `I started the robustness study by letting each run change the mass properties without changing the default results. Freezing the run matrix and writing a resumable driver let the runs go in the background. This was the first time I set up a long run so that the agent did not have to watch it.`,
  },
  {
    date: '2026-10-13',
    title: 'Recapped sessions, updated this log, and split ZO-23 into six cheaper tasks',
    aiSummary: [
      'Asked for a recap of the last session; later sessions were only questions and logouts.',
      'Added 7 dev log entries for the 10/01 to 10/06 ORLO-Zig sessions and pushed them.',
      'Measured one evaluation at 558 to 740 s: about 170,000 physics calls plus a tighter re-solve.',
      'Split ZO-23 into ZO-23.1 to ZO-23.6 in Backlog, each with exit criteria.',
      'Cut SHAPE100 and timing-only sweeps. The core matrix is 20 runs, about 1 hour at 4 to 5 in parallel.',
      'Wrote backlog doc-11: task order, parallel work, model per task, cost rules and paste-in prompts.',
      'Reviewed the simulation gaps: rigid bodies, no joint loads, unverified motor limits, estimated inertia.',
    ],
    personalNotes: `For the past several sessions, I was trying to work through tasks that had been generated through brainstorming sessions.  I have been trying to simulate and analyze various assembly strategies and compare them against each other to establish a reasonable path forward.  The simulations were far too extensive for an initial tests with robotic system parameters that are only estimates.  The tasks were too demanding and the completion criteria was not determined clearly.  The rules for the agent to operate while completing tasks was not well defined, and as such, it took a ton of time and money to work through tasks 16-22.  I have broken down task 23 into 6 narrower problems with better end conditions, better instruction, and will be using smaller models because the takss are now simpler.`,
  },
  {
    date: '2026-10-06',
    title: 'Fixed missing Opus 5.5 and Sonnet 5.5 models, closed ZO-22, ZO-23 stalled',
    aiSummary: [
      'Opus 5.5 and Sonnet 5.5 were missing because the extension was pinned to the npm @beta tag.',
      'Removed the pin in ~/.pi/agent/settings.json and updated the extension to 0.6.2; both models appear.',
      'Closed ZO-22 after 783 tests plus 27 subtests passed and all 31 published file hashes matched.',
      'ZO-23 stalled: each prompt used about 14 percent of context and no code had been written.',
      'Changed to four stages, each with a deliverable and a stop condition: scope, build, run, review.',
      'Counted what was tried: 4 shapes, 8 layouts, 9 configurations, only 5 routes for the 10x10.',
      'Asked how to optimize any 100-tile shape; answer was a multi-objective search plus a joint-load model.',
    ],
    personalNotes: `Two new models were missing from Pi because an old setting pinned the extension to a beta version. After that fix I closed the layout search, but the robustness task stalled because each prompt used a large share of the context and no code was written. I split the work into four stages with clear stop conditions so that the agent knows when it is done.`,
  },
  {
    date: '2026-10-06',
    title: 'ZO-21 comparison and ZO-22 layout search',
    aiSummary: [
      'ZO-21: evaluated all six library layouts under matched assumptions, with four new full runs.',
      '10x10: snake and outward spiral are not dominated. Free shapes: straight and staircase.',
      'Inward spiral was excluded because its peak sampling check failed.',
      'ZO-21 closed with 657 tests plus 27 subtests and a byte-identical rerun of all six cases.',
      'ZO-22: seeded search with a 64-attempt cap stopped after 3, finding two new backbite routes.',
      'Both new routes are valid but beaten by the snake. Timing-only changes gain nothing.',
      'Skipping the snake\'s final travel saves 1.36 s, but its peak attitude is unknown (sampling failed).',
    ],
    personalNotes: `I compared all six layouts under the same assumptions, and on the 10x10 grid the snake and the outward spiral were the only paths not beaten on both time and tilt. The seeded search found two new routes, but neither one beat the snake. Changing only the timing gave no gain, so the path itself is what matters.`,
  },
  {
    date: '2026-10-05',
    title: 'ZO-15 to ZO-20: design space, metrics, non-snake layouts, evaluator',
    aiSummary: [
      'ZO-15: design space in doc-5: a fixed 10x10 or any connected 100-tile shape, one forward-only robot.',
      'Joint loads are checked for printed PEEK and for fused joints at 50 percent strength.',
      'ZO-16: metrics contract (doc-6) and 82 tests; unknown limits are never treated as safe.',
      'ZO-17: audit of the 60 N, motor, turning and rail limits (doc-7); hardware feasibility unconfirmed.',
      'ZO-18: non-snake layouts and reverse travel on installed rails; a full L-shaped run works.',
      'ZO-19: library of six layouts, three 10x10 and three free-shape. 448 tests pass.',
      'ZO-20: full-run evaluator in evaluate_strategy.py; 576 tests pass; weakly resolved peaks are flagged.',
    ],
    personalNotes: `I defined the design space, the metrics and the limits before I compared any more assembly strategies. The audit of the force, motor and turning limits showed that hardware feasibility is still unconfirmed, so unknown limits are never treated as safe. By the end I had a library of six layouts and one evaluator that runs a full assembly for each.`,
  },
  {
    date: '2026-10-05',
    title: 'Assumptions sheet, meeting animation, and forward-only turning simulation',
    aiSummary: [
      'Exported 126 assumptions to ORLO-Zig_Assumptions.xlsx, read live from params.py.',
      'Marked z_rail provisional: doc-1 gives both about 13 mm and a 13 to 23 mm range.',
      'Asked what q_lB scalar-last and extrinsic xyz Euler mean; tiles are 10 mm thick but drawn flat.',
      'ZO-13: trimmed the comparison animation for a meeting: inertial views only, no CoM star or trace.',
      'ZO-14: the robot turns 90 degrees on each turn tile; chassis and carried-tile spin are included.',
      'The 60 N force budget comes from 0.48 N m motor torque on an 8 mm pinion radius.',
      'Asked if the snake is optimal; made tasks ZO-15 to ZO-24 and a brainstorming doc (doc-4).',
    ],
    personalNotes: `I exported all 126 model assumptions to a spreadsheet so that I can see every number the simulation depends on. I trimmed the comparison animation for a meeting and added realistic 90 degree turns for the robot. Asking whether the snake path is optimal led to the next set of tasks on other layouts.`,
  },
  {
    date: '2026-10-02',
    title: 'Finished ZO-8 to ZO-12: A1 and A2 scenarios, validation, animation, comparison report',
    aiSummary: [
      'ZO-8 (A1): ten sorties, 1098 rail traverses and 2196 start/stop episodes.',
      'ZO-9 (A2): 99 placements, 99 traverses, no reloads, 18 turn tiles, 1.205 m center of mass shift.',
      'ZO-10: 9 gates and 118 checks passed; fixed a 60.75 N force overshoot. 99 tests pass.',
      'ZO-11: A1, A2 and comparison animations as MP4 and GIF; 106 tests pass and all six files decode.',
      'ZO-12: A2 moves the in-plane center of mass 3.19x more; A1 has 11.09x more start/stops.',
      'A1 rail traverse time is 5.00x longer. The report names no overall winner.',
      'The report corrects early estimates and lists orbital and flexible-mode effects as untested.',
    ],
    personalNotes: `I simulated the two-robot (A1) and one-robot (A2) strategies and compared them on time and attitude change. A1 tilts the structure less, but it takes much longer and needs many more starts and stops, so the report names no overall winner. The validation step caught and fixed a force overshoot above the 60 N limit.`,
  },
  {
    date: '2026-10-02',
    title: 'Planned the ORLO-Zig assembly simulation and built ZO-1 to ZO-7',
    aiSummary: [
      'Planned a 10x10 tile array built in free space with two robot strategies, A1 and A2 (doc-1, doc-2).',
      'Installed scipy 1.17.1 and ffmpeg 9.0.2; ZO-6 got a 10/50/200 N sweep of the magnet force.',
      'ZO-1 and ZO-2: params.py as the single parameter source, and the 82 S / 10 L / 8 R tile manifest.',
      'ZO-3 and ZO-4: rail kinematics and trapezoidal planner; rail time 8.81 min for A1, 1.76 min for A2.',
      'ZO-5: 6-DOF momentum core; a saved 3-D run showed center of mass drift of 2.95e-12 m.',
      'A Sonnet agent did ZO-1 with a reviewer; two worker agents built ZO-6 and ZO-7 after I approved.',
      '63 tests pass, including a combined gantry and seating run with all 100 tiles.',
    ],
    personalNotes: `I planned the full assembly simulation for a 10x10 tile array and built the core parts: parameters, tile list, rail motion and the momentum model. The momentum model held the center of mass still to about 3e-12 m, which gave me confidence in the physics. Using worker and reviewer agents worked well once I approved each step.`,
  },
  {
    date: '2026-10-01',
    title: 'Broke the ORLO controls baseline plan into 25 Backlog tasks',
    aiSummary: [
      'Read CONTROLS_BASELINE_PLAN.md and asked for small tasks a smaller model like Sonnet could finish.',
      'Created Backlog initiative AA-1 with 25 unassigned subtasks (AA-1.1 to AA-1.25) via the CLI.',
      'Each subtask has context, scope, acceptance criteria, file references, dependencies and labels.',
      'Left out Phases 0 and 1 because the repo and its tests show they are done.',
      'Groups: requirements, trajectory, baseline controller, scheduling, reporting, MATLAB and hardware.',
      'Seven tasks can start independently, such as the thermal datum decision and trajectory generator.',
    ],
    personalNotes: `I broke the controls baseline plan into 25 small tasks that a smaller model can finish. Each task has a scope, acceptance criteria and dependencies, and seven of them can start right away. Leaving out the phases that were already done kept the list focused.`,
  },
  {
    date: '2026-10-01',
    title: 'Two subagents debated AI acceleration, then the parent agent wrote the essay',
    attachment: {
      href: '/docs/AI_Research_Debate_Essay.pdf',
      label: 'To Accelerate or to Restrain (PDF)',
    },
    essay: 'debate',
    aiSummary: [
      'Installed the pi-multiagent extension and used it to run two subagents as opposing debaters.',
      'Agent one argued for continued acceleration of AI research; agent two argued for slowing or halting it.',
      'Ran the exchange over six stages: opening cases, claim-by-claim rebuttals, and closings.',
      'Had the parent agent read both transcripts and synthesize them into a single 5 to 6 page essay.',
      'The essay covers five claims per side, the exchange, three cruxes and the common ground.',
      'Noted in the essay that the empirical examples the debaters cited were not independently re-verified.',
      'Saved the essay as a .md and a PDF and published both on this page.',
    ],
    personalNotes: `I installed the multi-agent extension and tasked two subagents to be pinned against each other in a "debate" style argument.  One agent argued for the continued acceleration of AI while the other argued for slowing or halting all research.  I had the parent agent take their arguments and produce this 5-6 page essay.`,
  },
  {
    date: '2026-09-29',
    title: 'Reproduced Figure 2 from the Astrom and Hagglund PID paper',
    image: {
      src: '/media/pid-figure-2-reproduction.png',
      alt: 'Reproduced Figure 2: stability boundaries in the k and ki plane for kd = 0, 5, 10 and 15',
      caption: 'Recreated Figure 2 from the Astrom and Hagglund PID paper: Eq. (8) stability boundaries for G(s) = 1/(s+1)^4 at kd = 0, 5, 10 and 15. Median error against the original raster was 0.40 to 0.53 px over 2251 sampled points.',
    },
    aiSummary: [
      'Found Figure 2 on page 3 of PID.pdf (journal page 1165); page 4 holds the similar Figure 3.',
      'Implemented the Eq. (8) stability boundary for G(s) = 1/(s+1)^4 in scripts/fig2_pid_stability.py.',
      'Read the axis ranges from tick pixel positions, not by guessing: k from -1 to 10, ki from 0 to 40.',
      'Over 2251 sampled points, median error was 0.40 to 0.53 px on the solid curves, all within 6 px.',
      'Fixed matplotlib: an x86_64 build shadowed the arm64 one, so I force-reinstalled it with pip3.',
      'Saved the output, an overlay check against the original raster, and the extracted original to figures/.',
      'Total runtime was under 20 minutes with no crash, in contrast to the two earlier failed attempts.',
    ],
    personalNotes: `Two failed attempts from running out of space.  tried recreating 2 different images with 2 different models, but both failed.  This was likely due to the recursive image gathering function that never concluded.  Installing the screenshot extension helped and the third graph is much simpler.`,
  },
  {
    date: '2026-09-29',
    title: 'Figure reproduction attempts from downloaded papers failed on both models',
    aiSummary: [
      'Downloaded the papers and gave the agent the file paths and the figure to recreate.',
      'Attempt one, Sonnet on a simple graph: about 30 minutes and roughly $7 before I ended it.',
      'Second attempt used Claude Opus 5 on a somewhat more complex graph: over 30 minutes of runtime.',
      'The Opus 5 run died with \'FATAL ERROR: Reached heap limit\' (JavaScript out of memory).',
      'No figure was reproduced in either attempt.',
    ],
    personalNotes: `I prompted for sonnet to reproduce a simple graph and it spent 30 minutes and took up $7 of compute before I ended the session and tried a different (somewhat complex) graph with Opus 5 which also took 30+ minutes and resulted in a FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory.  I dowloaded the papers, cited its location, and specified the figure I wanted to recreate.`,
  },
  {
    date: '2026-09-28',
    title: '3D assembly animation added to the front page',
    aiSummary: [
      'Copied assembly_3d.gif (855x648, 7.3 MB) from the ORLO* report figures into public/images/.',
      'Added the animation to src/pages/index.astro below the intro copy, using resolvePath for the base path.',
      'Wrapped it in a Figure-style block with a caption describing structure orientation during assembly.',
      'Renumbered the trailing data-reveal index so the button row still animates in sequence.',
      'Ran npm run build to verify the static site compiles with the new asset in place.',
    ],
    personalNotes: `I collected all fundamental, physical information about the robotic assembly system including mass, motors, gears, geometries, sizes, etc. and created several python scripts to organize and run physics checks as robotic control systems were built out.  With that, I was able to prompt the agent to build out basic controls for the robots that meet design criteria (speed of assembly, size of assembly, within force specs, etc.).  Afterward, I was able to render a 3D assembly plot that describes the changing orientation of the structure as it is assembled.`,
  },
  {
    date: '2026-09-22',
    title: 'Password-protected schedule page and project page rebuilt from the proposal',
    aiSummary: [
      'Pulled real course dates from the syllabus instead of guessing.',
      'Built a 14-week schedule with course and research tracks.',
      'Marked uncertain dates as projected; kept fixed deadlines accurate.',
      'Sized research tasks for agent work with weekly verification steps.',
      'Encrypted the schedule page client-side; verified no plaintext leaks.',
      'Rebuilt the project page from the submitted proposal.',
      'Removed stale "still deciding direction" language from Home and About.',
      'Verified the live site: pages, PDF, and passphrase gate all work.',
    ],
    personalNotes: `I built out an internal schedule and updated the project page based on the submitted proposal.  Opus 5 produced the result.`,
  },
  {
    date: '2026-09-22',
    title: 'Built three pi skills for the ORLO* vision project',
    aiSummary: [
      'Scoped three skills against the proposal\'s key deliverables.',
      'Built docking-sim-scenarios to generate reproducible, checksum-verified datasets.',
      'Generated 1944 scenarios in 16 seconds, byte-identical on rerun.',
      'Built vision-model-benchmark to score pose error, latency, and success rate.',
      'Fixed a real rotation-error bug found via an oracle sanity check.',
      'Benchmarked four models; classical baseline underperformed the null model.',
      'Built dev-log-entry, a skill for safely updating this log.',
      'Restored a proposal PDF missing from the working tree.',
    ],
    personalNotes: `I delivered my project proposal as a .txt in my local directory for Claude Opus 5 to read.  I had it come up with three skills that would be usefull as I progress in this project.  It developed docking simulation scenarios, a vision-model benchmark, and an update dev log skill which I am using now.  I still have to explore the skills to learn how to best use them.`,
  },
  {
    date: '2026-09-21',
    title: 'The Sept 21 Tragedy: pi loses its hands',
    attachment: {
      href: '/docs/Sept_21_Tragedy.pdf',
      label: 'Sept 21 Tragedy (PDF)',
    },
    aiSummary: [
      'Pi auto-updated and changed how it passes tools to extensions.',
      'The old extension code was incompatible, so tools silently failed.',
      'Fixed the extension to use pi\'s new helper functions.',
      'Verified file reads, writes, and commands now work again.',
      'The bug lives upstream and needs a permanent npm fix.',
    ],
    personalNotes: `I spent 45 minutes tonight developing my own skills, but ran into an issue with pi when I tried to write these to .pi/Agent/Skills.  Pi had lost all ability to utilize its tools.  I had assumed this was the result of irresponsibly executing code in my terminal.  I spent 1.5 hours on my own trying to solve the problem and 2 more hours with my roomate who spends all day in terminal, and neither of us could figure out the issue.  We even executed the forbidden rm rf command to completely get rid of pi and re-install.  It was useless.  It was not until I connected Claude in terminal that we (Claude) were able to diagnose the issue.  I (Claude) provided the summary of the issue and the solution to it on the left.`,
  },
  {
    date: '2026-09-16',
    title: 'Assignment: pull session stats from pi session log',
    aiSummary: [
      'Pulled the pi session log from Sept 14.',
      'Counted 4 prompts and 141 tool calls in that session.',
      'Prompt 1: fix the hidden JARVIS easter egg and em dashes.',
      'Prompt 2: reposition the JARVIS tag and fix padding issues.',
      'Prompt 3: push changes and confirm the live site updated.',
      'Prompt 4: fix JARVIS tab still hidden at full zoom.',
    ],
    personalNotes: `I used Claude Sonnet 5 to understand how to execute the assignment.

I then had it pull the session details from the session that used the
most number of tools, because I was curious.

It seemed readjusting sizing and padding took more tool calling than
building the website in the first place... curious.

I remember this session took quite a long time for each prompt to
render a result.`,
  },
  {
    date: '2026-09-15',
    title: 'Simplified project scope while direction is finalized',
    aiSummary: [
      'Reduced the Project page to one simple description.',
      'Removed AI-drafted milestones and metrics pending a settled direction.',
      'Removed AI-drafted publication and test-result claims from the site.',
      'Rebuilt the dev log with plain, fact-based bullet points.',
      'Set up a separate, private notes location for personal reflections.',
    ],
    personalNotes: `I cut the project page down to one simple description while I decided on a research direction. I removed claims that the AI had drafted, such as milestones and results that did not exist yet. I also set up a private place for my personal notes.`,
  },
  {
    date: '2026-09-14',
    title: 'Layout and styling fixes',
    aiSummary: [
      'Fixed a bug where the fixed header overlapped page content.',
      'Repositioned the hologram easter-egg element on the home page.',
      'Unified rounded-corner styling and button style across pages.',
      'Removed a placeholder diagram from the Project page.',
      'Removed an inaccurate personal-background detail from the About page.',
    ],
    personalNotes: `When revisiting the website on a different device, I noticed some of the padding and organization on the website was off - struggled for a bit to correct it`,
  },
  {
    date: '2026-09-11',
    title: 'Initial site build',
    aiSummary: [
      'Scaffolded an Astro + Tailwind site with GitHub Pages deploy.',
      'Built the page structure: Home, About, Project, Dev Log.',
      'Added personal photos and a short bio to the About page.',
      'Added a header, footer, and base layout shared across pages.',
      'Added an animated arc-reactor element and hover easter egg to the home page.',
      'Drafted an initial project one-pager and dev log template (later revised — see 2026-09-15).',
    ],
    personalNotes: `Jumped between models to explore cost and performance. Settled on Haiku and Sonnet as Opus was too expensive for the simplicity of the tasks performed. Used a combination of Claude Co-Work and Claude Code.  Used Co-Work to go through previously created files and come up with context that could be fed to Claude Code as it built the website.  I also used Co-Work to explore research directions and help scope something ambitious for this class. I had issues with misunderstanding context when using Haiku.  Switched over to Sonnet, and performance was better. Still have an error with the outlining of some text on the title page.`,
  },
];
