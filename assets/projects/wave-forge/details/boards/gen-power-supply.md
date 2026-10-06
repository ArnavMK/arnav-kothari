# Gen: Power Supply

![gen powered](assets\\projects\\wave-forge\\gen_powered.png)
![gen powered](assets\\projects\\wave-forge\\Timeline\\gen_pcb_2.jpeg)
![gen powered](assets\\projects\\wave-forge\\Timeline\\gen_close_up_2.jpeg)

## Board Purpose

This is the power supply unit of the whole amp, it supplies the amp with 24V, 5V and 9V. It is situated outside the amplifier to keep the switching noise of the buck convertors away from the amp entirely. Its exactly like how a laptop charger works but for the amp.

## Board Specifications

| Specs | Value| |
| --- | --- | --- |
| Dimensions | 156mm × 74mm |  |
| Layer Count | 2 |  |
| Stack Up | 2-layer, routing both sides, GND pour on bottom|  |
| Component Count | 45 |  |
| Key ICs | TPS560430YDBVR, TPS543021DRLR |  |
| Power IN | 230V AC / 24V DC |  |
|Power OUt| 23.7V, 5.3V, 9V | |


## High Level Circuit Topology.
This diagram walks you through the entire circuit topology without getting too technical. When reading the next section its advised to reference this image if you want more perspective.

![Gen Topology](assets\\projects\\wave-forge\\gen_topology.png)
---
## Circuit Walk-Through

### Input And Mains Conversion
This is the first block of the power supply. Its purpose is to take in 230V AC, convert it to 24V DC, and hand that off to the rest of the board.

It's made up of very few components, mainly the [IRM-90-24](https://www.digikey.ie/en/products/detail/mean-well-usa-inc/IRM-90-24/11562716), a certified module that handles the mains conversion. I chose not to design this stage myself: in a certified module the isolation barrier and creepage distances are designed and tested by the manufacturer, which is not something I wanted to be responsible for on my first power supply. It also keeps all mains-side copper confined to one small region of the board.

Mains comes in through a **Bulgin PF0001/28 IEC** inlet with an integrated fuse drawer, carrying a T1A 250V slow-blow cartridge. From there, the J1 screw terminal takes Live and Neutral into the IRM module. This is the only part of the board that carries AC across its copper traces, everything past the module is low-voltage DC.

The module's output runs through a Schottky diode, D4, in forward bias with a drop of roughly 0.3V.

The second input source is the J8 barrel jack. It sits on the DC side of the board, after the IRM, so I can test the entire board from a pre-made 24V 3A adapter without touching mains at all. This path runs through its own identical Schottky, D5.

D4 and D5 together form a simple OR-ing circuit. Either source can power the board, and neither can feed backwards into the other if both happen to be connected, though in normal use only one is plugged in at a time.

The cost of the OR-ing is the diode drop: DC_OUT sits slightly below whichever source is feeding it. Measured from the 24V adapter, DC_OUT reads 23.68V, which matches the expected Schottky forward drop. Both buck converters downstream regulate independently, so this has no effect on the output rails.

**Earth bonding.** The J7 screw terminal exists to tie DC ground to the earthed enclosure. It's worth separating two things here: bonding the metal enclosure to mains earth is mandatory and will be done at the chassis, since it's what makes the fuse blow if a live wire ever comes loose onto the case. Whether DC ground should also tie to earth is a separate design question that affects ground loops and noise, and that's the one I'm still deciding. I'll be setting up a meeting with a professor from my university to talk it through. For now I'm assembling as if J7 is unused, with no connection between DC ground and earth.

![Gen Topology](assets\\projects\\wave-forge\\gen_block1.png)

I followed standard mains layout guidelines while routing the ACN and ACL traces. The measured clearance from the ACL pour to the nearest GND pour is **11.5mm**, comfortably above the **8mm minimum** in **IPC-2221**. I added a zone rule around the mains traces on both the top and bottom layers to completely remove any copper and leave bare fiberglass underneath.

![Routing For Mains](assets\\projects\\wave-forge\\gen_block1_pcb.png)
---
### Buck Convertor A: 5.3V @2A

