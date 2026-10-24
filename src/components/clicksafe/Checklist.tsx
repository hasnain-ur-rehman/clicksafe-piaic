import { useEffect, useState } from "react";
import { Check, PartyPopper, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "sender", title: "Verify the sender", desc: "Check the real email address or number, not just the display name." },
  { id: "links", title: "Inspect links before opening them", desc: "Read the domain carefully. If unsure, type the official address yourself." },
  { id: "otp", title: "Never share passwords or one-time passwords", desc: "No real company, bank or friend needs your password or OTP." },
  { id: "2fa", title: "Enable two-factor authentication", desc: "Turn on 2FA for email, banking and social accounts for an extra lock." },
  { id: "downloads", title: "Avoid suspicious downloads", desc: "Don't open unexpected attachments or apps from unknown sources." },
  { id: "payments", title: "Verify unexpected payment requests through official channels", desc: "Call the person or company using a number you already trust." },
];

const KEY = "clicksafe-checklist";

export function Checklist() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) setChecked(saved.filter((s) => ITEMS.some((i) => i.id === s)));
    } catch { /* ignore */ }
  }, []);

  const update = (next: string[]) => {
    setChecked(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore */ }
  };

  const toggle = (id: string) => update(checked.includes(id) ? checked.filter((c) => c !== id) : [...checked, id]);
  const count = checked.length;
  const complete = count === ITEMS.length;

  return (
    <section id="checklist" aria-labelledby="checklist-title" className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader id="checklist-title" eyebrow="Safety checklist" title="Your everyday safety habits">
          Tick each habit you already follow — or commit to starting today.
        </SectionHeader>
        <div className="panel p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="font-mono text-sm" aria-live="polite">{count} of {ITEMS.length} complete</p>
            <Button variant="ghost" size="sm" onClick={() => update([])} disabled={!count}><RotateCcw /> Reset</Button>
          </div>
          <div className="mb-6 h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-label="Checklist progress" aria-valuemin={0} aria-valuemax={ITEMS.length} aria-valuenow={count}>
            <div className={cn("h-full rounded-full transition-all duration-500", complete ? "bg-success" : "bg-brand")} style={{ width: `${(count / ITEMS.length) * 100}%` }} />
          </div>

          {complete && (
            <div className="animate-fade-up mb-6 flex items-center gap-3 rounded-lg border border-success/40 bg-success/10 px-4 py-3" role="status">
              <PartyPopper className="h-6 w-6 shrink-0 text-success" aria-hidden="true" />
              <div>
                <p className="font-semibold text-success">All six habits done — brilliant!</p>
                <p className="text-sm text-muted-foreground">You've built a strong shield. Share these habits with someone you care about.</p>
              </div>
            </div>
          )}

          <ul className="grid gap-3">
            {ITEMS.map((item) => {
              const on = checked.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(item.id)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors",
                      on ? "border-success/40 bg-success/5" : "border-border bg-background/40 hover:bg-accent",
                    )}
                  >
                    <span className={cn("mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors", on ? "border-success bg-success text-success-foreground" : "border-muted-foreground")}>
                      {on && <Check className="h-4 w-4" aria-hidden="true" />}
                    </span>
                    <span>
                      <span className={cn("block font-medium", on && "text-success")}>{item.title}</span>
                      <span className="mt-0.5 block text-sm text-muted-foreground">{item.desc}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
