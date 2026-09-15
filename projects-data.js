/* =============================================================================
   PROJECTS DATA  —  THIS IS THE ONLY FILE YOU EDIT TO ADD / UPDATE PROJECTS
   =============================================================================

   Everything on the site is generated from the list below:
     - the tile grid on the home page
     - each project's detail page (projects/project.html?id=...)
     - each project's gallery of pictures
     - each project's timeline

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
   Anywhere a picture is accepted (gallery, timeline images) you can instead
   drop in a video file — .mp4 / .webm / .ogg / .mov / .m4v. Videos play
   automatically, muted, on a loop, with no controls; the controls only show
   up while the mouse is hovering over them. Mix images and videos freely in
   the same list.
   ---------------------------------------------------------------------------

   FIELD REFERENCE
     id         string   unique slug, also the ?id= in the URL
     title      string   project name (tile + page heading)
     category   string   small label under the title (e.g. "Web Development")
     thumbnail  string   image shown on the home-page tile
     hero       string   big image at the top of the detail page (optional)
     overview   [string] one string per paragraph of the brief overview
     gallery    [string] more media (images or videos) shown under the overview
     links      [{ label, url }]   buttons like Live Demo / GitHub
     timeline   [ entry ]          ordered log, newest or oldest first — your call
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
      `Its designed to be a simple and easy to use calculator that can help visulise leaving cert mathematics concpets. 
      I built this for my own benefit since i needed a simple tool that explains only the exact concepts i need rather than a 
      complex tool that has a lot of features i will never use.`, 
      "Here are the main fetures used: ",
      "Graphing of functions, equations, conic sections like circles elipses etc..",
      "The ability to edit the equations and functions in real time and see the changes reflected on the graph.",
      "SolidWorks Command System where you can select one of many actions to take on a selected graph.",
      "Commands include: Intersction, Roots, Tangents, Symbolic differentiation, Line Segment, Line of Best fit, Maxima and Minima, mirror along x and y axis and more",
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
      `Wave Forge is a custom Solid State Amplifier made from Scratch! Including all the hardware and firmware. 
      This is a multi board feature dense guitar amplifier, I made this project to combine all the tools and software i 
      use to get my guitar tone into one singular device,`,
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
    timeline: [
      {
        date: "Spetember 2026",
        title: "Aquired Radio Module And Completed The Vega Cartrdige Hardware Section",
        text: [
          "Early September I got the vega cartidge boards from JLCPCB delivered to my door. And components a few days later. Unfortunately teh radio module was misplaced by digikey. But nonethless i soldered the vega board with remaining compoenents and got the stm32 flashable.",
          "14 September I aquired the Semtech SX1280 radio module and completed the hardware section of the Vega Cartrdige. The Vega Cartrdige is a custom PCB that has a STM32G071 and the SX1280 radio module. The Vega Cartrdige is designed to receive telemetry from the CATS Vega flight computer.",
          "Having complelted the hardware assembly next step was to start debugging it. I have found that the UART lines were not switched. Other checks include seeing the voltage on the UART TX line to be 3.3V, radio is getting power, Busy pin is held low indicating that the radio is configured. ",
          "All of these checks are yet to be completed"
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\vega_boards.jpg", title: "Bare Vega Cartridge boards from JLCPCB" },
          { src: "assets\\projects\\ground-station\\Timeline\\vega_box.jpg", title: "Parts order arriving" },
          { src: "assets\\projects\\ground-station\\Timeline\\vega_solderd.jpg", title: "STM32G071 + SX1280 hand-soldered" }
        ]
      },

      {
        date: "August 2026",
        title: "Vega Design and CyberDeck Firmware And Hardware assembly",
        text: [
          "for the upcoming two stage rocket we needed to get this ground station finished and working. The two stage uses two CATS-VEGA flight computers hecne i decided to make a cartidge for that so that our ground station would be compatible with it.",
          "the Vega Cartdige consists of a STM32G071 mcu and semtec SX1280 radio module. Its the exact same framework as the actual cats vega ground station. Radio talks to the stm through SPI and stm talks to the pi pico through UART, just like the egtimer cartdige",
          "Paralel to this i was wokring on the electronics and firmware setup for the toaster and the cyber deck. I booted up rasberry pi5 into a bookworm OS and made the application for the ui for the screen. Most of the development was done through puTTY and remote ssh since i did not have the screen or the cabel",
          "I was abel to start a local server on the pi and access it through my laptop. Hence finishing hte user interface. Then I setup the port system for the gameboy which generated a fake data source to test the chain without needing an actual flight computer or a gameboy connectoed to the pi",
          "Eventually i got the screen and the cable and tested the UI on the screen thorugh the pi5. This revealed a problem that the UPS used for powering the pi5 is not strong enough. It only deos 5V at 3A where as the pi5 needs 5A for full operation. Hence we might need to switch to antoher UPS to generate enough power or else this will cause issues when there are lot of peripherals connected"
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\vega_kicad_pcb.png", title: "Vega Kicad PCB" },
          { src: "assets\\projects\\ground-station\\Timeline\\pi5.jpg", title: "Raspberry Pi 5" },
          { src: "assets\\projects\\ground-station\\Timeline\\anotherui.jpg", title: "UI Design" }
        ]
      },

      {
        date: "April 2026",
        title: "Designed and assembled The SPI and Eggtimer Cartridges",
        text: [
          "Since this project is following the inspiration of a GameBoy and its game cartridges, I made two radio cartridges for our ground station. One for SPI that can comunicate with our custom flight computer being built by another team, and one for the Eggtimer Flight Computer.",
          "The SPI cartdige is made up of the cartidge connector and a LoRa radio module specifically the RF-LORA-868-SO. The SPI cartidge will be able to receive telemetry from the custom flight computer through SPI.",
          "The Eggtimer cartidge is made up of the cartidge connector and the Eggfinder RX module that connects by default to thier flight computer.",
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\cartridges.jpeg", title: "SPI and Eggtimer Cartridges" },
          { src: "assets\\projects\\ground-station\\Timeline\\Eggtimer_adapter_pcb.png", title: "Eggtimer Cartidge" },
          { src: "assets\\projects\\ground-station\\Timeline\\SPI_adapter_pcb.png", title: "SPI Cartidge" },
        ]
      },

      {
        date: "February 2026",
        title: "Designed Rev 2 Of the Gameboy Main board.",
        text: [
          "Rev 2 of the main board follows the GameBoy archetecture more closely, with now a 4 Layer PCB, compoenents moved to back and a dedicated power plane improved the routing quality enormusly",
          ""
        ],
        images: [
          { src: "assets\\projects\\ground-station\\Timeline\\gameboy_rev2_pcb.png", title: "Gameboy Rev 2 PCB" },
          { src: "assets\\projects\\ground-station\\Timeline\\gameboy_rev2_assembled.jpeg", title: "Gameboy Rev 2 Assembled" },
        ]
      }
    ]
  }
];
