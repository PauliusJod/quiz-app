import { Question } from "./types";

export const removeQuotes = (str: string) => {
  return str.replace(/^"(.*)"$/, "$1");
};

export const onAnswerPressed = (questionId: number, answerId: number, questions: Question[]) => {
  if (!questions) return [];
  const currentQuestion = questions.find((q) => q.id === questionId);
  const isAnswered = currentQuestion?.answers_t1.some((a) => a.is_chosen);

  if (isAnswered) return questions;

  return questions.map((q) => {
    if (q.id !== questionId || !q.answers_t1) return q;

    return {
      ...q,
      answers_t1: q.answers_t1.map((a) => ({
        ...a,
        is_chosen: a.id === answerId,
      })),
      is_answered: true,
    };
  });
};
