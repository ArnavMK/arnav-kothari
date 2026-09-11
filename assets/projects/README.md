# Project images

One folder per project, named to match the project's `id` in `projects-data.js`.

```
assets/projects/
  eclipse-interactive/
    thumb.jpg      # tile image
    hero.jpg       # big image on the detail page
    01.jpg 02.jpg  # gallery / timeline pictures
```

Reference them from `projects-data.js` using the root-relative path, e.g.
`assets/projects/eclipse-interactive/hero.jpg`.
