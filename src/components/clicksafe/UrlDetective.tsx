import { useState } from "react";
import { Info, Link2Off, ScanSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { analyzeUrl, type AnalysisError, type AnalysisResult, type Severity } from "@/lib/url-analyzer";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

const EXAMPLES = [
  "https://www.example.com/help",
  "http://northbank.secure-login-verify.example/account",
  "https://bit.ly/3xPrize",
  "http://192.168.40.12/wallet/verify",
  "https://paypa1-support.example@gift-claim.xyz",
  "https://xn--nrthbank-9za.example/login",
];

const chip: Record<Severity, string> = {
  high: "bg-destructive/20 text-destructive border-destructive/40",
  medium: "bg-warning/15 text-warning border-warning/40",
  low: "bg-cyan/10 text-cyan border-cyan/30",
  info: "bg-success/10 text-success border-success/30",
};

const levelText = {
  high: { label: "Several strong warning signs", tip: "Don't open this link. If it claims to be from a company, go to that company's official app or type its address yourself.", cls: "text-destructive" },
  medium: { label: "Some warning signs", tip: "Be careful. Check who sent it and confirm through an official channel before entering any information.", cls: "text-warning" },
  low: { label: "Few or no obvious clues", tip: "Still double-check the domain is exactly the one you expect, and never enter passwords from a link you weren't expecting.", cls: "text-success" },
};

export function UrlDetective() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<AnalysisResult | AnalysisError | null>(null);

  const run = (v = value) => setResult(analyzeUrl(v));

  return (
    <section id="url-detective" aria-labelledby="url-title" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <SectionHeader id="url-title" eyebrow="URL Detective" title="Read a link like an investigator">
        Paste a web address and see the clues that often point to a fake page.
      </SectionHeader>

      <div className="mb-6 flex gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3 text-sm">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-warning" aria-hidden="true" />
        <p>
          <strong>Educational clues only.</strong> This is not a real-time security scanner. Nothing you type is fetched, opened or visited — it's checked by simple rules in your browser. A result can't guarantee that a link is safe or dangerous.
        </p>
      </div>

      <div className="panel p-6">
        <form
          onSubmit={(e) => { e.preventDefault(); run(); }}
          className="flex flex-col gap-3 sm:flex-row"
          noValidate
        >
          <label htmlFor="url-input" className="sr-only">Web address to analyze</label>
          <Input
            id="url-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. https://account-verify.example/login"
            className="h-12 flex-1 font-mono text-sm"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={result?.ok === false}
            aria-describedby={result?.ok === false ? "url-error" : undefined}
          />
          <Button type="submit" variant="brand" size="lg" className="h-12">
            <ScanSearch /> Analyze
          </Button>
        </form>

        <div className="mt-4">
          <p className="mb-2 text-xs text-muted-foreground">Try an example:</p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => { setValue(ex); run(ex); }}
                className="max-w-full truncate rounded-md border border-border bg-background/50 px-2.5 py-1.5 font-mono text-xs text-muted-foreground hover:border-cyan/50 hover:text-foreground"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6" aria-live="polite">
          {!result && (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
              <Link2Off className="mb-3 h-6 w-6 text-cyan" aria-hidden="true" />
              Enter an address above or pick an example to see what clues it contains.
            </div>
          )}
          {result && !result.ok && (
            <p id="url-error" role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm">{result.error}</p>
          )}
          {result?.ok && (
            <div className="animate-fade-up">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
                <div className="min-w-0">
                  <p className="font-mono text-xs text-muted-foreground">Domain checked</p>
                  <p className="break-all font-mono text-sm">{result.hostname}</p>
                </div>
                <p className={cn("font-display font-semibold", levelText[result.level].cls)}>{levelText[result.level].label}</p>
              </div>
              <ul className="mt-4 space-y-3">
                {result.findings.map((f) => (
                  <li key={f.id} className="flex gap-3 rounded-lg border border-border bg-background/40 p-3">
                    <span className={cn("h-fit shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] uppercase", chip[f.severity])}>
                      {f.severity === "info" ? "ok" : f.severity}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{f.title}</p>
                      <p className="mt-0.5 text-sm text-muted-foreground">{f.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 rounded-lg border border-cyan/30 bg-primary/10 px-4 py-3 text-sm">
                <strong>What to do:</strong> {levelText[result.level].tip}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
