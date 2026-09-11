# Arnav Kothari - Personal Portfolio

A simple, light-themed portfolio built with plain HTML, CSS, and JavaScript.
No build step. Everything is driven by one data file.

## Structure

```
├── index.html          # Home: intro + project tile grid (3 columns)
├── styles.css          # Global styles (light theme)
├── script.js           # Renders the tile grid + intro conveyor
├── projects-data.js    # <-- THE ONLY FILE YOU EDIT TO ADD PROJECTS
├── projects/
│   ├── project.html    # One generic detail page for every project
│   ├── project.js      # Reads ?id= and renders overview / gallery / timeline
│   └── project.css     # Detail + timeline styles
└── assets/
    ├── logos/          # Tool-belt logos on the intro conveyor
    └── projects/       # Put each project's images here (one folder per project)
```

## Adding or updating a project

Open **`projects-data.js`** and edit the `window.PROJECTS` list. That's it —
the home-page tile, the detail page, the picture gallery, and the timeline all
generate from that entry.

1. Copy one whole `{ ... }` block (including the trailing comma).
2. Paste it into the list and change the fields.
3. `id` must be unique and URL-safe (letters, numbers, dashes). It becomes the
   page URL: `projects/project.html?id=your-id`.
4. Image paths are written **relative to the site root**, e.g.
   `assets/projects/your-id/hero.jpg`. Any `https://` URL works too.
5. Drop the images in `assets/projects/your-id/`.

Optional fields (`category`, `hero`, `overview`, `gallery`, `links`, `timeline`)
can be left empty and simply won't render. The field reference is in the comment
at the top of `projects-data.js`.

### Timeline

Each project can have a `timeline` list. On the detail page a **View Timeline**
button reveals it. Every entry is a paragraph (or paragraphs) on the left with
its pictures on the right (they stack on mobile).

## Running locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```
