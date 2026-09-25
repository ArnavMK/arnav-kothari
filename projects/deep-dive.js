/**
 * "Deep Dive" page — the detailed architecture / how-it-works write-up.
 * Reads ?id= from the URL, finds the matching entry in window.PROJECTS
 * (../projects-data.js), and renders its `details` field.
 *
 * You never edit this file to add content — edit projects-data.js (or the
 * external .md files it points to).
 *
 * `details` can be written three ways:
 *
 *   1. A PATH to one Markdown file:
 *        details: "assets/projects/my-project/details.md"
 *      The whole file is fetched and rendered as Markdown — # headings,
 *      images (![alt](path), root-relative like everywhere else), links...
 *
 *   2. An inline LIST, for something short, where each item is either:
 *        - a plain string      -> rendered as Markdown
 *        - { heading, text }   -> a sub-section with its own heading
 *        - { heading, text, images } -> same, plus a small media grid
 *
 *   3. FOLDERS of Markdown files, for a big project with lots to say —
 *      shown as a file explorer: a sidebar of collapsible folders, click a
 *      file name to open it in the pane on the right.
 *        details: {
 *          folders: [
 *            { name: "Hardware", files: [
 *                { title: "Power Supply", src: "assets/.../hardware/power.md" },
 *                "assets/.../hardware/block-diagram.md"   // title = file name
 *            ] },
 *            { name: "Firmware", files: [ ... ] }
 *          ]
 *        }
 *      Each file is opened via the URL hash (#hardware/power-supply), so a
 *      specific document can be linked to, and the back button works.
 *
 * MARKDOWN: # / ## / ### headings, - or 1. lists, **bold**, *italic*,
 * `code`, [links](url), > blockquotes, etc. A single line break inside a
 * paragraph also breaks the line. Only applies on the Deep Dive page —
 * overview and timeline text stay plain.
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

/* Fetch a .md file and return it rendered (image paths fixed). Cached so
   flicking back and forth between documents doesn't re-download. */
const mdCache = new Map();
async function fetchMarkdownHtml(path) {
  if (mdCache.has(path)) return mdCache.get(path);
  const url = asset(path);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load ${url} (${res.status})`);
  const html = fixMarkdownImagePaths(renderMarkdown(await res.text()));
  mdCache.set(path, html);
  return html;
}

const loadFailedHtml = (err) =>
  `<p>Couldn't load this write-up (${escapeHtml(err.message)}). If you're opening this file straight off disk, run a local server instead.</p>`;

/* ===== Folder / file explorer ===== */

const slugify = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "untitled";

/* "assets/x/power_supply.md" -> "Power supply" */
const titleFromPath = (path) => {
  const base = String(path).replace(/\\/g, "/").split("/").pop().replace(/\.[^.]+$/, "");
  const words = base.replace(/[-_]+/g, " ").trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
};

/* Turn the authored details.folders into a clean structure with unique
   URL-safe slugs (used for the #hash) for every folder and file. */
function normalizeFolders(details) {
  const used = new Set();
  const unique = (base, scope) => {
    let slug = base;
    let n = 2;
    while (used.has(scope + "/" + slug)) slug = `${base}-${n++}`;
    used.add(scope + "/" + slug);
    return slug;
  };
  return details.folders
    .filter((f) => f.files && f.files.length)
    .map((f) => {
      const slug = unique(slugify(f.name), "");
      return {
        name: f.name,
        slug,
        files: f.files.map((file) => {
          const src = typeof file === "string" ? file : file.src;
          const title = (typeof file === "object" && file.title) || titleFromPath(src);
          return { title, src, slug: unique(slugify(title), slug) };
        })
      };
    });
}

const EXPLORER_ICONS = {
  chevron: `<svg class="explorer-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>`
};

