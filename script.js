/**
 * Portfolio Script (home page)
 * - Renders project tiles from window.PROJECTS (see projects-data.js)
 * - Renders the intro tool-belt conveyor
 * - Scroll-triggered fade-in animations
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

// ===== Scroll-triggered Fade-in =====
function initScrollAnimations() {
  const sections = document.querySelectorAll(".section:not(.intro-section)");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}

// ===== Initialize =====
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  renderToolbelt();
  initScrollAnimations();
});
