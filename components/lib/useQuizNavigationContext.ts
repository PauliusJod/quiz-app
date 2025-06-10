import { createContext, useContext } from "react";

type QuizNavigation = {
  quizCategoryId: number;
  quizSubCategoryId: number;
  quizId: number;
};

interface QuizNavigationType {
  quizNavigationValue: QuizNavigation | null;
  setQuizNavigationValue: (value: QuizNavigation) => void;
}

export const QuizNavigationContext = createContext<QuizNavigationType | null>(null);

export function useQuizNavigationContext() {
  const quizNavigationValue = useContext(QuizNavigationContext);
  if (quizNavigationValue == null) {
    throw new Error("useCurrentQuizContext must be used within a currentQuizUserValue.Provider");
  }
  return quizNavigationValue;
}