function mountExplorer(container, project, folders) {
  container.innerHTML = `
    <div class="explorer">
      <aside class="explorer-nav" aria-label="Deep dive documents">
        <div class="explorer-label">Explorer</div>
        ${folders
          .map(
            (f) => `
          <div class="explorer-folder" data-folder="${f.slug}">
            <button type="button" class="explorer-folder-btn" aria-expanded="false">
              ${EXPLORER_ICONS.chevron}${EXPLORER_ICONS.folder}
              <span class="explorer-folder-name">${escapeHtml(f.name)}</span>
              <span class="explorer-count">${f.files.length}</span>
            </button>
            <ul class="explorer-files">
              ${f.files
                .map(
                  (file) => `
                <li><a class="explorer-file" href="#${f.slug}/${file.slug}" data-key="${f.slug}/${file.slug}">
                  ${EXPLORER_ICONS.file}<span>${escapeHtml(file.title)}</span>
                </a></li>`
                )
                .join("")}
            </ul>
          </div>`
          )
          .join("")}
      </aside>
      <section class="explorer-content" id="explorer-content">
        <div class="explorer-crumbs" id="explorer-crumbs"></div>
        <div class="project-body deep-dive-body" id="explorer-body"></div>
      </section>
    </div>`;

  const crumbs = container.querySelector("#explorer-crumbs");
  const body = container.querySelector("#explorer-body");
  const content = container.querySelector("#explorer-content");

  const entries = new Map();
  folders.forEach((f) => f.files.forEach((file) => entries.set(`${f.slug}/${file.slug}`, { folder: f, file })));
  const firstKey = `${folders[0].slug}/${folders[0].files[0].slug}`;

  const setOpen = (folderEl, open) => {
    folderEl.classList.toggle("open", open);
    folderEl.querySelector(".explorer-folder-btn").setAttribute("aria-expanded", String(open));
  };

  container.querySelectorAll(".explorer-folder-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const folderEl = btn.closest(".explorer-folder");
      setOpen(folderEl, !folderEl.classList.contains("open"));
    });
  });

  let token = 0; // ignore a slow response if the user has already clicked elsewhere
  async function select(key, { scroll }) {
    const entry = entries.get(key) || entries.get(firstKey);
    const activeKey = entries.has(key) ? key : firstKey;
    const myToken = ++token;

    container.querySelectorAll(".explorer-file").forEach((a) => {
      const on = a.dataset.key === activeKey;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    setOpen(container.querySelector(`.explorer-folder[data-folder="${entry.folder.slug}"]`), true);

    crumbs.innerHTML = `${escapeHtml(entry.folder.name)} <span>/</span> ${escapeHtml(entry.file.title)}`;
    document.title = `${entry.file.title} · ${project.title} Deep Dive - Arnav Kothari`;
    body.classList.add("loading");

    let html;
    try {
      html = await fetchMarkdownHtml(entry.file.src);
    } catch (err) {
      html = loadFailedHtml(err);
    }
    if (myToken !== token) return;

    body.classList.remove("loading");
    body.innerHTML = html;
    wireVideoHoverControls(body);

    // Opening a document from further down the page shouldn't leave you
    // staring at the middle of it — jump back to the top of the pane.
    if (scroll && content.getBoundingClientRect().top < 0) {
      content.scrollIntoView({ block: "start" });
    }
  }

  const keyFromHash = () => {
    try {
      return decodeURIComponent(location.hash.slice(1));
    } catch (e) {
      return "";
    }
  };

  window.addEventListener("hashchange", () => select(keyFromHash(), { scroll: true }));
  return select(keyFromHash(), { scroll: false });
}

/* ===== Page ===== */

async function init() {
  const mount = document.getElementById("project-content");
  const project = findProjectOrShowError(mount);
  if (!project) return;

  const backLink = document.getElementById("back-link");
  if (backLink) backLink.href = `project.html?id=${encodeURIComponent(project.id)}`;

  if (!hasDetailsContent(project.details)) {
    mount.innerHTML = `
      <h1 class="project-title">${escapeHtml(project.title)}</h1>
      <p class="project-body">There's no deep dive written up for this project yet.</p>
    `;
    return;
  }

  document.title = `${project.title} Deep Dive - Arnav Kothari`;
  const header = `
    <h1 class="project-title">${escapeHtml(project.title)}</h1>
    <p class="project-category-badge">Deep Dive</p>`;

  const details = project.details;
  const isExplorer = !Array.isArray(details) && typeof details === "object";

  if (isExplorer) {
    mount.innerHTML = `${header}<div id="explorer-mount"></div>`;
    await mountExplorer(document.getElementById("explorer-mount"), project, normalizeFolders(details));
    return;
  }

  mount.innerHTML = `${header}<div class="project-body deep-dive-body" id="deep-dive-body"></div>`;
  const body = document.getElementById("deep-dive-body");
  try {
    body.innerHTML =
      typeof details === "string"
        ? await fetchMarkdownHtml(details)
        : fixMarkdownImagePaths(renderDetailsList(details));
    wireVideoHoverControls(mount);
  } catch (err) {
    body.innerHTML = loadFailedHtml(err);
  }
}

document.addEventListener("DOMContentLoaded", init);
