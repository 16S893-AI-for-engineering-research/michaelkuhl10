# ORLO Assembly Agent — Site Content & Ground Truth

*Prepared for: portfolio site, "AI Agents for Engineering Research"*
*Scope: Phase 0 from the Locker to Lattice roadmap — the O1 + O2 pairing ("Perceive, Detect, Replan")*

Hand this whole file to Claude Code and say something like: *"Use this as the accurate, ground-truth content for the site's About, Problem, Approach, and Development Log pages — adapt tone/length to fit the layout, but don't invent facts that aren't here."* Everything below is either (a) verified from your own published work and MIT sources, or (b) clearly marked as the plan/proposal for a project that hasn't started building yet — keep that distinction when it goes on the site.

Working title for the project itself: **ORLO Assembly Agent** — tagline *Perceive → Detect → Replan.* Swap it if you already have a name you like better.

---

## 1. Project Info (About / Home page)

**Who you are:** Michael Kuhl, graduate student, MIT Department of Aeronautics and Astronautics, working in the Space Telecommunications, Astronomy and Radiation Laboratory (STAR Lab) under Prof. Kerri Cahoy. This site is built for *AI Agents for Engineering Research*, applying course concepts to your own ongoing hardware research.

**The bigger picture — ORLO:** Orbital Locker (ORLO) is a robotic system developed at MIT STAR Lab for autonomous in-space assembly and deployment of modular CubeSats. It's a free-flying platform carrying a Cartesian gantry robot and a stock of standardized sub-U modules (three combine into a 1U CubeSat); it identifies modules with fiducial markers, sequences their assembly with a graph-based planner, and has already demonstrated a full 72-second autonomous assembly during a zero-gravity parabolic flight (MIT MAS.838/16.88, "Prototyping our Sci-Fi Space Future"). You and your labmates (Jonah Goldstein, Prof. Cahoy) published "Design and Validation of a Modular CubeSat Framework for In-Space Assembly" at SmallSat 2026, describing four standardized module classes (controller, visible imager, IR camera, power utility) and structural qualification testing to Falcon-9 secondary-payload standards — fundamental frequencies above 45 Hz against a 35 Hz requirement, frequency shift under 2.5% against a 5% acceptance threshold. Thermal, radiation, and operational-longevity testing toward TRL 6 is ongoing. The follow-on concept, ORLO STAR, extends the same idea to assembling large tiled structures — mirrors or solar arrays — in orbit.

**This project's outline:** ORLO's existing pipeline works, but it's brittle in two specific ways (detailed on the Problem page): module identification depends on fiducial markers that don't hold up to real orbital lighting, and the assembly sequence is planned once, offline, with no way to notice or react when something doesn't go as planned. This project builds a software agent that closes that loop — it perceives the true state of the locker, detects when something has gone wrong, and replans the assembly sequence on the fly, instead of assuming everything works the first time.

---

## 2. The Problem

In-space assembly only pays off if it's *reliable* — a satellite constellation operator gets no benefit from on-demand CubeSat assembly if the assembly step itself is the least trustworthy part of the mission. ORLO has already cleared a major bar: it's flown, it's survived launch-level vibration testing, and it has a working assembly-sequence planner (built by labmate Leila Freitag, who framed module ordering as a graph optimization problem and validated it in microgravity). But two assumptions sit underneath that success, and both break down outside a controlled demo flight.

**Perception is brittle.** Module identification currently relies on fiducial markers (visual tags read by camera) to tell the gantry robot which module is which and exactly where it sits. Fiducials are a reasonable starting point, but they're a known single point of failure: orbital lighting swings from harsh direct sun to deep shadow far faster than terrestrial lighting, markers can be partially occluded by the gantry arm or by other modules, and a damaged or misprinted marker simply can't be read. When the marker read fails, the whole assembly pipeline has nothing to fall back on.

**Planning doesn't adapt.** The graph-based sequencer computes an assembly order in advance and executes it open-loop. It has no model of things going wrong mid-assembly — a module that doesn't fully seat, a connector that fails continuity check, a gantry position that drifts outside tolerance. Today, an off-nominal event during assembly isn't something the system reasons about; at best it stops and waits for a human.

Neither gap is really about ORLO specifically — they're the two places every "autonomous assembly" claim in the in-space-servicing literature quietly assumes nominal conditions. That's the research question this project takes on: **can an agent perceive the real state of a modular assembly system under uncertainty, and use that perception to decide — in real time — whether to retry, reorder, or escalate, instead of just executing a fixed plan?**

---

## 3. The Approach

The project builds one agent with two tightly coupled halves, matched to the two gaps above.

**Perception & pose half (O1).** Rather than treating fiducial reads as ground truth, build a perception module that produces a *pose estimate with a confidence score*, and treat a low-confidence or failed read as a signal in its own right — not just a missing value. Concretely: start from whatever fiducial-marker imagery and locker CAD/video already exist from the zero-g flight and lab testbed (worth checking with Freitag/Goldstein for existing datasets before generating new ones), and either (a) train a lightweight learned pose estimator as a fallback/complement to the fiducial reader, or (b) build an uncertainty model around the existing fiducial pipeline (e.g., flag ambiguous, occluded, or out-of-tolerance reads) — the second option is the more tractable one-semester scope if training data is scarce. Either way, the output isn't just "module X is at pose Y," it's "module X is at pose Y, confidence Z, anomaly flag [none / occlusion / damage / mismatch]."

