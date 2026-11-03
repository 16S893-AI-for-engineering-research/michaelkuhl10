What it is
A baseline control system for the ORLO* tile-assembly robot. It is a reference design. Later thesis work (gain-scheduled control) will be measured against it.

How it works
1. config/ holds the tile, drive, sensor and requirement values as YAML files.
2. src/orlo/plant/ models the hardware: flexible tile modes, the drive with backlash and friction, and the free-floating rigid body.
3. src/orlo/control/ holds the controller: PID feedback, feedforward, and input shaping that stops the tiles from ringing.
4. analysis/ scripts make the figures: mode frequencies, drive hysteresis, and the 3D assembly animation.
5. make test runs the physics regression tests. make figures makes the figures again.

Source code: private repository (michaelkuhl10/orlo-controls). Ask me if you want access.
