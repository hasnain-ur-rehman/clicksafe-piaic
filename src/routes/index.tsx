import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/clicksafe/Navbar";
import { Hero } from "@/components/clicksafe/Hero";
import { ScamLab } from "@/components/clicksafe/ScamLab";
import { Quiz } from "@/components/clicksafe/Quiz";
import { UrlDetective } from "@/components/clicksafe/UrlDetective";
import { Checklist } from "@/components/clicksafe/Checklist";
import { FinalChallenge } from "@/components/clicksafe/FinalChallenge";
import { Footer } from "@/components/clicksafe/Footer";
import { QuizResultProvider } from "@/components/clicksafe/QuizContext";

const TITLE = "ClickSafe — Think Before You Click";
const DESC = "Learn to spot online scams, phishing messages, fake prizes and unsafe links with free interactive challenges, a quiz and a URL detective.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <QuizResultProvider>
      <div className="relative min-h-screen">
        <div className="bg-grid pointer-events-none fixed inset-0 -z-0" aria-hidden="true" />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="relative">
          <Hero />
          <ScamLab />
          <Quiz />
          <UrlDetective />
          <Checklist />
          <FinalChallenge />
        </main>
        <Footer />
      </div>
    </QuizResultProvider>
  );
}
