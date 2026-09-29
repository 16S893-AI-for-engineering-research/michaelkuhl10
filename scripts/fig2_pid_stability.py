"""Reproduce Fig. 2 of Astrom & Hagglund, "The future of PID control",
Control Engineering Practice 9 (2001) 1163-1175.

Source: PID.pdf, page 3 (journal page 1165).
Caption: "Stability regions for G(s) = 1/(s+1)^4 for kd = 0 (dashed),
          5, 10, 15 and 20 (dotted)."

The stability boundary is the paper's Eq. (8). Writing G(iw) = r(w) e^{i phi(w)},
the boundary of the stability region in the (k, ki) plane is

    k  = -cos(phi(w)) / r(w)
    ki = w^2 kd - w sin(phi(w)) / r(w)

traced as w goes from 0 upward. For G(s) = 1/(s+1)^4:

    r(w)   = 1 / (1 + w^2)^2
    phi(w) = -4 arctan(w)

Axis calibration was recovered from the PDF raster, not assumed: tick pixel
positions give k in [-1, 10] and ki in [0, 40], and the four ki = 0 crossings
predicted by Eq. (8) (k = 4.00, 7.44, 7.75, 4.94 for kd = 0, 5, 10, 15) land on
the detected curve endpoints to within 1 pixel.
"""

import numpy as np
import matplotlib.pyplot as plt

K_LIM = (-1.0, 10.0)
KI_LIM = (0.0, 40.0)


def stability_boundary(kd, w_max=4.0, n=200_000):
    """Boundary of the stability region in the (k, ki) plane, Eq. (8)."""
    w = np.linspace(1e-9, w_max, n)
    r = 1.0 / (1.0 + w**2) ** 2
    phi = -4.0 * np.arctan(w)

    k = -np.cos(phi) / r
    ki = kd * w**2 - w * np.sin(phi) / r
    return k, ki


def clipped(k, ki):
    """Mask the branch that stays inside the plotted axes."""
    inside = (
        (k >= K_LIM[0]) & (k <= K_LIM[1]) & (ki >= KI_LIM[0]) & (ki <= KI_LIM[1])
    )
    # Keep only the first contiguous run starting at w -> 0, so the curve is not
    # rejoined after it leaves the axes.
    if not inside.any():
        return k[:0], ki[:0]
    first = np.argmax(inside)
    end = first
    while end < len(inside) and inside[end]:
        end += 1
    return k[first:end], ki[first:end]


def main():
    cases = [
        (0, dict(linestyle="--")),
        (5, dict(linestyle="-")),
        (10, dict(linestyle="-")),
        (15, dict(linestyle="-")),
        (20, dict(linestyle=":")),
    ]

    fig, ax = plt.subplots(figsize=(6.0, 4.6))

    for kd, style in cases:
        k, ki = clipped(*stability_boundary(kd))
        ax.plot(k, ki, color="black", linewidth=1.0, **style)

    ax.set_xlim(*K_LIM)
    ax.set_ylim(*KI_LIM)
    ax.set_xticks(np.arange(-1, 11, 1))
    ax.set_yticks(np.arange(0, 45, 5))
    ax.set_xlabel("$k$")
    ax.set_ylabel("$k_i$")
    ax.tick_params(direction="in", top=True, right=True)
    for side in ("top", "right", "bottom", "left"):
        ax.spines[side].set_visible(True)
        ax.spines[side].set_linewidth(0.8)

    fig.tight_layout()
    fig.savefig("fig2_reproduction.png", dpi=200)
    print("wrote fig2_reproduction.png")

    # Reported check values, for comparison against the printed figure.
    for kd, _ in cases:
        k, ki = stability_boundary(kd)
        inside = (ki >= 0) & (k >= K_LIM[0])
        zero = np.where(np.diff(np.sign(ki)) != 0)[0]
        crossing = k[zero[0]] if len(zero) else float("nan")
        print(
            f"kd={kd:2d}  max ki = {ki[inside].max():6.2f}   "
            f"ki=0 crossing at k = {crossing:5.2f}"
        )


if __name__ == "__main__":
    main()
