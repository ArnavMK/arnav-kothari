/**
 * "Deep Dive" page — the detailed architecture / how-it-works write-up.
 * Reads ?id= from the URL, finds the matching entry in window.PROJECTS
 * (../projects-data.js), and renders its `details` field.
 *
 * You never edit this file to add content — edit projects-data.js (or the
 * external .md file it points to).
 *
 * `details` can be written two ways:
 *
 *   1. A PATH to a Markdown file (recommended once it gets long):
 *        details: "assets/projects/my-project/details.md"
 *      The whole file is fetched and rendered as Markdown, exactly like a
 *      normal write-up — # headings, images (![alt](path), paths resolve
 *      the same root-relative way as everywhere else), links, all of it.
 *      Keeps big write-ups out of projects-data.js entirely, in their own
 *      file, easy to edit and easy to find.
 *
 *   2. An inline LIST, for something short (unchanged from before), where
 *      each item is either:
 *        - a plain string      -> rendered as Markdown
 *        - { heading, text }   -> a sub-section with its own heading; text
 *                                 is a string or array of strings, each Markdown
 *        - { heading, text, images } -> same, plus a small media grid under it
 *
 * MARKDOWN: # / ## / ### headings, - or 1. lists, **bold**, *italic*,
 * `code`, [links](url), > blockquotes, etc. A single line break inside a
 * paragraph also breaks the line (no need for a blank line between every
 * sentence). This only applies here on the Deep Dive page — overview and
 * timeline text stay plain.
 */

if (typeof marked !== "undefined") {
  marked.setOptions({ breaks: true });
}

const renderMarkdown = (value) => {
  const text = Array.isArray(value) ? value.filter((v) => String(v).trim() !== "").join("\n\n") : value || "";
  if (!text) return "";
  return typeof marked !== "undefined" ? marked.parse(text) : toParagraphs(text);
};

/* Markdown image paths are written root-relative like everywhere else on
   the site (e.g. "assets/projects/x/1.jpg"), but the browser would
   otherwise resolve them against this page's own folder. Rewrite every
   rendered <img src> through the same asset() helper used everywhere. */
const fixMarkdownImagePaths = (html) => {
  const wrap = document.createElement("div");
  wrap.innerHTML = html;
  wrap.querySelectorAll("img[src]").forEach((img) => {
    let src = img.getAttribute("src");
    // Markdown treats a lone "\" as an escape character, so a Windows path
    // like "assets\projects\x.png" survives that as-is, but "assets\\projects\\x.png"
    // (backslashes doubled, e.g. pasted straight from a JS string) gets
    // unescaped to single backslashes — then marked percent-encodes those
    // as %5C before we ever see them. Undo that so asset() can normalise
    // the (now real) backslashes into forward slashes as usual.
    try {
      src = decodeURIComponent(src);
    } catch (e) {}
    img.setAttribute("src", asset(src));
  });
  return wrap.innerHTML;
};

function renderDetailsList(details) {
  return details
    .map((item) => {
      if (typeof item === "string") {
        return renderMarkdown(item);
      }
      const heading = item.heading ? `<h2>${escapeHtml(item.heading)}</h2>` : "";
      const body = renderMarkdown(item.text);
      const images = mediaGrid(item.images, "project-gallery");
      return `${heading}${body}${images}`;
    })
    .join("");
}

/* Returns the rendered body HTML for project.details, fetching the .md
   file first if `details` is a path string. */
async function loadDetailsHtml(details) {
  if (typeof details === "string") {
    const url = asset(details);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
    const markdown = await res.text();
    return fixMarkdownImagePaths(renderMarkdown(markdown));
  }
  return fixMarkdownImagePaths(renderDetailsList(details));
}

async function init() {
  const mount = document.getElementById("project-content");
  const project = findProjectOrShowError(mount);
  if (!project) return;

  const backLink = document.getElementById("back-link");
  if (backLink) backLink.href = `project.html?id=${encodeURIComponent(project.id)}`;

  const hasDetails = project.details && project.details.length;
  if (!hasDetails) {
    mount.innerHTML = `
      <h1 class="project-title">${escapeHtml(project.title)}</h1>
      <p class="project-body">There's no deep dive written up for this project yet.</p>
    `;
    return;
  }

  document.title = `${project.title} Deep Dive - Arnav Kothari`;
  mount.innerHTML = `
    <h1 class="project-title">${escapeHtml(project.title)}</h1>
    <p class="project-category-badge">Deep Dive</p>
    <div class="project-body deep-dive-body" id="deep-dive-body"></div>
  `;

  const body = document.getElementById("deep-dive-body");
  try {
    body.innerHTML = await loadDetailsHtml(project.details);
    wireVideoHoverControls(mount);
  } catch (err) {
    body.innerHTML = `<p>Couldn't load this write-up (${escapeHtml(err.message)}). If you're opening this file straight off disk, run a local server instead — see the README.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", init);
