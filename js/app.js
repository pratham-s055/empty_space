

// darkmode.js
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("darkModeToggle");
  const isDark = localStorage.getItem("darkMode") === "true";
  
  if (isDark) {
    document.body.classList.add("dark");
    toggle.checked = true;
    document.body.classList.toggle("dark-mode");
  }

  toggle.addEventListener("change", () => {
    console.log("Toggle changed");
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", toggle.checked);
  });
});
