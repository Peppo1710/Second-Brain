// src/theme.js
export function applyTheme() {
  if (localStorage.theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (localStorage.theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", systemPrefersDark);
  }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.theme = isDark ? "dark" : "light";
}
