import { createContext, useContext } from "react";
import { Question } from "../utils/types";

interface QuizDataType {
  quizDataValue: Question[] | null;
  setQuizDataValue: (value: Question[] | null) => void;
  saveQuizData: (value: Question[]) => void;
  quizIsFinished: boolean;
  setQuizIsFinishedValue: (value: boolean) => void;
}

export const QuizDataContext = createContext<QuizDataType | null>(null);

export function useQuizDataContext() {
  const quizDataValue = useContext(QuizDataContext);
  if (quizDataValue == null) {
    throw new Error("useQuizDataContext must be used within a quizDataValue.Provider");
  }
  return quizDataValue;
}
