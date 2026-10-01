# Introduction

## What is Wave Forge?

Wave Forge is a custom **solid-state digital guitar amplifier** built from scratch, hardware *and* firmware. It's a multi-board, feature-dense amp split into an **amp head** and a **cabinet**, inspired by the inner workings of the Quad Cortex and a traditional amp-and-cabinet visual and user experience.

Going a bit technical, so far Wave Forge is a system of seven custom PCBs: a hybrid analog JFET preamp going into a 480MHz STM32H750 for DSP and tone generation, a Class-D power amp for amplification, a 12" FRFR speaker, a touchscreen UI, and a BLE footswitch.

## Why build it?

I have been playing electric guitar for over 10 years. Currently I get most of my tones from Neural DSP software plugins. But to use them I have to plug my laptop into an audio interface, power the interface, plug my guitar into the interface, and then connect the output of all that to a speaker or headphone.

That's a lot of wires to carry around and a lot of setup to do, which is not ideal for a live performance where you want to get stuff ready as fast as you can. So I thought, why not make a system which combines everything into one. Making something like this from scratch would also give me an enormous amount of experience in hardware and firmware for embedded systems.

## Board List

Here is the latest board list and responsibilities.

| **Board** | Responsibilities | **Current Status** |
| --- | --- | --- |
| Mae | First contact to the guitar. The preamp board | Rev 1 designed, breadboarding session incoming. |
| Shori | DSP board. This is where all the main firmware will live that will do the tone generation. | Rev 4 designed. Issues were found and Rev 5 development is under progress. |
| Gen | Power supply | Rev 2 ordered and assembled. DC side proven working, all rails working. Next is to make the enclosure design and start testing the AC side. |
| Shoyu | Power amplifier. To step up the line-level audio given to it by Shori into speaker-level audio. | Rev 1 designed, not reviewed. Board put on hold for now — it's tough. |
| Gamen | UI controller board. | Rev 1 design in progress. |
| Ashi | BLE MIDI footswitch pedal, compatible with anything that accepts MIDI. | Not started. |
| Pots | A dumb pot holder board, also holds Gamen. | Not started. |


## Target for Different Revisions

- **Wave Forge Rev 1** — My target for this is to just prove the main four boards working: Mae, Shori, Gen and Shoyu. These four are the only ones necessary to create sound; the other boards will depend on how well these perform. As for enclosures, I'll be happy if I can make a good dent in the amp head assembly, and decide how the boards will be placed inside it.
- **Wave Forge Rev 2** — Here I'd like to have all boards somewhat working, with the cabinet and amp enclosures ready. The connection between them will be through an external speaker cable and power cables, rather than my original idea.
- **Wave Forge Rev 3** — A fully polished hardware system with all noise sources debugged and fixed, and safe enough to take to real performances outside my room. Hopefully I'll be able to enact my original idea of connecting the amp head and cabinet with friction-fit vertical panel-mount connectors, avoiding the ugly, unnecessary outside cables.
