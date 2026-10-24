import { ArrowRight, Search, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "./Logo";
import { scrollToSection } from "./nav";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="bg-hero pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 md:grid-cols-2 md:pt-24">
        <div className="animate-fade-up">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-xs text-cyan">
            <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" /> Free interactive scam training
          </p>
          <h1 id="hero-title" className="mt-5 text-4xl font-bold leading-tight sm:text-5xl outline-none">
            Think Before <span className="text-brand">You Click.</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">
            Learn to spot digital scams, uncover suspicious messages, and protect yourself online — one challenge at a time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="brand" size="lg" className="h-12" onClick={() => scrollToSection("quiz")}>
              Start the Challenge <ArrowRight />
            </Button>
            <Button variant="glass" size="lg" className="h-12" onClick={() => scrollToSection("scam-lab")}>
              <Search /> Explore Scam Examples
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <li>8 real-world scenarios</li>
            <li>10-question quiz</li>
            <li>Nothing to install, no sign-up</li>
          </ul>
        </div>
        <HeroGraphic />
      </div>
    </section>
  );
}

function HeroGraphic() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
      <div className="absolute -right-4 -top-6 flex h-28 w-28 items-center justify-center">
        <span className="animate-pulse-ring absolute inset-0 rounded-full border border-cyan/50" />
        <span className="absolute inset-3 rounded-full bg-primary/20 blur-xl" />
        <LogoMark className="animate-float relative h-20 w-20 drop-shadow-[0_0_18px_var(--cyan)]" />
      </div>
      <div className="panel shadow-glow p-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary font-mono text-xs">QS</div>
            <div>
              <p className="text-sm font-medium">QuickShip</p>
              <p className="font-mono text-xs text-muted-foreground">SMS · 14:07</p>
            </div>
          </div>
          <span className="rounded-full bg-destructive/15 px-2 py-0.5 font-mono text-[11px] text-destructive">Flagged</span>
        </div>
        <p className="mt-4 text-sm leading-relaxed">
          Your parcel is on hold. Pay the customs fee now:{" "}
          <span className="rounded bg-destructive/15 px-1 font-mono text-destructive underline decoration-wavy">quickship-fee.example/pay</span>
        </p>
        <div className="mt-5 space-y-2">
          {[
            ["Look-alike domain", "high"],
            ["Unexpected payment", "medium"],
            ["Urgency pressure", "medium"],
          ].map(([t, s]) => (
            <div key={t} className="flex items-center justify-between rounded-lg border border-border bg-background/50 px-3 py-2 text-xs">
              <span className="flex items-center gap-2"><ShieldAlert className="h-3.5 w-3.5 text-warning" />{t}</span>
              <span className={s === "high" ? "font-mono text-destructive" : "font-mono text-warning"}>{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div className="bg-brand h-full w-4/5 rounded-full" />
        </div>
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">risk clues detected: 3</p>
      </div>
    </div>
  );
}
