What it is
A Python simulation of robots building a 10x10 grid of 1 m tiles in free space. No ground holds the structure. When a robot moves one way, the structure turns the other way, because the total angular momentum stays zero.

How it works
1. params.py holds every physical number (masses, sizes, speed limits). No other file has its own numbers.
2. A path file sets the build order (snake, spiral, backbite and others) and the type of each tile.
3. The rail and motion files turn the path into robot positions and speeds over time, inside friction and turn-speed limits.
4. momentum_core.py tracks every moving body (robots, gantry, tiles) in 6 degrees of freedom. It finds how far the structure turns at each moment.
5. validation.py checks the results against tolerances. A run that fails a check stops with an error.
6. Search and comparison scripts run many build orders and robot counts, and rank them by build time and final tilt.
7. wheel_sizing.py finds the momentum a reaction wheel must store to hold the structure still, and compares flown wheels.

How it was built
I wrote the code with AI coding agents (Pi). Each step had a written task with acceptance criteria and a test for each criterion. More than 30 test files check the physics: momentum conservation, known analytic cases, and checks that must fail when a fault is injected.

Source code: private repository (michaelkuhl10/orlo-zig). Ask me if you want access.
