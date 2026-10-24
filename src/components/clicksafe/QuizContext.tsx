import { createContext, useContext, useState, type ReactNode } from "react";

export interface QuizResult {
  score: number;
  total: number;
}

interface Ctx {
  result: QuizResult | null;
  setResult: (r: QuizResult | null) => void;
}

const QuizResultContext = createContext<Ctx | null>(null);

export function QuizResultProvider({ children }: { children: ReactNode }) {
  const [result, setResult] = useState<QuizResult | null>(null);
  return <QuizResultContext.Provider value={{ result, setResult }}>{children}</QuizResultContext.Provider>;
}

export function useQuizResult() {
  const ctx = useContext(QuizResultContext);
  if (!ctx) throw new Error("useQuizResult must be used inside QuizResultProvider");
  return ctx;
}
