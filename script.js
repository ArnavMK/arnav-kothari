/**
 * Portfolio Script (home page)
 * - Renders project tiles from window.PROJECTS (see projects-data.js)
 * - Renders the intro tool-belt conveyor, and makes it draggable
 *
 * To add a project you only edit projects-data.js — never this file.
 */

// ===== TOOL BELT (Intro Conveyor) - Add/remove items here =====
// Put your logo files in: assets/logos/
// Supported: .svg, .png, .webp, .jpg (whatever you add)
const toolbelt = [
  { name: "KiCad", fileBase: "kicad" },
  { name: "Solidworks", fileBase: "solidworks" },
  { name: "C/C++", fileBase: "c-cpp" },
  { name: "Java", fileBase: "java" },
  { name: "Python", fileBase: "python" },
  { name: "Reaper", fileBase: "reaper" },
  { name: "Unity", fileBase: "unity" },
  { name: "C#", fileBase: "csharp" }
];

// Normalise Windows-style backslashes so paths pasted from a file explorer work.
const normalizePath = (path) => String(path || "").replace(/\\/g, "/");

// ===== Render Project Tiles =====
function renderProjects() {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  const projects = window.PROJECTS || [];

  grid.innerHTML = projects
    .map(
      (project) => `
    <a href="projects/project.html?id=${encodeURIComponent(project.id)}" class="project-tile">
      <div class="project-thumb-wrap">
        <img
          src="${normalizePath(project.thumbnail)}"
          alt="${project.title}"
          class="project-thumbnail"
          loading="lazy"
        />
      </div>
      <div class="project-info">
        <div>
          <div class="project-name">${project.title}</div>
          ${project.category ? `<div class="project-category">${project.category}</div>` : ""}
        </div>
        <span class="project-arrow">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </a>
  `
    )
    .join("");
}

function createToolbeltItem({ name, fileBase }) {
  const item = document.createElement("span");
  item.className = "logo-item";

  const iconWrap = document.createElement("span");
  iconWrap.className = "logo-icon-wrap";

  // Try a few common extensions. First one that loads wins.
  const candidates = ["svg", "png", "webp", "jpg", "jpeg"].map(
    (ext) => `assets/logos/${fileBase}.${ext}`
  );

  const img = document.createElement("img");
  img.className = "logo-icon";
  img.alt = name;
  img.decoding = "async";
  img.loading = "lazy";

  let candidateIdx = 0;
  const tryNext = () => {
    if (candidateIdx >= candidates.length) {
      item.classList.add("no-logo");
      return;
    }
    img.src = candidates[candidateIdx];
    candidateIdx += 1;
  };

  img.addEventListener("error", tryNext);
  tryNext();

  const iconText = document.createElement("span");
  iconText.className = "logo-fallback";
  iconText.textContent = name;

  iconWrap.appendChild(img);
  iconWrap.appendChild(iconText);

  const label = document.createElement("span");
  label.className = "logo-label";
  label.textContent = name;

  item.appendChild(iconWrap);
  item.appendChild(label);

  return item;
}

function renderToolbelt() {
  const track = document.querySelector(".logo-conveyor-track");
  if (!track) return;

  track.innerHTML = "";

  // Duplicate list for seamless loop.
  const items = [...toolbelt, ...toolbelt];
  items.forEach((t) => track.appendChild(createToolbeltItem(t)));
}

// ===== Tool-belt conveyor: auto-scrolls forever, and can be dragged at
// any time (mouse or touch) without pausing the auto-scroll — it just
// picks up again from wherever you let go. =====
function initConveyorDrag() {
  const track = document.querySelector(".logo-conveyor-track");
  if (!track) return;

  const SPEED = 36; // px/second, roughly the old 40s-per-loop pace
  let offset = 0; // current translateX, always kept within (-halfWidth, 0]
  let halfWidth = 0; // width of one (of the two duplicated) copies
  let dragging = false;
  let pointerId = null;
  let startX = 0;
  let startOffset = 0;
  let lastTime = null;

  const measure = () => {
    halfWidth = track.scrollWidth / 2;
  };
  measure();
  if (window.ResizeObserver) {
    new ResizeObserver(measure).observe(track);
  } else {
    window.addEventListener("resize", measure);
  }

  const wrap = () => {
    if (!halfWidth) return;
    while (offset <= -halfWidth) offset += halfWidth;
    while (offset > 0) offset -= halfWidth;
  };

  const apply = () => {
    track.style.transform = `translateX(${offset}px)`;
  };

  const frame = (time) => {
    if (lastTime === null) lastTime = time;
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    if (!dragging) {
      offset -= SPEED * dt;
      wrap();
      apply();
    }
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  track.addEventListener("pointerdown", (e) => {
    dragging = true;
    pointerId = e.pointerId;
    track.setPointerCapture(pointerId);
    startX = e.clientX;
    startOffset = offset;
    track.classList.add("dragging");
  });

  track.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    offset = startOffset + (e.clientX - startX);
    wrap();
    apply();
  });

  const endDrag = (e) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dragging = false;
    pointerId = null;
    track.classList.remove("dragging");
  };
  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderToolbelt();
  initConveyorDrag();
});
