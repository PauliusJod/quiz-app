export type Answer = {
  id: number;
  is_correct: boolean;
  answer_text: string;
  is_chosen: boolean;
};

export type Question = {
  id: number;
  question: string;
  description: string;
  answers_t1: Answer[];
  is_answered: boolean;
};

export type Quiz = {
  id: number;
  categoryId: number;
  subCategoryId: number;
  title: string;
  description: string;
  questions: Question[] | null;
};
