import { useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/data/quiz";
import { SectionHeader } from "./SectionHeader";
import { useQuizResult } from "./QuizContext";
import { cn } from "@/lib/utils";

export function getPerformance(score: number, total: number) {
  const pct = score / total;
  if (pct >= 0.9) return { title: "Scam-spotting expert!", advice: "You read messages like a pro. Share what you know with family — they're often the targets." };
  if (pct >= 0.7) return { title: "Sharp eye!", advice: "You catch most tricks. Review the questions you missed, especially about reading domain names." };
  if (pct >= 0.5) return { title: "Good start", advice: "You know the basics. Practise in the Scam Lab and URL Detective to build confidence." };
  return { title: "Keep practising", advice: "Scams are designed to fool everyone. Slow down, never share codes, and verify through official apps." };
}

export function Quiz() {
  const total = quizQuestions.length;
  const { setResult } = useQuizResult();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = quizQuestions[index]!;

  const choose = (i: number) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= total) {
      setDone(true);
      setResult({ score, total });
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setResult(null);
  };

  const progress = ((done ? total : index + (selected !== null ? 1 : 0)) / total) * 100;

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="border-y border-border bg-surface/40 py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader id="quiz-title" eyebrow="Quiz" title="Test your scam radar">
          {total} quick questions. You'll see the answer and why right after each one.
        </SectionHeader>

        <div className="panel p-6 sm:p-8">
          <div className="mb-6">
            <div className="mb-2 flex justify-between font-mono text-xs text-muted-foreground">
              <span>{done ? "Complete" : `Question ${index + 1} of ${total}`}</span>
              <span>Score: {score}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Quiz progress">
              <div className="bg-brand h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {done ? (
            <Results score={score} total={total} onReset={reset} />
          ) : (
            <div key={q.id} className="animate-fade-up">
              <h3 className="text-lg font-semibold leading-snug">{q.question}</h3>
              <div role="group" aria-label="Answer options" className="mt-5 grid gap-3">
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answer;
                  const isPicked = i === selected;
                  const locked = selected !== null;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => choose(i)}
                      disabled={locked}
                      aria-pressed={isPicked}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors disabled:cursor-default",
                        !locked && "border-border bg-background/50 hover:border-cyan/50 hover:bg-accent",
                        locked && isAnswer && "border-success/60 bg-success/10",
                        locked && isPicked && !isAnswer && "border-destructive/60 bg-destructive/10",
                        locked && !isAnswer && !isPicked && "border-border opacity-60",
                      )}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border font-mono text-xs">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {locked && isAnswer && <CheckCircle2 className="h-5 w-5 text-success" aria-label="Correct answer" />}
                      {locked && isPicked && !isAnswer && <XCircle className="h-5 w-5 text-destructive" aria-label="Your answer, incorrect" />}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="animate-fade-up mt-5" role="status" aria-live="polite">
                  <div className={cn("rounded-lg border px-4 py-3 text-sm", selected === q.answer ? "border-success/40 bg-success/10" : "border-destructive/40 bg-destructive/10")}>
                    <p className="font-semibold">{selected === q.answer ? "Correct!" : "Not quite."}</p>
                    <p className="mt-1 text-muted-foreground">{q.explanation}</p>
                  </div>
                  <div className="mt-5 flex justify-end">
                    <Button variant="brand" onClick={next} autoFocus>
                      {index + 1 >= total ? "See results" : "Next"} <ArrowRight />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Results({ score, total, onReset }: { score: number; total: number; onReset: () => void }) {
  const perf = getPerformance(score, total);
  return (
    <div className="animate-fade-up text-center" role="status" aria-live="polite">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 shadow-glow">
        <Trophy className="h-8 w-8 text-cyan" aria-hidden="true" />
      </div>
      <p className="mt-5 font-display text-5xl font-bold">
        <span className="text-brand">{score}</span>
        <span className="text-2xl text-muted-foreground"> / {total}</span>
      </p>
      <h3 className="mt-3 text-xl font-semibold">{perf.title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{perf.advice}</p>
      <ul className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm">
        {["Never share passwords or one-time codes.", "Read the domain right before the first '/'.", "When in doubt, contact the company through its official app."].map((t) => (
          <li key={t} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />{t}</li>
        ))}
      </ul>
      <Button variant="glass" className="mt-8" onClick={onReset}>
        <RotateCcw /> Try Again
      </Button>
    </div>
  );
}
