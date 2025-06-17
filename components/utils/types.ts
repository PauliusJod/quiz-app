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

export type UserPersonalization = {
  user_id: string;
  age: string | null;
  interests: string[] | [];
  gender: string | null;
  difficulty: string | null;
  frequency: string | null;
  timedPreference: string | null;
  modePreference: string | null;
  created_at: Date;
};
export type UserSurveyData = {
  age: string | null;
  difficulty: string | null;
  frequency: string | null;
  gender: string | null;
  interests: string[] | [];
  modePreference: string | null;
  timedPreference: string | null;
};

export const emptyUserSurveyData: UserSurveyData = {
  age: "",
  difficulty: "",
  frequency: "",
  gender: "",
  interests: [],
  modePreference: "",
  timedPreference: "",
};
