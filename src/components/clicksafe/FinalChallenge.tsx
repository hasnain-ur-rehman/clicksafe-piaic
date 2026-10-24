import { useEffect, useState } from "react";
import { ArrowRight, Share2, Target } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useQuizResult } from "./QuizContext";
import { scrollToSection } from "./nav";

export function FinalChallenge() {
  const { result } = useQuizResult();
  const [href, setHref] = useState("");
  useEffect(() => setHref(window.location.href.split("#")[0] ?? window.location.href), [result]);

  const text = result
    ? `I scored ${result.score}/${result.total} on the ClickSafe scam-spotting quiz. Think Before You Click — can you beat me? ${href}`
    : "";

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: "ClickSafe", text });
        return;
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Score copied to clipboard!");
    } catch {
      toast.error("Couldn't copy automatically — select the text below to share it.");
    }
  };

  return (
    <section id="challenge" aria-labelledby="challenge-title" className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <div className="panel shadow-glow relative overflow-hidden p-8 text-center sm:p-12">
        <div className="bg-hero pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative">
          <Target className="mx-auto h-10 w-10 text-cyan" aria-hidden="true" />
          <h2 id="challenge-title" className="mt-4 text-2xl font-semibold sm:text-3xl outline-none">Can you outsmart the scammers?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Put everything together. Take the quiz, then challenge a friend or family member to beat your score.
          </p>

          {result ? (
            <div className="animate-fade-up mx-auto mt-8 max-w-lg">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Your score</p>
              <p className="mt-1 font-display text-4xl font-bold"><span className="text-brand">{result.score}</span> / {result.total}</p>
              <p className="mt-4 select-all rounded-lg border border-border bg-background/60 px-4 py-3 text-left text-sm break-words">{text}</p>
              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <Button variant="brand" size="lg" onClick={share}><Share2 /> Share my score</Button>
                <Button variant="glass" size="lg" onClick={() => scrollToSection("quiz")}>Retake quiz</Button>
              </div>
            </div>
          ) : (
            <div className="mt-8">
              <p className="mx-auto mb-5 max-w-sm rounded-lg border border-dashed border-border px-4 py-3 text-sm text-muted-foreground">
                You haven't finished the quiz yet. Complete it to see your score here and share it.
              </p>
              <Button variant="brand" size="lg" className="h-12" onClick={() => scrollToSection("quiz")}>
                Take the quiz <ArrowRight />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
