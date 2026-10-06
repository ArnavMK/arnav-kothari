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

// Raw <img>/<audio>/<source> src="..." embedded directly in authored HTML
// (overview/timeline text, or a Markdown file's own raw HTML) is written
// root-relative like every other asset path on the site, but the browser
// would otherwise resolve it against the current page's own folder — run it
// through the same asset() helper as everything else. Shared by toParagraphs
// below and by deep-dive.js's Markdown rendering.
const fixAssetSrcs = (html) => {
  if (!/<(img|audio|source)\b/i.test(html)) return html;
  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  wrap.querySelectorAll("img[src], audio[src], source[src]").forEach((el) => {
    let src = el.getAttribute("src");
    try {
      src = decodeURIComponent(src);
    } catch (e) {}
    el.setAttribute("src", asset(src));
  });
  return wrap.innerHTML;
};

// Overview/timeline text is authored by us in projects-data.js, not user
// input, so it's passed through as-is instead of escaped — write plain
// sentences, or drop in <strong>, <em>, <ul><li>...</li></ul>, or even
// <audio controls src="assets/.../sample.mp3"></audio> for formatting.
// A paragraph that's already a block element (list, heading...) is left
// bare instead of getting wrapped in a <p>, which isn't valid HTML around a
// <ul>.
const BLOCK_TAG_RE = /^\s*<(ul|ol|h[1-6]|blockquote|pre|table|div)[\s>]/i;
const toParagraphs = (value) => {
  const list = Array.isArray(value) ? value : value ? [value] : [];
  const html = list
    .filter((p) => String(p).trim() !== "")
    .map((p) => (BLOCK_TAG_RE.test(String(p)) ? String(p) : `<p>${p}</p>`))
    .join("");
  return fixAssetSrcs(html);
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

const AUDIO_PLAY_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
const AUDIO_PAUSE_ICON = `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>`;

const formatAudioTime = (s) => {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${sec}`;
};

/* Replace every <audio src="..."> embedded in authored content (overview/
   timeline text, Markdown) with a small custom play/seek bar — native
   browser audio controls are bulky and can't be restyled to match the
   site. Idempotent (skips ones already wired), so it's safe to call again
   after swapping in new content (e.g. switching Deep Dive documents). */
function wireAudioPlayers(root) {
  root.querySelectorAll("audio").forEach((audio) => {
    if (audio.dataset.wired) return;
    audio.dataset.wired = "1";
    audio.removeAttribute("controls");
    audio.preload = "metadata";
    audio.style.display = "none";

    const bar = document.createElement("div");
    bar.className = "audio-player";

    const playBtn = document.createElement("button");
    playBtn.type = "button";
    playBtn.className = "audio-player-btn";
    playBtn.setAttribute("aria-label", "Play");
    playBtn.innerHTML = AUDIO_PLAY_ICON;

    const seek = document.createElement("input");
    seek.type = "range";
    seek.className = "audio-player-seek";
    seek.min = "0";
    seek.max = "1000";
    seek.value = "0";
    seek.setAttribute("aria-label", "Seek");

    const time = document.createElement("span");
    time.className = "audio-player-time";
    time.textContent = "0:00";

    bar.append(playBtn, seek, time);
    audio.after(bar);

    let seeking = false;

    playBtn.addEventListener("click", () => {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
    });

    audio.addEventListener("play", () => {
      playBtn.innerHTML = AUDIO_PAUSE_ICON;
      playBtn.setAttribute("aria-label", "Pause");
    });
    audio.addEventListener("pause", () => {
      playBtn.innerHTML = AUDIO_PLAY_ICON;
      playBtn.setAttribute("aria-label", "Play");
    });
    audio.addEventListener("ended", () => {
      playBtn.innerHTML = AUDIO_PLAY_ICON;
      playBtn.setAttribute("aria-label", "Play");
    });

    audio.addEventListener("timeupdate", () => {
      if (seeking) return;
      time.textContent = formatAudioTime(audio.currentTime);
      if (audio.duration) seek.value = String((audio.currentTime / audio.duration) * 1000);
    });

    audio.addEventListener("ended", () => {
      time.textContent = formatAudioTime(0);
      seek.value = "0";
    });

    seek.addEventListener("input", () => {
      seeking = true;
      if (audio.duration) time.textContent = formatAudioTime((Number(seek.value) / 1000) * audio.duration);
    });
    seek.addEventListener("change", () => {
      if (audio.duration) audio.currentTime = (Number(seek.value) / 1000) * audio.duration;
      seeking = false;
    });
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
