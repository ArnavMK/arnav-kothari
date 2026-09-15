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
 *
 * CAPTIONS: an image/video entry can also be written as { src, title } to
 * give it a little caption — e.g. images: [ { src: "...", title: "Vega board
 * front" }, "assets/plain/still/works.jpg" ]. Plain strings still work,
 * mixed with captioned ones. Right now captions only render in the timeline.
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

// A media item is either a plain path string, or { src, title } to also
// show a little caption under it (currently only rendered in the timeline,
// and only for images — videos don't get one).
const mediaSrc = (item) => (typeof item === "string" ? item : item.src);
const mediaTitle = (item) => (typeof item === "object" && item.title) || null;

const mediaFrame = (item, { showCaption = false } = {}) => {
  const src = mediaSrc(item);
  const url = asset(src);
  const title = mediaTitle(item);

  if (isVideo(src)) {
    return `
      <figure class="media-frame video-frame">
        <video src="${url}" autoplay muted loop playsinline preload="metadata"
               disablepictureinpicture controlslist="nodownload noplaybackrate"></video>
      </figure>`;
  }

  const caption = showCaption && title ? `<figcaption class="media-caption">${escapeHtml(title)}</figcaption>` : "";
  return `
    <figure class="media-frame img-frame">
      <a href="${url}" target="_blank" rel="noopener noreferrer">
        <img src="${url}" alt="${title ? escapeHtml(title) : ""}" loading="lazy">
      </a>
      ${caption}
    </figure>`;
};

const mediaGrid = (items, className, opts) => {
  if (!items || !items.length) return "";
  return `<div class="${className}">${items.map((item) => mediaFrame(item, opts)).join("")}</div>`;
};

/* Timeline images pack into 2 columns by default (see project.css). A
   clearly landscape photo looks cramped squeezed into one column, so once
   we know its real dimensions we let it span the full width instead. */
function wireAdaptiveTimelineImages(root) {
  root.querySelectorAll(".timeline-images .img-frame").forEach((frame) => {
    const img = frame.querySelector("img");
    if (!img) return;
    const markIfWide = () => {
      if (img.naturalWidth && img.naturalHeight && img.naturalWidth / img.naturalHeight > 1.2) {
        frame.classList.add("wide");
      }
    };
    if (img.complete) markIfWide();
    else img.addEventListener("load", markIfWide);
  });
}

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
        <span class="timeline-dot"></span>
        <div class="timeline-text">
          ${entry.date ? `<div class="timeline-date">${escapeHtml(entry.date)}</div>` : ""}
          ${entry.title ? `<h3>${escapeHtml(entry.title)}</h3>` : ""}
          ${toParagraphs(entry.text)}
        </div>
        <div class="timeline-media">
          ${mediaGrid(entry.images, "timeline-images", { showCaption: true })}
        </div>
      </div>`
    )
    .join("");

  return `
    <button class="timeline-toggle" id="timeline-toggle" aria-expanded="false">
      View Timeline <span class="chevron">&darr;</span>
    </button>
    <section class="timeline" id="timeline" hidden>
      <div class="timeline-header">
        <h2 class="timeline-heading">Timeline</h2>
        <button class="timeline-sort" id="timeline-sort" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v14M8 17 4 13M8 17l4-4M16 21V7M16 7l4 4M16 7l-4 4"/></svg>
          <span id="timeline-sort-label">Newest first</span>
        </button>
      </div>
      <div class="timeline-entries">
        ${entries}
      </div>
    </section>
  `;
}

/* Long timelines (a project spanning months) get hard to browse — let the
   viewer flip the order instead of scrolling past everything. Dates are
   free-text (not parsed), so this just reverses however the entries were
   authored in projects-data.js. Reordering the existing DOM nodes (rather
   than re-rendering) keeps any playing videos from restarting. */
function wireTimelineSort(timelineSection) {
  const btn = timelineSection.querySelector("#timeline-sort");
  const label = timelineSection.querySelector("#timeline-sort-label");
  const list = timelineSection.querySelector(".timeline-entries");
  if (!btn || !label || !list) return;

  let reversed = false;
  btn.addEventListener("click", () => {
    const entries = Array.from(list.querySelectorAll(":scope > .timeline-entry"));
    entries.reverse().forEach((el) => list.appendChild(el));
    reversed = !reversed;
    label.textContent = reversed ? "Oldest first" : "Newest first";
  });
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
  wireAdaptiveTimelineImages(mount);

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
  if (timeline) {
    wireTimelineSort(timeline);
  }
}

document.addEventListener("DOMContentLoaded", init);
