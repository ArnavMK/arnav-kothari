# DSP Signal Chain

> **Placeholder.** Replace with the real firmware architecture once it's written.

The DSP runs on an **STM32** chosen for its **FPU** and **DMA** — enough to do convolution and effects in real time without the very high-end SHARC-class chips that commercial modellers use.

## Stages

1. **Input** — audio codec samples the guitar signal
2. **Preamp / amp model** — shapes the tone
3. **Effects** — delay, overdrive, chorus, reverb
4. **Cabinet** — convolution against a loaded *impulse response*
5. **Output** — back out through the codec to the power amp

## Things worth documenting

- Buffer size and **latency** budget
- How **DMA** double-buffering keeps audio glitch-free
- Where the convolution runs, and how long the impulse responses can be
- CPU headroom per stage

```c
// Placeholder: show the audio callback here
void audio_callback(int16_t *in, int16_t *out, size_t frames);
```
