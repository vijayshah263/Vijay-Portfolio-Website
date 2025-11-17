// Simple menu toggle for mobile
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  if (!menu) return;
  const isHidden = menu.getAttribute("aria-hidden") === "true";
  menu.setAttribute("aria-hidden", String(!isHidden));
  menu.classList.toggle("open"); // style .open in CSS to show/hide
}

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// THEME TOGGLE (dark / light) — visible status + persistence
(function () {
  const checkbox = document.getElementById("switch");
  const status = document.getElementById("theme-status");
  const storageKey = "site-theme";
  const body = document.body;

  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add("dark");
      checkbox.checked = true;
      checkbox.setAttribute("aria-checked", "true");
      status.textContent = "Dark";
    } else {
      body.classList.remove("dark");
      checkbox.checked = false;
      checkbox.setAttribute("aria-checked", "false");
      status.textContent = "Light";
    }
  }

  // load saved preference (if any) or follow system preference
  const saved = localStorage.getItem(storageKey);
  if (saved === "dark") {
    applyTheme(true);
  } else if (saved === "light") {
    applyTheme(false);
  } else {
    // no saved pref -> use system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    applyTheme(prefersDark);
  }

  // toggle handler
  checkbox.addEventListener("change", function () {
    const isDark = checkbox.checked;
    applyTheme(isDark);
    localStorage.setItem(storageKey, isDark ? "dark" : "light");
  });

  // keep status in sync if system theme changes (optional)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      // only change if user hasn't manually set a preference
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches);
      }
    });
})();
