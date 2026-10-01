# Physical Assembly

This section talks about how all the boards will be assembled with each other in the enclosures I'll make. There are many ideas about this and it's constantly changing, so I'll only explain the Rev 1 version of the hardware assembly.

There are three physical domains:

- **Cabinet** — This will hold the FX12-X200 and Shoyu. The enclosure is going to completely copy the cabinet files shared on the FX12-X200 seller page — following that will make sure we get the best sound out of the speaker.
- **Amp Head** — As the name suggests, this will look like a standard amp head, but with 4 knobs and a big screen in the middle. This enclosure will hold Mae, Shori, Gamen and Pots. The material and design are not yet decided.
- **Gen** — This is just a single board, Gen the power supply, which will stay outside the whole system like a laptop charger.

That's just the physical domains, but there are going to be a lot of cables connecting those three. The following are the main cables (subject to change):

| **Cable** | Connection | Payload |
| --- | --- | --- |
| XLR 4-pin and 3-pin | Connects the power supply to the amp, specifically to the cabinet. | Contains 24V, 5V, 9V |
| Speaker cable | From Shori in the amp head to Shoyu in the cabinet | Carries the finished line-level audio for amplification in Shoyu. |
| Power cable | From cabinet to the amp head | Carries 5V and 9V |
| Inter-board cable 1 | From Shori to Gamen | Parameter communication over UART |
| Inter-board cable 2 | From Mae to Shori | Carries guitar audio after preamp. |
| Inter-board cable 3 | From AUX input to Shori | Carries the AUX audio from phone or external player, for backing tracks and such |

These are the main cables, but I've omitted a lot of the little cables that connect power to the boards, connect the panel-mount connectors like the guitar jack to their respective boards, etc.

My original idea was to have friction-fit panel-mount connectors on the bottom of the amp head and the top of the cabinet, so the amp head would literally sit on top of the cabinet and make an electrical connection through its own body weight. This would clean up the cable assembly tremendously, since you don't have cables flying outside the body.

> **Note —** this was deferred for future versions since it's proving extremely difficult to design a connection system for this — the tolerance for misalignment is extremely low (< ~0.1%) for the HD-26 connectors I was going for.
