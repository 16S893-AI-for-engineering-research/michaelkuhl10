## The issue

I would like to present my initial goals of understanding the attitude and time effects of assembling a 10x10 tile structure in space given a set of initial parameters. We started with an initial idea of assembling using a 2-robot system: a robot that can travel in the Y-direction and store tiles, and a second robot which is loaded with 10 tiles at a time and assembles them. The initial analysis, compared to a 1-robot system, proved to be more complex and required more time. Next, several one-robot assembly strategies were tested. This process took far longer than expected and required over $240 of compute. This was from extensive tests and requirements associated with each simulation. This persisted even when breaking the tasks into smaller components and tackling them with a lighter-weight model (Sonnet 5.5), but it was less expensive.

## What I want out of this session

Feedback on processes, and advice for next steps: tools or ways of completing the tasks that are more efficient, better thought out, or that use tools/skills/AI capabilities that I have not taken advantage of.

## What I will show

I want to show the evolution of the simulations, resulting in an outward spiral as the best balance of speed, attitude change, complexity, and stability (by always connecting new tiles to two existing tiles).

**Why spiral outward:** The snake path has a lower peak attitude change (61.7 deg against about 180 deg) and is about 5 s faster. The outward spiral has a lower final attitude change (46.4 deg against 61.7 deg). We have settled on the outward spiral because of the added security: after the first two tiles, every new tile always connects to two anchors (two tiles that are already in place). In the snake path, most new tiles connect to only one tile until the next row starts.

### 1. Two robots (A1) vs. one robot (A2)

Here are the graphs/simulations of the 2-robot system compared with the 1-robot system.

![A1 two-robot vs A2 one-robot assembly](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/animations/a1_vs_a2.gif)

![Fig 5: A1 vs A2 time and attitude](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig05_a1_vs_a2_time_and_attitude.png)

- A1 (two robots, with return trips): 1086 s, peak attitude error 24.4 deg, final 14.0 deg.
- A2 (one robot): 304 s, peak and final attitude error 61.7 deg.
- A1 tilts less, but takes 3.6 times longer and needs 19 in-place pivots that are not yet shown to be mechanically possible.

### 2. Testing other shapes and paths with one robot

![Straight, staircase and elbow layouts](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/animations/shape100_clip.gif)

![Fig 3: SHAPE100 time vs attitude trade-off](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig03_time_vs_attitude_tradeoff_shape100.png)

### 3. 10x10 square: snake vs. spiral vs. backbite paths

![Snake, spiral-outward and backbite on the 10x10 square](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/animations/sq100_main.gif)

Four-way comparison (MP4): [sq100_four_way.mp4](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/blob/main/pod-clinic/animations/sq100_four_way.mp4)

![Fig 1: Attitude vs time, 10x10 square](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig01_attitude_vs_time_sq100.png)

![Fig 2: Time vs attitude trade-off, 10x10 square](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig02_time_vs_attitude_tradeoff_sq100.png)

| Path | Motion time (s) | Peak attitude (deg) | Final attitude (deg) |
|---|---:|---:|---:|
| Snake (baseline) | 303.8 | 61.7 | 61.7 |
| Spiral outward | 309.1 | ~180 (not resolved) | 46.4 |
| Spiral inward | 308.6 | ~180 (failed sampling check) | 29.2 |

**Selected: spiral outward.** It trades a higher peak attitude change for a lower final attitude change and two-anchor connections for every tile after the first two.

### 4. Outward spiral: start, middle, and end

| Start | Middle | Final |
|---|---|---|
| ![](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/stills/spiral-outward_start.png) | ![](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/stills/spiral-outward_middle.png) | ![](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/stills/spiral-outward_final.png) |

### 5. Robustness: changing mass and inertia

![Fig 4: Robustness spread](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig04_robustness_spread_zo23.png)

### 6. What sets the real finishing time

![Fig 6: Motion time vs seam joining time](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig06_motion_time_vs_seam_joining.png)

At an assumed 600 s per seam, joining takes about 30 h and robot motion is less than 0.3 % of the total time.

### 7. What is verified, assumed, and unknown

![Fig 8: Validation gap map](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/raw/main/pod-clinic/figures/fig08_validation_gap_map.png)

Repo files to look at:
- All figures and animations: [`pod-clinic/`](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/tree/main/pod-clinic)
- Full report: [ORLO_Zig_assembly_report.pdf](https://github.com/16S893-AI-for-engineering-research/michaelkuhl10/blob/main/pod-clinic/ORLO_Zig_assembly_report.pdf)
- Task plan history: Backlog tasks ZO-1 to ZO-24 in the ORLO-Zig simulation project

## Where I want feedback

Issues that I have encountered with compute cost and time of task completion after using Backlog to plan.

Examples:
- **Planning made the work very large.** Backlog split the project into 24 main tasks (ZO-1 to ZO-24) and many subtasks. Each task had 3 to 10 acceptance criteria, tests, and an independent agent review. The repo now has 37 test files and a full suite of more than 800 tests. Was this level of checking needed for an early design study?
- **One simulation is slow.** One 100-tile run takes about 9 to 12 minutes and about 200,000 to 270,000 solver steps, because each case runs a nominal solve and a tighter refined solve. A single robustness study needed 10 variants for each strategy.
- **The agent waited and re-ran work.** The agent often waited for long runs to finish, and re-ran checks and full test suites after small changes. Some runs failed the sampling check and needed a tighter re-run, which still failed (spiral-inward and snake without final travel).
- **Review loops added cost.** Each independent review found small problems (wording, file traceability, report layout). Each fix started another round of checks and builds.
- **What helped:** In ZO-23.3, I ran the robustness matrix as a background script with no agent reasoning. This cost much less than having the agent watch each run.
- **Smaller model:** Moving to a lighter-weight model (Sonnet 5.5) for smaller tasks lowered cost, but the total time stayed long.

Questions for the class:
- How do you decide how much testing and review an agent should do on an early study?
- Do you run long simulations outside the agent and give the agent only the results?
- Do you set a budget for cost or time for each task, and how do you enforce it?

## What I want help brainstorming

Next steps:

I am interested in whether a 2- or 3-robot system can exactly cancel out the attitude change that occurs during 100-tile assembly. I also want to see how a multi-agent team on the robots might be able to deal with one of the robots going offline or breaking down. Any help brainstorming how to do these would be great.

### Questions I do not know the answer to

- Can two or three robots that move in opposite directions keep the total angular momentum and the net rotation at zero during the full build?
- Is "exact" cancellation possible, or only cancellation at the end of each step?
- What is the best way to search for these multi-robot schedules: optimization, reinforcement learning, or hand-designed symmetric paths?
- If one robot stops, how do the other robots split its tasks, and how much attitude error does the change cause?
- How do I set up the AI agents so that each simulation run costs less, and the agent does not repeat checks?
- When should I use a large model, a small model, or a plain script with no model?
