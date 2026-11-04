What changed
The tile is now thicker (30 mm, up from 10 mm). It is mostly ABS plastic, with 8 small servo motors and 4 steel pads. The old structure weight of 65 kg was a guess based on a solid tube. That is too heavy for plastic tiles.

New numbers (first estimate)
1. Structure for the whole 100-tile stack: about 15.5 kg. It is four thin steel posts, ring frames, a base plate and small brackets.
2. Robot dry mass: about 35.5 kg, down from 85 kg. This is the structure plus the 20 kg crawler.
3. System total: about 79 kg, down from 135 kg.
4. Two-robot build: each robot carries 49 tiles. Its structure is 9.3 kg, so each robot is 29.3 kg.
5. Stack pitch (the up-and-down spacing of tiles in the magazine): 30 mm, so 100 tiles stand 3.0 m tall.

How it was sized
A hand calculation assumes a launch load of 10 g along the stack and 3 g sideways. The post margins are thin (about 1.5 to 2.2). The load case is an assumption, not a real launch vehicle.

What the simulation now uses
The simulation takes the full inertia of the robot and the tile, built from the parts, and the 30 mm stack pitch. The wheel sizing and the two-robot results on this site were re-run with these numbers. The rail plane height (23 mm) and the gantry lift (30 mm) are guesses.
The search and robustness results for the build orders were not re-run. They still use the first parameters.

What is still open
1. The servo, ABS fill and fastener masses are guesses.
2. The 20 kg crawler has no parts list.
3. The 3 m tall stack on a 0.2 m base has not been checked for tipping or stiffness.
4. The simulation still ignores the 1.5 mm offset of the tile centre of mass and the spin of the servo rotors.

Every value in the new sheet carries a status: measured, CAD, datasheet, estimate or guess. Fusion CAD data will replace the guesses.