This is one of the three sections where DC_OUT (24V) branches out. This section is a simple buck convertor that converts 24V into 5.3V upto 2A. The main buck convertor IC is [TPS543021DRLR](https://www.digikey.ie/en/products/detail/texas-instruments/tps543021drlr/28738761). All the values that you see in schematic below and also the schematic itself is taken from WEEBENCH power designer from Texas instruments.

DC_OUT after being filtered by 3.3uF C16 enters directly in the IC. The enable pin is always pulled high by default internally, hence its NC. And the output is filtered by two big 47uF caps C18 and C20. 

WEEBENCH gave the value of R9 as 100K ohms for a perfect 5V output. I opted to go 107K to pull the output up to 5.3V. The reason is margin: the CS4272 codec on Shori needs a minimum of 4.75V on its analog supply, and the NE5532 op-amps need 5V. After the ~150mV of drop through cables and connectors across the full amp assembly, a 5.3V rail arrives at Shori around 5.15V, which keeps every analog IC inside spec.

![Routing For Mains](assets\\projects\\wave-forge\\gen_buckA.png)

As for the layout, I followed the datasheet guidelines for the TPS543021DRLR. Making sure the SW trace is as short as possible, GND has enough references nearby, and the bootstrap capacitor C17 forms a small enough loop.

![Routing For Mains](assets\\projects\\wave-forge\\gen_buckA_pcb.png)

---

### Buck Convertor B: 9V @100mA

This is the buck convertor steps down 24V into 9V up to a max 100mA, this only powers Mae (preamp board) and its dead simple as well. All values and schematics taken WEEBENCH Power Designer. The main IC is [TPS560430YDBVR](https://www.digikey.ie/en/products/detail/texas-instruments/TPS560430YDBVR/9477607).

DC_OUT is filtered by a 4.7µF and a 100nF (C15 and C14) before going into the IC. There are two separate voltage dividers on this converter, doing different jobs:

- EN divider (1.37MΩ / 255kΩ) — sets the input undervoltage lockout threshold. The converter stays off until DC_OUT rises above the point this divider defines, which stops it trying to run during power-up while the input is still coming up.
- Feedback divider (178kΩ / 22.1kΩ) — sets the output voltage. With this part's 1.0V reference, 1.0 × (1 + 178/22.1) = 9.05V.

The rest of the schematic is the same shape as the previous buck convertor, with the 68µH inductor L2 and bootstrap capacitor C12. The same layout guidelines were followed as the previous buck convertor..

![Routing For Mains](assets\\projects\\wave-forge\\gen_buckB.png)
---
### Output Connectors

This section as the name suggests is about the output connectors. From the Physical Assembly page, i wanted to use two XLR connectors to carry the voltage out. That’s still the plan but i might change it to only one cable. I needed a way to do that without having to touch the board. Hence i went with screw terminals as the output connectors to the board, i will go with panel mount connectors of my choice and just wire them to the board through these screw terminals.

The current output cable plan is to have

- XLR 3 pin (J3)— This will take only 24V for shoyu (power amplifier) with two GND pins alongside it.
- XLR 4 pin (J2) — This will take 5V and 9V with two GND pins one for each.
- JST XH (J5) — development connector for Shori and Gamen. Lets me power them independently from Gen without assembling the full amp.
- JST PH (J6) — This for development of Mae

Other than the connectors there are output capacitors for each connector (C27, C26, C25, C24, C23) and ESD protective diodes SMBJ6.0A (D7, D8, D11, D10..). These are actually on all the connectors, output or input.

![connectors](assets\\projects\\wave-forge\\gen_connectors.png)

> Note: The 24V is not going through any buck convertor, Basically The DC_OUT rail is formed right after the IRM module / Barrel Jack which have a Schottky diode. Hence there is a drop to 23.7V That goes straight to the XLR3 pin screw terminal.
>
---
## Assembly & Bring Up

This was my first ever board that i assembled with solder paste and hotplate with components as small as 0402 packages. It was incredibly fun.

![gen powered](assets\\projects\\wave-forge\\gen_powered.png)
![gen powered](assets\\projects\\wave-forge\\Timeline\\gen_pcb_2.jpeg)
![gen powered](assets\\projects\\wave-forge\\image.png)

After the first reflow, I saw that some solder paste was taking longer to melt than the rest, particularly under the inductor. It has the biggest pads and connects to a large copper pour, so it pulls heat away from the joint faster than the plate delivers it — that behavior was expected

I saw that some passives were wonky. One was displaced so badly that it turned 90 degrees and got soldered to an adjacent capacitor. That one was R9, the top resistor of Buck A's feedback divider, which is the component that sets the 5.3V output. If it had gone unnoticed, the converter would have seen a broken divider, read the output as too low, and driven the duty cycle to maximum — putting something close to 24V onto the 5V rail and into Shori. I fixed it with a soldering iron and a steady hand, then measured both dividers (107kΩ / 13.7kΩ and 178kΩ / 22.1kΩ) before applying any power

After assembly I powered the board with the DC barrel Jack, and took measurements, right off the bat i saw all three indicator LED lit up.

| Measurements | Expected Value | Real Value |
| --- | --- | --- |
| Rail A | 5.3V | 5.257V |
| Rail B | 9V | 9.1V |
| DC_OUT | 23.7V | 23.68V |
| Main rail before schottky diodes | 24V | 24.1V |

The AC side and the IRM are yet to soldered and tested, that will not be done until i have a proper mains safe enclosure designed in aluminum and CNC’d off of JLCCNC. In the meant time to perfect my design i will be making a lot of 3d printed prototypes and do a mock wire assembly.

And as for the DC side i will be going to a professors Lab to use their oscilloscopes to see how noisy the rails are. Those measurements will be up as soon as i record them.
