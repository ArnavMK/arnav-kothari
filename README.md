# Arnav Kothari - Personal Portfolio

A simple, aesthetic portfolio built with HTML, CSS, and JavaScript.

## Structure

```
├── index.html          # Main page (intro, about, skills, projects)
├── styles.css          # Global styles
├── script.js           # Project rendering + scroll animations
├── projects/           # Individual project pages
│   ├── project.css     # Project page styles
│   ├── project-template.html  # Copy this for new projects
│   ├── eclipse-interactive.html
│   ├── neon-noir.html
│   └── project-three.html
└── assets/             # Put your project images here (optional)
```

## Adding a New Project

### 1. Add to the projects grid (index page)

Edit `script.js` and add a new object to the `projects` array:

```javascript
{
  name: "Your Project Name",
  category: "UI/UX Design",  // or "Web Development", "Identity Design", etc.
  thumbnail: "assets/your-project-thumb.jpg",  // or full URL
  link: "projects/your-project.html"
}
```

### 2. Create the project page

Copy `projects/project-template.html` to `projects/your-project.html` and fill in the content (title, description, images, links).

## Running Locally

Open `index.html` in a browser, or use a simple server:

```bash
# Python 3
python -m http.server 8000

# Node (npx)
npx serve
```

Then visit http://localhost:8000
