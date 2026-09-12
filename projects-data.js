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
    timeline: []
  }
];
