/**
 * Light / dark theme toggle.
 *
 * The no-flash bit runs inline in each page's <head> (it sets data-theme on
 * <html> before the CSS paints). This file just wires up the nav-bar button.
 */
(function () {
  var root = document.documentElement;

  function current() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", function () {
      apply(current() === "dark" ? "light" : "dark");
    });
  });
})();
