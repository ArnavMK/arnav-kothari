# Shori — DSP Board

> **Placeholder.** Add the block diagram and the revision history.

**Shori** carries the **STM32** and the **audio codec**. It's on **Rev 4**, and Rev 4 turned up two problems.

![Shori Rev 3](assets/projects/wave-forge/Timeline/shori_rev_3.jpeg)

## Issue 1 — power routing

Power flows through the audio codec and then on to the STM32, so any current spike from the MCU passes through the codec and injects noise. **Fix:** a split power routing strategy.

## Issue 2 — the wrong op-amp

The op-amp is a **dual-supply** part, needing V+ and V−. On Shori, V+ is 5V and V− is the 0V ground reference, so it would sit on a bias of about **2.3V** — far below what it needs to operate, and it wouldn't power on.

**Fix:** a direct-replacement **single-supply** op-amp, the **OPA1692ID**.

## Revisions

1. Rev 3 — *(photo above)*
2. Rev 4 — issues found on arrival
