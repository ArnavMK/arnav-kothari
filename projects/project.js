/**
 * Generic project detail page.
 * Reads ?id= from the URL, finds the matching entry in window.PROJECTS
 * (../projects-data.js), and renders the overview, gallery and timeline.
 *
 * You never edit this file to add content — edit projects-data.js.
 * Shared media helpers (asset paths, image/video rendering, captions) live
 * in common.js, loaded before this file.
 */

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
    <section class="timeline" id="timeline">
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

/* Timeline starts open (it's the interesting part), but the button still
   toggles it shut and its label/chevron track the current state. */
function wireTimelineToggle() {
  const toggle = document.getElementById("timeline-toggle");
  const toggleLabel = document.getElementById("timeline-toggle-label");
  const timeline = document.getElementById("timeline");
  if (!toggle || !timeline) return;

  toggle.addEventListener("click", () => {
    const open = !timeline.hasAttribute("hidden");
    if (open) {
      timeline.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
      toggle.classList.remove("open");
      toggleLabel.textContent = "View Timeline";
    } else {
      timeline.removeAttribute("hidden");
      toggle.setAttribute("aria-expanded", "true");
      toggle.classList.add("open");
      toggleLabel.textContent = "Hide Timeline";
      timeline.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  wireTimelineSort(timeline);
}

/* One row of buttons under the overview: external links (GitHub etc.),
   then Deep Dive / Full Gallery (separate pages, so plain links), then the
   timeline toggle. Each only appears when the project has that content. */
function renderProjectActions(project) {
  const links = (project.links || [])
    .map(
      (l) =>
        `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">${escapeHtml(l.label)}</a>`
    )
    .join("");

  const idParam = encodeURIComponent(project.id);
  const deepDive = hasDetailsContent(project.details)
    ? `<a href="deep-dive.html?id=${idParam}" class="btn btn-outline">Deep Dive &rarr;</a>`
    : "";
  const fullGallery =
    project.fullGallery && project.fullGallery.length
      ? `<a href="gallery.html?id=${idParam}" class="btn btn-outline">Full Gallery &rarr;</a>`
      : "";
  const timelineToggle =
    project.timeline && project.timeline.length
      ? `<button class="timeline-toggle open" id="timeline-toggle" type="button" aria-expanded="true">
           <span id="timeline-toggle-label">Hide Timeline</span> <span class="chevron">&darr;</span>
         </button>`
      : "";

  const all = links + deepDive + fullGallery + timelineToggle;
  return all ? `<div class="project-actions">${all}</div>` : "";
}

function renderProject(project) {
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

    ${renderProjectActions(project)}

    ${renderTimeline(project.timeline)}
  `;
}

function init() {
  const mount = document.getElementById("project-content");
  const project = findProjectOrShowError(mount);
  if (!project) return;

  document.title = `${project.title} - Arnav Kothari`;
  mount.innerHTML = renderProject(project);

  wireVideoHoverControls(mount);
  wireAdaptiveTimelineImages(mount);
  wireTimelineToggle();
}

document.addEventListener("DOMContentLoaded", init);
