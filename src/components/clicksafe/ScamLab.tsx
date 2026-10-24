import { useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronRight, Mail, MessageSquare, RotateCcw, Smartphone, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scamExamples, type ScamExample } from "@/data/scams";
import { SectionHeader } from "./SectionHeader";
import { cn } from "@/lib/utils";

type Answers = Record<string, boolean>; // id -> user said scam

const channelIcon = { sms: Smartphone, email: Mail, chat: MessageSquare };

export function ScamLab() {
  const [activeId, setActiveId] = useState(scamExamples[0].id);
  const [answers, setAnswers] = useState<Answers>({});
  const active = scamExamples.find((e) => e.id === activeId)!;
  const answered = active.id in answers;
  const correctCount = scamExamples.filter((e) => e.id in answers && answers[e.id] === e.isScam).length;
  const answeredCount = Object.keys(answers).length;

  const next = () => {
    const idx = scamExamples.findIndex((e) => e.id === activeId);
    const after = [...scamExamples.slice(idx + 1), ...scamExamples.slice(0, idx)].find((e) => !(e.id in answers));
    setActiveId((after ?? scamExamples[(idx + 1) % scamExamples.length]).id);
  };

  return (
    <section id="scam-lab" aria-labelledby="scam-lab-title" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeader id="scam-lab-title" eyebrow="Scam Detective Lab" title="Is this message safe or a scam?">
        Pick a message, read it carefully, then decide. All senders, names and links are fictional.
      </SectionHeader>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          Score: <span className="font-semibold text-success">{correctCount}</span> correct of {answeredCount} answered · {scamExamples.length} examples
        </p>
        <Button variant="ghost" size="sm" onClick={() => { setAnswers({}); setActiveId(scamExamples[0].id); }} disabled={!answeredCount}>
          <RotateCcw /> Reset lab
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <ul className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Examples">
          {scamExamples.map((e, i) => {
            const Icon = channelIcon[e.channel];
            const done = e.id in answers;
            const right = done && answers[e.id] === e.isScam;
            return (
              <li key={e.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveId(e.id)}
                  aria-current={e.id === activeId}
                  className={cn(
                    "flex w-56 items-center gap-3 rounded-lg border px-3 py-3 text-left text-sm transition-colors lg:w-full",
                    e.id === activeId ? "border-cyan/60 bg-accent" : "border-border bg-card/50 hover:bg-accent/60",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />
                  <span className="flex-1">
                    <span className="block font-mono text-[11px] text-muted-foreground">#{i + 1}</span>
                    {e.title}
                  </span>
                  {done && (right
                    ? <CheckCircle2 className="h-4 w-4 text-success" aria-label="Answered correctly" />
                    : <XCircle className="h-4 w-4 text-destructive" aria-label="Answered incorrectly" />)}
                </button>
              </li>
            );
          })}
        </ul>

        <div key={active.id} className="animate-fade-up grid gap-6 md:grid-cols-2">
          <MessageView example={active} revealed={answered} />
          <div className="flex flex-col">
            {!answered ? (
              <div className="panel flex flex-1 flex-col justify-center p-6 text-center">
                <p className="font-display text-lg font-semibold">What do you think?</p>
                <p className="mt-2 text-sm text-muted-foreground">Look at who sent it, what it asks for, and how it makes you feel.</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <Button variant="danger" size="lg" className="h-12" onClick={() => setAnswers({ ...answers, [active.id]: true })}>
                    <AlertTriangle /> Suspicious
                  </Button>
                  <Button variant="success" size="lg" className="h-12" onClick={() => setAnswers({ ...answers, [active.id]: false })}>
                    <CheckCircle2 /> Legitimate
                  </Button>
                </div>
              </div>
            ) : (
              <Verdict example={active} saidScam={answers[active.id]} onNext={next} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function MessageView({ example, revealed }: { example: ScamExample; revealed: boolean }) {
  const isEmail = example.channel === "email";
  return (
    <article aria-label={`Example message: ${example.title}`} className={cn("panel overflow-hidden", !isEmail && "mx-auto w-full max-w-sm rounded-[2rem] p-2")}>
      <div className={cn(!isEmail && "rounded-[1.6rem] border border-border bg-background/70")}>
        <header className="border-b border-border px-5 py-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            {isEmail ? "Email" : example.channel === "sms" ? "Text message" : "Chat message"} · {example.time}
          </p>
          <p className="mt-1 break-words text-sm font-medium">{example.sender}</p>
          {example.subject && <p className="mt-1 text-sm text-muted-foreground">Subject: {example.subject}</p>}
        </header>
        <div className="px-5 py-5">
          <p className={cn("whitespace-pre-line text-sm leading-relaxed", !isEmail && "rounded-2xl rounded-tl-sm bg-secondary px-4 py-3")}>
            {example.body.map((seg, i) =>
              typeof seg === "string" ? (
                <span key={i}>{seg}</span>
              ) : (
                <mark
                  key={i}
                  className={cn(
                    "rounded px-0.5 text-inherit transition-colors",
                    revealed ? "bg-destructive/25 underline decoration-destructive decoration-wavy underline-offset-4" : "bg-transparent",
                  )}
                >
                  {seg.text}
                  {revealed && <sup className="ml-0.5 font-mono text-[10px] text-destructive">{seg.flag + 1}</sup>}
                </mark>
              ),
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

function Verdict({ example, saidScam, onNext }: { example: ScamExample; saidScam: boolean; onNext: () => void }) {
  const correct = saidScam === example.isScam;
  return (
    <div className="panel flex-1 p-6" role="status" aria-live="polite">
      <div className={cn("flex items-center gap-2 font-display text-lg font-semibold", correct ? "text-success" : "text-destructive")}>
        {correct ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
        {correct ? "Correct!" : "Not quite."}
      </div>
      <p className="mt-1 text-sm">
        This message is <strong className={example.isScam ? "text-destructive" : "text-success"}>{example.isScam ? "suspicious" : "legitimate"}</strong>.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">{example.explanation}</p>
      {example.redFlags.length > 0 ? (
        <>
          <h3 className="mt-5 text-sm font-semibold">Red flags</h3>
          <ol className="mt-2 space-y-1.5 text-sm">
            {example.redFlags.map((f, i) => (
              <li key={f} className="flex gap-2">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-destructive/20 font-mono text-[10px] text-destructive">{i + 1}</span>
                {f}
              </li>
            ))}
          </ol>
        </>
      ) : (
        <p className="mt-4 rounded-lg border border-success/30 bg-success/10 px-3 py-2 text-sm">No red flags: no link, no request for codes or money, no pressure.</p>
      )}
      <h3 className="mt-5 text-sm font-semibold">Safer response</h3>
      <p className="mt-1 text-sm text-muted-foreground">{example.safeResponse}</p>
      <Button variant="brand" className="mt-6 w-full" onClick={onNext}>
        Next example <ChevronRight />
      </Button>
    </div>
  );
}
