/**
 * Generic project detail page.
 * Reads ?id= from the URL, finds the matching entry in window.PROJECTS
 * (../projects-data.js), and renders the overview, gallery and timeline.
 *
 * You never edit this file to add content — edit projects-data.js.
 *
 * MEDIA: any path in `gallery` or a timeline entry's `images` can be an image
 * (.png/.jpg/.webp/.gif/.svg) OR a video (.mp4/.webm/.ogg/.mov/.m4v).
 * Videos autoplay muted on a loop with no controls; the controls appear only
 * while the pointer is over them.
 */

// Asset paths in projects-data.js are written relative to the site root.
// This page lives in /projects/, so prefix them with "../".
// Windows-style backslashes are normalised to forward slashes so paths pasted
// from a file explorer just work.
const ROOT = "../";
const asset = (path) => {
  const clean = String(path).replace(/\\/g, "/");
  return /^https?:\/\//.test(clean) ? clean : ROOT + clean.replace(/^\/+/, "");
};

const VIDEO_RE = /\.(mp4|webm|ogg|mov|m4v)(\?.*)?$/i;
const isVideo = (src) => VIDEO_RE.test(String(src));

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

const toParagraphs = (value) => {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  return list
    .filter((p) => String(p).trim() !== "")
    .map((p) => `<p>${escapeHtml(p)}</p>`)
    .join("");
};

const mediaFrame = (src) => {
  const url = asset(src);
  if (isVideo(src)) {
    return `
      <div class="media-frame video-frame">
        <video src="${url}" autoplay muted loop playsinline preload="metadata"
               disablepictureinpicture controlslist="nodownload noplaybackrate"></video>
      </div>`;
  }
  return `
    <a href="${url}" target="_blank" rel="noopener noreferrer" class="media-frame img-frame">
      <img src="${url}" alt="" loading="lazy">
    </a>`;
};

const mediaGrid = (items, className) => {
  if (!items || !items.length) return "";
  return `<div class="${className}">${items.map(mediaFrame).join("")}</div>`;
};

/* Show a video's native controls only while the pointer is over it. */
function wireVideoHoverControls(root) {
  root.querySelectorAll(".video-frame").forEach((frame) => {
    const video = frame.querySelector("video");
    if (!video) return;
    frame.addEventListener("mouseenter", () => video.setAttribute("controls", ""));
    frame.addEventListener("mouseleave", () => video.removeAttribute("controls"));
    // Autoplay can be rejected until the page has been interacted with; retry.
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
  });
}

function renderTimeline(timeline) {
  if (!timeline || !timeline.length) return "";

  const entries = timeline
    .map(
      (entry) => `
      <div class="timeline-entry">
        <div class="timeline-text">
          ${entry.date ? `<div class="timeline-date">${escapeHtml(entry.date)}</div>` : ""}
          ${entry.title ? `<h3>${escapeHtml(entry.title)}</h3>` : ""}
          ${toParagraphs(entry.text)}
        </div>
        <div class="timeline-media">
          ${mediaGrid(entry.images, "timeline-images")}
        </div>
      </div>`
    )
    .join("");

  return `
    <button class="timeline-toggle" id="timeline-toggle" aria-expanded="false">
      View Timeline <span class="chevron">&darr;</span>
    </button>
    <section class="timeline" id="timeline" hidden>
      <h2 class="timeline-heading">Timeline</h2>
      ${entries}
    </section>
  `;
}

function renderProject(project) {
  const links = (project.links || [])
    .map(
      (l) =>
        `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">${escapeHtml(l.label)}</a>`
    )
    .join("");

  const hasOverview =
    project.overview &&
    (Array.isArray(project.overview) ? project.overview.length : project.overview);

  return `
    <h1 class="project-title">${escapeHtml(project.title)}</h1>
    ${project.category ? `<p class="project-category-badge">${escapeHtml(project.category)}</p>` : ""}

    ${
      project.hero
        ? `<div class="project-hero"><img src="${asset(project.hero)}" alt="${escapeHtml(project.title)}"></div>`
        : ""
    }

    <div class="project-body">
      ${hasOverview ? `<h2>Overview</h2>${toParagraphs(project.overview)}` : ""}
    </div>

    ${mediaGrid(project.gallery, "project-gallery")}

    ${links ? `<div class="project-links">${links}</div>` : ""}

    ${renderTimeline(project.timeline)}
  `;
}

function init() {
  const mount = document.getElementById("project-content");
  const id = new URLSearchParams(location.search).get("id");
  const project = (window.PROJECTS || []).find((p) => p.id === id);

  if (!project) {
    mount.innerHTML = `
      <h1 class="project-title">Project not found</h1>
      <p class="project-body">No project matches this link. <a href="../index.html#projects" class="project-link">Back to projects</a>.</p>
    `;
    return;
  }

  document.title = `${project.title} - Arnav Kothari`;
  mount.innerHTML = renderProject(project);

  wireVideoHoverControls(mount);

  const toggle = document.getElementById("timeline-toggle");
  const timeline = document.getElementById("timeline");
  if (toggle && timeline) {
    toggle.addEventListener("click", () => {
      const open = timeline.hasAttribute("hidden");
      if (open) {
        timeline.removeAttribute("hidden");
        toggle.setAttribute("aria-expanded", "true");
        toggle.classList.add("open");
        timeline.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        timeline.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("open");
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", init);
