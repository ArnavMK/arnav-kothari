# HiPRDeck - Ground Station Suite

---

## Overview

This ground station suite is a complete system to receive transmit and display all the telemetry given through any flight computer. Its made up of three different parts. 

- **Cyberdeck** - This is the main station / computer where all the telemetry is displayed in dashboards and live graphs.
- **Toaster -** A USB-C hub where all (5 max) independent ground stations will connect to the cyberdeck. and it looks like a toaster.
- **Gameboy Ground Station** - This is the only link between the system and the rocket. This is where the radio systems for all different types of flight computers live. These connect to the cyberdeck via the toaster. More on this later.

---

## CyberDeck

This is basically a simple computer made of a Raspberry pi 5, a DSI touchscreen, Bluetooth enabled keyboard all assembled inside a Nanuk 9000 case.

The dashboard program is a simple executable application on the pi5 bookworm OS, it runs on flask as back end and chart.js as front end for the graphs. Its made to be extremely modular, where every new Gameboy that is connected will automatically pop up in the UI when it starts receiving sensible telemetry.

Since this runs using a pi5 the future modular upgrades can be easily done. We can introduce new modules and functionality for every new rocket launch and all will be backwards compatible.

![UI](assets\\projects\\ground-station\\Timeline\\UI.png)
---

## Gameboy

This is a custom board made following the shape and architecture of how a Gameboy works. It has a KB2040 (RP2040 dev board), a LiPo charger board, a TFT screen, a cartridge connector system at the back. In total we have used 2 different protocols, SPI and UART. You can hot swap different radio cartridges and the main board will pick it up. *Note: this functionality is not coded yet.*

- **Ogma cartridge** — SPI-direct to LoRa module. This receives from our custom flight computer Ogma.
- **Egg timer cartridge** — self-contained Egg finder RX module, UART output. simple and direct
- **Vega cartridge** — This was the most complicated one yet. Its made up of its own little STM32G071, a LAMBDA80C SX1280 module to receive from the CATS Vega flight computer. RADIO to STM32 uses SPI and the output to the main board works on UART. its proven working, which is insane. basically rebuilt the VEGA ground station for our on system integration.

There are more to come in the future like the missileworks cartridge, fluctus cartridge and Ogma Rev 2 cartridges. All can be made and used without even touching the main board unless there are some wiring necessities

![Toaster Cad](assets\\projects\\ground-station\\Timeline\\gameboy_pcb.png)
---

## The Toaster

USB hub (CH334F-based) and charging distribution board allowing multiple Gameboys to connect to Cyberdeck through one Pi USB port.

This is the most mechanical part of the project, designed by my team mate and good friend Donnacha. It has a pop out mechanism where you can pop the gameboy out when you wanna disconnect like a toaster. has a perfect mechanical fit for the USB connection embedded inside. Electrical test yet to be completed.

![Toaster Cad](assets\\projects\\ground-station\\Timeline\\Another_Toaster_CAd.png)

---