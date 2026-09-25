# Power Supply

> **Placeholder.** Fill in the real rail budget, part choices and test results.

The whole amp runs off one external custom supply — the **Gen** board — which takes in mains voltage and produces every rail the amp needs.

## Rails

- **5V** — DSP and screen controller
- **9V** — preamp
- **24V** — audio power amplifier

The 24V comes from a **Mean Well IRM-90-24** mains module mounted on the board; the lower rails are derived from it.

![Gen Rev 2 with the Mean Well mains module](assets/projects/wave-forge/Timeline/gen_pcb_2.jpeg)

## Split power routing

On the DSP board (Shori), power currently runs *through* the audio codec on its way to the STM32. Whenever the MCU draws current spikes, that noise passes through the codec. The fix is a **split power routing** strategy so the digital and analog supplies don't share a path.

## To write up

1. Current budget per rail
2. Why a mains module instead of a wall adapter
3. Buck converter choice and layout
