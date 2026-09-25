# System Overview

> **Placeholder / draft.** The signal path below is my best guess from the project notes — correct it against the real schematics.

## Two enclosures

The amp is split the traditional way:

- **Amp head** — audio DSP, convolution, preamp, guitar input and the screen controller
- **Cabinet** — the audio power amplifier board, feeding a 12-inch FX12-F200 speaker

## Signal path (draft)

```
Guitar in → Preamp → Audio codec → STM32 (DSP) → Audio codec → Power amp → Speaker
```

## Boards

| Board | Role |
| --- | --- |
| **Gen** | Power supply |
| **Shori** | STM32 + audio codec |
| **Mae** | *(replace with what this board does)* |
| Power amp | Drives the speaker in the cabinet |

## Design decisions to write up

- Why a **multi-board** system — dividing responsibilities the way you would in software
- Why an **STM32 with an FPU and DMA** rather than the SHARC-based DSPs big-name modellers use
