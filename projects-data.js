/* =============================================================================
   PROJECTS DATA  —  THIS IS THE ONLY FILE YOU EDIT TO ADD / UPDATE PROJECTS
   =============================================================================

   Everything on the site is generated from the list below:
     - the tile grid on the home page
     - each project's detail page (projects/project.html?id=...)
     - each project's gallery of pictures
     - each project's timeline
     - each project's deep dive page (projects/deep-dive.html?id=...)
     - each project's full gallery page (projects/gallery.html?id=...)

   ---------------------------------------------------------------------------
   HOW TO ADD A NEW PROJECT
   ---------------------------------------------------------------------------
   1. Copy one whole { ... } block below (including the trailing comma).
   2. Paste it into the PROJECTS list.
   3. Change the fields. The only rules:
        - "id" must be unique and URL-safe (letters, numbers, dashes).
        - image paths are written relative to the SITE ROOT, e.g.
            "assets/projects/my-project/hero.jpg"
          (do NOT put "../" in front — the code adds it where needed).
   4. Put your images in:  assets/projects/<your-id>/....
      Any placehold.co URL also works while you don't have a picture yet.
      Windows paths with backslashes ("assets\projects\x\1.png") are fine too.

   Every field except "id", "title" and "thumbnail" is optional — leave a
   list empty ([]) or a string empty ("") and that part just won't render.
   ---------------------------------------------------------------------------

   IMAGES vs VIDEOS
   Anywhere a picture is accepted (gallery, timeline images, details, full
   gallery) you can instead drop in a video file — .mp4 / .webm / .ogg /
   .mov / .m4v. Videos play automatically, muted, on a loop, with no
   controls; the controls only show up while the mouse is hovering over
   them. Mix images and videos freely in the same list.
   ---------------------------------------------------------------------------

   FIELD REFERENCE
     id          string   unique slug, also the ?id= in the URL
     title       string   project name (tile + page heading)
     category    string   small label under the title (e.g. "Web Development")
     thumbnail   string   image shown on the home-page tile
     hero        string   big image at the top of the detail page (optional)
     overview    [string] one string per paragraph of the brief overview
     gallery     [string] more media (images or videos) shown under the overview
     links       [{ label, url }]   buttons like Live Demo / GitHub
     details     string | [ item ]
                            the "Deep Dive" page — architecture, design
                            decisions, how it actually works. Only shown
                            (and the button only appears) if this has
                            content. Supports Markdown (headings, lists,
                            bold/italic, links, images, etc — see
                            projects/deep-dive.js for the full rundown).
                            Two ways to write it:
                              - a STRING path to a .md file, e.g.
                                "assets/projects/my-project/details.md"
                                — recommended once it gets long, keeps big
                                write-ups out of this file entirely.
                              - an inline LIST for something short, where
                                each item is either a plain string (one
                                Markdown block) or { heading, text } for a
                                sub-section with its own heading
     fullGallery [string]  the "Gallery" page — every photo of the project,
                            in no particular order. Only shown (and the
                            button only appears) if this has content.
     timeline    [ entry ] ordered log, newest or oldest first — your call
       entry.date    string        e.g. "Jan 2026" or "2026-01-15"
       entry.title   string        short heading for this step
       entry.text    string | [string]   paragraph(s) describing what you did
       entry.images  [string]      media for this step (images or videos, shown on the right)
   ============================================================================= */

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
      { label: "Live Demo", url: "https://example.com" },
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
    title: "Wave forge",
    category: "Custom Solid State Guitar Amplifier",
    thumbnail: "assets\\projects\\wave-forge\\thumb.png",
    hero: "assets\\projects\\wave-forge\\hero.png",
    overview: [
      `Wave Forge is a custom Solid State Amplifier made from scratch, including all the hardware and firmware.
      This is a multi-board, feature-dense guitar amplifier, I made this project to combine all the tools and software I
      use to get my guitar tone into one singular device.`,
      ""
    ],
    gallery: [
      "https://placehold.co/900x600/eeeeee/999?text=Screenshot+1",
      "https://placehold.co/900x600/eeeeee/999?text=Screenshot+2",
      "https://placehold.co/900x600/eeeeee/999?text=Screenshot+3"
    ],
    links: [
      {label: "Github", url: "https://github.com/ArnavMK/WaveForge"}
    ],
    details: [],
    fullGallery: [],
    timeline: []
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
        date: "January 2026",
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
