export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "scam-lab", label: "Scam Lab" },
  { id: "quiz", label: "Quiz" },
  { id: "url-detective", label: "URL Detective" },
  { id: "checklist", label: "Checklist" },
  { id: "challenge", label: "Challenge" },
] as const;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
  const heading = el.querySelector<HTMLElement>("h1, h2");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
