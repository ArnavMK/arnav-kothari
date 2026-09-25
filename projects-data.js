
window.PROJECTS = [

  // ==========================================================================
  // MATHCRAFT - WEB BASED GRAPHING CALCULATOR
  // ==========================================================================
  {
    id: "Mathcraft",
    title: "Mathcraft",
    category: "Graphing Calculator",
    thumbnail: "assets\\projects\\Mathcraft\\thumb.png",
    hero: "assets\\projects\\Mathcraft\\hero.png",
    overview: [
      "Mathcraft is a web based graphing calculator inspired by the likes of Desmos, GeoGebra and SolidWorks.",
      `It's designed to be a simple and easy to use calculator that can help visualise Leaving Cert mathematics concepts.
      I built this for my own benefit since I needed a simple tool that explains only the exact concepts I need rather than a
      complex tool that has a lot of features I will never use.`,
      "Here are the main features used:",
      "Graphing of functions, equations, conic sections like circles, ellipses, etc.",
      "The ability to edit the equations and functions in real time and see the changes reflected on the graph.",
      "SolidWorks Command System where you can select one of many actions to take on a selected graph.",
      "Commands include: Intersection, Roots, Tangents, Symbolic differentiation, Line Segment, Line of Best fit, Maxima and Minima, mirror along x and y axes and more.",
      "A search bar for searching the commands.",
    ],
    gallery: [
      "assets\\projects\\Mathcraft\\1.png",
      "assets\\projects\\Mathcraft\\2.png",
      "assets\\projects\\Mathcraft\\3.png",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/ArnavMK" }
    ],
    details: [],
    fullGallery: [],
    timeline: []
  },


  // ==========================================================================
  // ASHI - BLUETOOTH POWERED MIDI FOOTSWITCH PEDAL
  // ==========================================================================
  {
    id: "ashi",
    title: "Ashi",
    category: "Bluetooth Powered MIDI Footswitch Pedal",
    thumbnail: "https://placehold.co/800x600/eeeeee/999?text=Ashi",
    hero: "https://placehold.co/1400x700/eeeeee/999?text=Ashi",
    overview: [
      "Replace this with the story of the project."
    ],
    gallery: [],
    links: [],
    details: [],
    fullGallery: [],
    timeline: []
  },


  // ==========================================================================
  // CEOL - TELEMETRY SONIFICATION PAYLOAD
  // ==========================================================================
  {
    id: "ceol",
    title: "Ceol",
    category: "Telemetry Sonification Payload",
    thumbnail: "https://placehold.co/800x600/eeeeee/999?text=Ceol",
    hero: "",
    overview: [
      "Replace this with the story of the project."
    ],
    gallery: [],
    links: [],
    details: [],
    fullGallery: [],
    timeline: []
  },




  // ==========================================================================
  // WAVE FORGE - CUSTOM SOLID STATE GUITAR AMPLIFIER
  // ==========================================================================
  {
    id: "wave-forge",
    title: "Wave Forge",
    category: "Custom Solid State Guitar Amplifier",
    thumbnail: "assets\\projects\\wave-forge\\thumb.png",
    hero: "assets\\projects\\wave-forge\\hero.png",
    overview: [
      `Wave Forge is a custom Solid-State Amplifier made from scratch, including all the hardware and firmware.
      This is a multi-board, feature-dense guitar amplifier. I made this project to combine all the tools and software I
      use to get my guitar tone into one singular device, and also as a first real end-to-end project that will teach me everything about audio hardware and firmware.`,
      "The main features of this project are as follows:",
      "An amp head and a cabinet separation. The audio DSP, convolution transforms, preamp, guitar input, the screen controller, etc., live in the amp head, whereas the cabinet contains the audio power amplifier board that feeds into a 12-inch FX12-F200 speaker.",
      "The whole amp will be powered by an external custom power supply that takes in mains voltage and gives out 5V for DSP and screen controller, 9V for preamp, 24V for the power amplifier.",
      "As for the UI and audio control features:",
      "It will have the ability to change all amp and cab parameters in real time, load different impulse responses, save and load presets that store the tone you created, have a suite of standard effect pedals like delay, overdrive, chorus and reverb, etc.",
      "It will also have the ability to connect to an external foot-switch pedal, where each foot switch can be linked to a saved preset, hence when you press the button, it will instantly change to that saved preset tone. This helps avoid looking and changing the settings directly on the amp when you are performing a known song.",
      "To set the presets to the switches, there will be a section in the UI that will show the 2D mockup of the pedal and you can assign presets that way, so when the MIDI from the pedal arrives with a certain value, it will switch to that assigned preset."
    ],
    gallery : [
      "assets\\projects\\wave-forge\\Timeline\\mae.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\first_order_mess.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\shori_rev_3.jpeg",
    ],
    links: [
      {label: "Github", url: "https://github.com/ArnavMK/WaveForge"}
    ],
    // Deep Dive as a file explorer: folders in the sidebar, each holding a few
    // Markdown files. See the top of projects/deep-dive.js for the format.
    details: {
      folders: [
        {
          name: "Project Overview",
          files: [
            { title: "Introduction", src: "assets\\projects\\wave-forge\\details\\overview\\introduction.md" },
            { title: "Feature Set", src: "assets\\projects\\wave-forge\\details\\overview\\feature-set.md" }
          ]
        },
        {
          name: "Hardware Architecture",
          files: [
            { title: "System Overview", src: "assets\\projects\\wave-forge\\details\\hardware\\system-overview.md" },
            { title: "Power Supply", src: "assets\\projects\\wave-forge\\details\\hardware\\power-supply.md" }
          ]
        },
        {
          name: "Firmware",
          files: [
            { title: "DSP Signal Chain", src: "assets\\projects\\wave-forge\\details\\firmware\\dsp-signal-chain.md" },
            { title: "UI and Presets", src: "assets\\projects\\wave-forge\\details\\firmware\\ui-and-presets.md" }
          ]
        },
        {
          name: "Boards",
          files: [
            { title: "Gen (Power Supply)", src: "assets\\projects\\wave-forge\\details\\boards\\gen-power-supply.md" },
            { title: "Shori (DSP)", src: "assets\\projects\\wave-forge\\details\\boards\\shori-dsp.md" },
            { title: "Mae", src: "assets\\projects\\wave-forge\\details\\boards\\mae.md" }
          ]
        }
      ]
    },
    fullGallery: [
      "assets\\projects\\wave-forge\\thumb.png",
      "assets\\projects\\wave-forge\\hero.png",
      "assets\\projects\\wave-forge\\Timeline\\mae.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\first_order_mess.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\shori_rev_3.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\shori_mae.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\Gen_pcb_1.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\gen_pcb_2.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\gen_close_up_1.jpeg",
      "assets\\projects\\wave-forge\\Timeline\\gen_close_up_2.jpeg"
    ],
    timeline: [
      {
        date: "September 2026",
        title: "Gen Power Supply Assembly and Shori Rev 4 Issues",
        text : [
          "This Monday, 21st of September, I received the boards and components from JLCPCB and DigiKey. This order contained components for Gen Rev 2 and Shori Rev 4. Then the next day on Tuesday I reflowed Gen using my hotplate and solder paste. This was my first time ever assembling a PCB like this with small components.",
          "Unfortunately, for Shori I found some issues with Rev 4. The power circuitry needs to be revisited because I saw that currently it goes straight through the audio codec and then to the STM32. This way whenever the MCU draws spikes of current, it goes through the codec, inducing it with a lot of noise. Hence the idea is to follow a split power routing strategy.",
          "Another issue from Rev 4 is component-related. The NE3552 opamp is a dual-supply IC, where it requires V+ and V-. However, in Shori the V+ is 5V and V- is ground reference of 0V, hence the opamp will operate on the new VBIAS = 2.3V. This is way below operational voltages. The thing won't even power on. Hence I then found a direct replacement single-supply opamp, the OPA1692ID.",
          "Coming back to Gen assembly. For my first time soldering using the hotplate, it was a really good pass, although it seems like the board was not completely flush with the hotplate, causing the solder to melt at different rates. After finishing a reflow session I looked through the board and found a potential short, a resistor completely flipped from its original position, some other passives misaligned, but the buck converter IC both look fine."
        ],
        images: [
          { src: "assets\\projects\\wave-forge\\Timeline\\Gen_pcb_1.jpeg", title: "Gen Rev 2 assembled" },
          { src: "assets\\projects\\wave-forge\\Timeline\\gen_pcb_2.jpeg", title: "Gen Rev 2 with the Mean Well IRM-90-24 mains module" },
          { src: "assets\\projects\\wave-forge\\Timeline\\gen_close_up_2.jpeg", title: "Buck converter section close-up" }
        ]
      },

      {
        date: "December 2025",
        title: "Start of my greatest creation! Project feature set and architecture.",
        text: [
          "This is the start of the timeline for Wave Forge: a custom solid-state guitar amplifier. I recently started working on the ground station for my university's rocketry team, where I created my first ever PCB. I really enjoyed that, so I thought to start a personal project that would include this and teach me more about hardware and embedded firmware.",
          "I have been playing the electric guitar for over 10 years now. At this point it's a part of my identity. I usually get my tones through software called Neural DSP and their plugins that they sell for Windows PC. In order to use that, I need to plug my laptop into an audio interface and then to my guitar and then the output of that interface to a speaker or headphone. It's a lot of hassle and really difficult to set up at live performances to get those tones. So I thought, why not make my own amplifier that will combine all of those things into one.",
          "To create a project feature set and some sort of architecture, I took inspiration from the big companies like Neural DSP Quad Cortex and Kemper. I had to go the DSP route since I need firmware experience. They use extremely high-specced Analog Devices SHARC chips, 4 of them in parallel, to perform extremely high-quality neural models to model how an actual JFET behaves to a player's guitar technique.",
          "I obviously can't do that. So I decided to go with the DIY embedded route using an STM32 with an FPU and DMA abilities. I have seen many DIY amp builds that do this and get a good tone out of simple convolution maths and effects.",
          "I also wanted a UI for the amps and tones and knobs, etc., to give it more of a modern digital amp look. Hence a screen is needed. I want to go with a more amp head and cabinet traditional look while still having the modern DSP inside but with a speaker built into the cabinet side.",
          "The amp is going to be basically a Quad Cortex from the inside but a traditional amp from the outside with an amp head and cabinet.",
          "As for the architecture so far, I think I might go with a multi-board system to divide responsibilities like we do in software. We will definitely need a board for DSP only, and power supply. They could connect via a cable. To be decided."
        ],
        images: [
          {src: "assets\\projects\\wave-forge\\Timeline\\amp_inspo_2.jpg", title: "Neural DSP Quad Cortex"},
          {src: "assets\\projects\\wave-forge\\Timeline\\amp_inso.jpg", title: "Traditional Amp Head and Cabinet Inspiration"},
          {src: "assets\\projects\\wave-forge\\Timeline\\adi.png", title: "Quad Cortex Internal PCB using the ADI SHARC chips"},
        ]
      }

    ]
  },

  // ==========================================================================
  // GROUND STATION SUITE FOR ALL THINGS ROCKET
  // ==========================================================================
  {
    id: "ground-station",
    title: "HiPRDeck",
    category: "Ground Station Suite for all things rocket.",
    thumbnail: "assets\\projects\\ground-station\\thumb.png",
    hero: "assets\\projects\\ground-station\\hero.png",
    overview: [
      "We've spent the last couple of months building a ground station suite that receives and displays telemetry from HiPR's flight computers: Ogma, Eggtimer, Vega and a lot more to come!",
      "The suite has two parts: Gameboy, a handheld receiver unit, and CyberDeck, the central display station they all connect back to.",
      "The Gameboy is built around an Adafruit KB2040 with a modular cartridge system. A cartridge is a small daughterboard tailored to one flight computer's radio protocol, so the same handheld mainboard can receive from completely different systems just by hot-swapping the cartridge:",
      "Ogma cartridge — SPI-direct to a LoRa module, matching Ogma's own transceiver.",
      "Eggtimer cartridge — a self-contained Eggfinder RX module, UART out.",
      "Vega cartridge — our newest build: a custom PCB around a bare STM32G071 and a Semtech SX1280, with open source telemetry firmware from CATS Vega themselves.",
      "Each Gameboy has its own small screen and battery, and can be used completely standalone in the field for a quick read on a single flight computer.",
      "The CyberDeck is a Raspberry Pi 5 with a touchscreen, running a custom dashboard we built from scratch, fitted into a NANUK case for the looks. Multiple Gameboys connect to the CyberDeck at once via the Toaster, a USB hub and charging distribution board that lets several units plug in simultaneously — each showing up as its own independent tab on screen automatically, all through just one port on the Pi 5.",
      "The whole point of building this modular is that it never has to be \"finished\" — every new requirement just becomes another plug-and-play piece rather than a massive rebuild. For example, we're working on a live video streaming module that will plug into the CyberDeck like any other Gameboy."
    ],
    gallery: [
      "assets\\projects\\ground-station\\gameboy_front.jpeg",
      "assets\\projects\\ground-station\\gameboy_zoomes.jpeg",
      "assets\\projects\\ground-station\\cartridges.jpeg"
    ],
    links: [],
    details: "assets\\projects\\ground-station\\details.md",
    fullGallery: [
      { src: "assets\\projects\\ground-station\\thumb.png", title: "CyberDeck Case (CAD)" },
      { src: "assets\\projects\\ground-station\\hero.png", title: "Toaster CAD Render" },
      { src: "assets\\projects\\ground-station\\cartridges.jpeg", title: "SPI and Eggtimer Cartridges" },
      { src: "assets\\projects\\ground-station\\gameboy_front.jpeg", title: "Gameboy Assembled" },
      { src: "assets\\projects\\ground-station\\gameboy_zoomes.jpeg", title: "Cartridge Close-up (One Piece Design)" },
      { src: "assets\\projects\\ground-station\\toaster_IRL.jpeg", title: "Toaster (3D Printed, Assembled)" },
      { src: "assets\\projects\\ground-station\\CASE_CLOSED.jpg", title: "CyberDeck Case (Closed)" },
      { src: "assets\\projects\\ground-station\\Pop_out.png", title: "Cartridge Pop-out Mechanism (CAD)" },
      { src: "assets\\projects\\ground-station\\Timeline\\vega_boards.jpg", title: "Bare Vega Cartridge boards from JLCPCB" },
      { src: "assets\\projects\\ground-station\\Timeline\\vega_box.jpg", title: "Parts order arriving" },
      { src: "assets\\projects\\ground-station\\Timeline\\vega_solderd.jpg", title: "STM32G071 + SX1280 hand-soldered" },
      { src: "assets\\projects\\ground-station\\Timeline\\vega_kicad_pcb.png", title: "Vega KiCad PCB" },
      { src: "assets\\projects\\ground-station\\Timeline\\pi5.jpg", title: "Raspberry Pi 5" },
      { src: "assets\\projects\\ground-station\\Timeline\\anotherui.jpg", title: "UI Design" },
      { src: "assets\\projects\\ground-station\\Timeline\\Eggtimer_adapter_pcb.png", title: "Eggtimer Cartridge" },
      { src: "assets\\projects\\ground-station\\Timeline\\SPI_adapter_pcb.png", title: "SPI Cartridge" },
      { src: "assets\\projects\\ground-station\\Timeline\\gameboy_rev1.png", title: "Gameboy Rev 1 CAD" },
      { src: "assets\\projects\\ground-station\\Timeline\\gameboy_ccad.png", title: "Gameboy Rev 2 CAD" },
      { src: "assets\\projects\\ground-station\\Timeline\\gameboy_pcb.png", title: "Gameboy Rev 2 PCB" }
    ],
    timeline: [
      {
        date: "September 2026",
        title: "Acquired Radio Module And Completed The Vega Cartridge Hardware Section",
        text: [
          "Early September I got the Vega cartridge boards from JLCPCB delivered to my door, and components a few days later. Unfortunately the radio module was misplaced by DigiKey. But nonetheless I soldered the Vega board with remaining components and got the STM32 flashable.",
          "14 September I acquired the Semtech SX1280 radio module and completed the hardware section of the Vega Cartridge. The Vega Cartridge is a custom PCB that has an STM32G071 and the SX1280 radio module. The Vega Cartridge is designed to receive telemetry from the CATS Vega flight computer.",
          "Having completed the hardware assembly, next step was to start debugging it. I have found that the UART lines were not switched. Other checks include seeing the voltage on the UART TX line to be 3.3V, radio is getting power, Busy pin is held low indicating that the radio is configured.",
          "All of these checks are yet to be completed."
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\vega_boards.jpg", title: "Bare Vega Cartridge boards from JLCPCB" },
          { src: "assets\\projects\\ground-station\\Timeline\\vega_box.jpg", title: "Parts order arriving" },
          { src: "assets\\projects\\ground-station\\Timeline\\vega_solderd.jpg", title: "STM32G071 + SX1280 hand-soldered" }
        ]
      },

      {
        date: "August 2026",
        title: "Vega Design and CyberDeck Firmware And Hardware Assembly",
        text: [
          "For the upcoming two-stage rocket we needed to get this ground station finished and working. The two-stage uses two CATS-VEGA flight computers, hence I decided to make a cartridge for that so that our ground station would be compatible with it.",
          "The Vega Cartridge consists of an STM32G071 MCU and Semtech SX1280 radio module. It's the exact same framework as the actual CATS Vega ground station. Radio talks to the STM through SPI and STM talks to the Pi Pico through UART, just like the Eggtimer cartridge.",
          "Parallel to this I was working on the electronics and firmware setup for the Toaster and the CyberDeck. I booted up Raspberry Pi 5 into a Bookworm OS and made the application for the UI for the screen. Most of the development was done through PuTTY and remote SSH since I did not have the screen or the cable.",
          "I was able to start a local server on the Pi and access it through my laptop, hence finishing the user interface. Then I set up the port system for the Gameboy which generated a fake data source to test the chain without needing an actual flight computer or a Gameboy connected to the Pi.",
          "Eventually I got the screen and the cable and tested the UI on the screen through the Pi 5. This revealed a problem that the UPS used for powering the Pi 5 is not strong enough. It only does 5V at 3A whereas the Pi 5 needs 5A for full operation. Hence we might need to switch to another UPS to generate enough power or else this will cause issues when there are a lot of peripherals connected."
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\vega_kicad_pcb.png", title: "Vega KiCad PCB" },
          { src: "assets\\projects\\ground-station\\Timeline\\pi5.jpg", title: "Raspberry Pi 5" },
          { src: "assets\\projects\\ground-station\\Timeline\\anotherui.jpg", title: "UI Design" }
        ]
      },

      {
        date: "April 2026",
        title: "Designed and assembled The SPI and Eggtimer Cartridges",
        text: [
          "Since this project is following the inspiration of a Gameboy and its game cartridges, I made two radio cartridges for our ground station. One for SPI that can communicate with our custom flight computer being built by another team, and one for the Eggtimer Flight Computer.",
          "The SPI cartridge is made up of the cartridge connector and a LoRa radio module, specifically the RF-LORA-868-SO. The SPI cartridge will be able to receive telemetry from the custom flight computer through SPI.",
          "The Eggtimer cartridge is made up of the cartridge connector and the Eggfinder RX module that connects by default to their flight computer.",
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\cartridges.jpeg", title: "SPI and Eggtimer Cartridges" },
          { src: "assets\\projects\\ground-station\\Timeline\\Eggtimer_adapter_pcb.png", title: "Eggtimer Cartridge" },
          { src: "assets\\projects\\ground-station\\Timeline\\SPI_adapter_pcb.png", title: "SPI Cartridge" },
        ]
      },

      {
        date: "February 2026",
        title: "Designed Rev 2 Of the Gameboy Main Board",
        text: [
          "Rev 2 of the main board follows the Gameboy architecture more closely, with now a 4-Layer PCB, components moved to back and a dedicated power plane improved the routing quality enormously.",
          "The stack-up is signal / ground / power / signal, so every trace on the top and bottom layers now has a solid, unbroken reference plane directly underneath it instead of sharing a layer with other signal traces the way Rev 1 did. That alone cleaned up a lot of the impedance and crosstalk issues I was fighting before, especially around the SX1280's RF lines.",
          "The other big addition is a power ORing circuit. Each Gameboy needs to run happily off either its own battery or USB power from the Toaster when it's docked to the CyberDeck, and switch between the two without a glitch or backfeeding one source into the other. Rev 2 ORs the battery and USB rails together with a pair of Schottky diodes into a single system rail, so whichever source has the higher voltage wins automatically — plug it into the Toaster and it runs (and charges) off USB, unplug it and it falls back to the battery with no interruption.",
          "This version of the Gameboy was the only one "
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\gameboy_front.jpeg", title: "Gameboy Assembled" },
          { src: "assets\\projects\\ground-station\\Timeline\\gameboy_ccad.png", title: "Gameboy Rev 2 CAD" },
          { src: "assets\\projects\\ground-station\\Timeline\\gameboy_pcb.png", title: "Gameboy Rev 2 PCB" }
        ]
      },

      {
        date: "December 2025",
        title: "Designed Rev 1 Of the Gameboy Main Board",
        text: [
          "This is the first timeline entry of this project. I joined the ground station team for my university's rocketry society. The main foundation of a plan is made by the team lead. Her plan is to have a bigger ground station where smaller independent ground stations can connect to. The project is called HiPRDeck.",
          "I am currently tasked with making those independent ground stations. My idea for this was to have a modular system where we could hot-swap different types of radio modules. This is helpful because we do many launches using different types of flight computers like the Vega, Missileworks and even our own custom flight computer, all of them use different radios. This way we can easily change radio modules without having to redesign the whole ground station.",
          "Hence I came up with the Gameboy. We would follow a Gameboy architecture. We will have a main board and a daughter board. The daughter board will be hot-swappable radio cartridges, connected to the main board which will have the main MCU, screen, charger board etc.",
          "The main board is a small RP2040 chip (KB2040) with a little screen, some buttons, a battery, and a USB-C port. It has a connector where different cartridges plug in.",
          "The cartridge is a tiny swappable board built for one specific radio. For now we need the radio cartridges for just Ogma (custom FC) and Eggtimer. Future needs will demand different types of cartridges, probably ones with their own custom software and IC."
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\gameboy_rev1.png", title: "Gameboy Rev 1 CAD" },
        ]
      }
    ]
  }
];
