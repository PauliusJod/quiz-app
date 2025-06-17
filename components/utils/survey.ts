export const questions = [
  {
    type: "age",
    q: "What is your age?",
    ans: ["Under 16", "16-30", "31-60", "Over 60"],
    multiple: false,
  },
  {
    type: "interests",
    q: "Which subjects are you interested in?",
    ans: ["History", "Health", "Nature", "Geography", "Physics", "Technology", "Art & Culture", "General Knowledge"],
    multiple: true,
  },
  {
    type: "gender",
    q: "Select your gender",
    ans: ["Male", "Female", "Non-binary", "Prefer not to say"],
    multiple: false,
  },
  {
    type: "difficulty",
    q: "How challenging do you want the quizzes to be?",
    ans: ["Easy", "Moderate", "Difficult", "Surprise me!"],
    multiple: false,
  },
  {
    type: "frequency",
    q: "How often do you want to take quizzes?",
    ans: ["Daily", "A few times a week", "Weekly", "Occasionally"],
    multiple: false,
  },
  {
    type: "timedPreference",
    q: "Do you enjoy timed quizzes?",
    ans: ["Yes", "No", "Sometimes"],
    multiple: false,
  },
  {
    type: "modePreference",
    q: "Would you like to compete with friends or play solo?",
    ans: ["Compete with friends", "Play solo", "Both"],
    multiple: false,
  },
];
