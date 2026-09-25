/**
 * Shared helpers used by project.js, deep-dive.js and gallery.js.
 * Load this before any of those.
 *
 * MEDIA: any path can be an image (.png/.jpg/.webp/.gif/.svg) OR a video
 * (.mp4/.webm/.ogg/.mov/.m4v). Videos autoplay muted on a loop with no
 * controls; the controls appear only while the pointer is over them.
 *
 * CAPTIONS: a media item can also be written as { src, title } to give it a
 * little caption — e.g. [ { src: "...", title: "Vega board front" },
 * "assets/plain/still/works.jpg" ]. Plain strings still work, mixed with
 * captioned ones.
 */

// Asset paths in projects-data.js are written relative to the site root.
// Pages under /projects/ prefix them with "../".
// Windows-style backslashes are normalised to forward slashes so paths
// pasted from a file explorer just work.
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

/* `details` can be a path string (one .md file), an inline list, or a
   { folders: [...] } object (multi-file explorer) — see deep-dive.js. */
const hasDetailsContent = (d) => {
  if (!d) return false;
  if (typeof d === "string") return d.trim() !== "";
  if (Array.isArray(d)) return d.length > 0;
  return Array.isArray(d.folders) && d.folders.some((f) => f.files && f.files.length);
};

/* Look up the project for the current page's ?id=, or render a friendly
   "not found" message into `mount` and return null. */
function findProjectOrShowError(mount) {
  const id = new URLSearchParams(location.search).get("id");
  const project = (window.PROJECTS || []).find((p) => p.id === id);
  if (!project) {
    mount.innerHTML = `
      <h1 class="project-title">Project not found</h1>
      <p class="project-body">No project matches this link. <a href="../index.html#projects" class="project-link">Back to projects</a>.</p>
    `;
    return null;
  }
  return project;
}
