import { Logo } from "./Logo";
import { NAV_LINKS, scrollToSection } from "./nav";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">Think Before You Click.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Explore</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(l.id); }} className="rounded text-muted-foreground hover:text-foreground">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-semibold">Disclaimer</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            ClickSafe is for educational use only and is not a substitute for professional security advice. All examples are fictional. If you think you've been scammed, contact your bank or the official provider right away and report it to the relevant authorities.
          </p>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">Created as a PIAIC class project.</div>
    </footer>
  );
}
