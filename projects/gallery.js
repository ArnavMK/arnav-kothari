/**
 * "Full Gallery" page — every photo/video of the project, in whatever
 * order they were listed in `fullGallery`. No curation, no captions
 * required. Reads ?id= from the URL, finds the matching entry in
 * window.PROJECTS (../projects-data.js), and renders it as a masonry grid.
 *
 * You never edit this file to add content — edit projects-data.js.
 */

function renderGallery(project) {
  return `
    <h1 class="project-title">${escapeHtml(project.title)}</h1>
    <p class="project-category-badge">Full Gallery</p>

    ${mediaGrid(project.fullGallery, "full-gallery", { showCaption: true })}
  `;
}

function init() {
  const mount = document.getElementById("project-content");
  const project = findProjectOrShowError(mount);
  if (!project) return;

  const backLink = document.getElementById("back-link");
  if (backLink) backLink.href = `project.html?id=${encodeURIComponent(project.id)}`;

  if (!project.fullGallery || !project.fullGallery.length) {
    mount.innerHTML = `
      <h1 class="project-title">${escapeHtml(project.title)}</h1>
      <p class="project-body">No photos in the full gallery yet.</p>
    `;
    return;
  }

  document.title = `${project.title} Gallery - Arnav Kothari`;
  mount.innerHTML = renderGallery(project);

  wireVideoHoverControls(mount);
}

document.addEventListener("DOMContentLoaded", init);
