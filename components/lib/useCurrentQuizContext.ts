import { AuthSession } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
type Question = {
  id: number;
  question: string;
  answers: string[];
  correctAnswer: string;
};

type Quiz = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};

interface CurrentQuizContextType {
  currentQuizUserValue: AuthSession | null;
  setCurrentQuizUserValue: (value: AuthSession) => void;
  currentQuizValue: AuthSession | null;
  setCurrentQuizValue: (value: AuthSession) => void;
}
export const CurrentQuizContext = createContext<CurrentQuizContextType | null>(null);

export function useCurrentQuizContext() {
  const currentQuizUserValue = useContext(CurrentQuizContext);
  if (currentQuizUserValue == null) {
    throw new Error("useCurrentQuizContext must be used within a currentQuizUserValue.Provider");
  }
  return currentQuizUserValue;
}