**Replanning half (O2).** This is the "agent" in the agentic sense: a decision-making loop that consumes the perception module's output plus execution telemetry (gantry torque, position error, continuity check results) and chooses an action — proceed, retry the current step, reorder the remaining assembly graph around a problem module, or escalate to a human operator. This is a good fit for the tool-calling agent patterns the course covers: the perception module, the existing graph planner, and a simulated or real gantry interface can all be exposed as tools the agent calls, with the agent's job being to reason over their outputs and decide the next action rather than to re-implement any of them from scratch. A simple first version can be a rule-based or classical decision policy (useful as a baseline); the more interesting version uses an LLM-orchestrated agent loop or a learned policy (contextual bandit / lightweight RL) trained against a simulated fault distribution.

**Development environment.** Real hardware time on the ORLO testbed may be limited this semester, so plan for two tracks in parallel and let real access set the balance: a **simulation track** (synthetic multi-view renders of the locker with injectable faults — occluded marker, misaligned module, failed connector — cheap to generate in bulk and the only practical way to get enough fault examples to test replanning logic) and a **hardware-in-the-loop track** (validating the perception model against real ORLO testbed imagery, and if lab time allows, running the full perceive-detect-replan loop against the actual gantry). Building the simulation track first de-risks the semester regardless of how much lab access materializes later.

**Suggested milestones:**
1. Stand up the perception module against existing ORLO imagery/CAD; establish a confidence/anomaly-flagging baseline against plain fiducial reads.
2. Build the synthetic fault-injection environment; define the fault taxonomy (occlusion, damage, misalignment, failed mate, position drift).
3. Implement the agent loop (perceive → detect → decide) against the simulated environment; get a baseline rule-based policy working end to end.
4. If a learned/LLM-orchestrated decision policy is in scope, compare it against the rule-based baseline on the same fault set.
5. Validate against real testbed data/hardware to whatever extent lab access allows; report where simulation and reality diverge.

**Success metrics to define early:** perception accuracy and confidence calibration under injected occlusion/lighting faults; fraction of injected faults the agent correctly diagnoses; assembly completion rate and time-to-recovery on faulted runs versus the current open-loop baseline (which, by construction, doesn't recover at all).

---

## 4. Development / Record Log

**Purpose:** a running, honest record of what you actually did, learned, and hit friction on — not a marketing recap. Graders and future-you both get more value from "tried X, it didn't work because Y, pivoted to Z" than from a clean highlight reel. Log at whatever cadence fits the course (weekly is typical); each entry should take five minutes, not an hour.

**Entry template:**

```
### [Date]
**Status:** [e.g., Perception module / Fault environment / Agent loop / Validation]
**Did:** what you built, tried, or ran this session
**Learned:** what the result told you — including negative results
**Blocked on:** anything you're stuck on or waiting on (data, lab access, a labmate)
**Next:** the next concrete step
```

**Seed entry (real — this is when the project was scoped):**

```
### 2026-09-11
**Status:** Scoping
**Did:** Worked through the broader ORLO / ORLO STAR research landscape and picked
this project's scope: an agent that pairs perception/pose estimation with
real-time contingency replanning for ORLO's CubeSat assembly pipeline, chosen
over five other candidate directions as the strongest one-semester target —
buildable against existing hardware and flight data, and unambiguously an
agent rather than a bare model.
**Learned:** The two concrete gaps in ORLO's current pipeline are fiducial-marker
fragility (no fallback when a read is ambiguous or fails) and a fully offline
assembly-sequence planner (Freitag's graph-based sequencer) with no mechanism
to react to an off-nominal event during execution.
**Blocked on:** Nothing yet — next step is confirming what testbed imagery,
CAD, and zero-g flight footage already exist before deciding how much new
synthetic data generation is actually needed.
**Next:** Reach out to labmates about existing ORLO datasets and the graph
planner's code, then start the fault taxonomy for the simulation track.
```

From here, replace the template with real entries as you go — don't pre-write future ones.

---

## 5. Optional: tying the animation and Easter egg to the theme

Not asked for, but since the course requires both anyway, two ideas that use real project content instead of generic decoration:

- **Animated element:** a small looping diagram of the perceive → detect → replan loop itself (three nodes, a cycling highlight, maybe an occasional "fault injected" flash that reroutes the cycle) — doubles as a figure that explains the project and satisfies the animation requirement in one element, rather than a decorative flourish bolted on separately.
- **Easter egg:** hide a tiny fault-injection toggle somewhere non-obvious (a click on the gantry icon, a Konami code, a long-press on the ORLO logo) that, when triggered, visibly "breaks" the animated loop above and shows it recovering — a payoff that's actually about the agent's whole point (detecting and recovering from a fault) rather than an unrelated joke.

---

## Sources (for anything you want to double-check or cite)

- [Orbital Locker: On-demand on-orbit modular satellite assembly (MIT MAS.838/16.88)](https://zero-gravity.pubpub.org/pub/qhc9wr7r)
- [Kuhl, Goldstein & Cahoy — "Design and Validation of a Modular CubeSat Framework for In-Space Assembly," SmallSat 2026](https://digitalcommons.usu.edu/smallsat/2026/all2026/28/)
- [Freitag — "Planning for in-Space Robotic Assembly of Modular CubeSats," MIT thesis](https://dspace.mit.edu/handle/1721.1/165118)
- [Michael Kuhl's senior project: A satellite that can build more satellites (Harvard SEAS)](https://seas.harvard.edu/news/michael-kuhls-senior-project-satellite-can-build-more-satellites)
