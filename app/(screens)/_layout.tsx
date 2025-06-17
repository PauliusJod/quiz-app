import { Stack } from "expo-router";

export default function ScreensLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='QuizCategoriesScreen'
        options={({ route }: { route: { params?: { quizCategory?: string } } }) => ({
          title: route.params?.quizCategory || "Quiz",
          presentation: "card",
          animation: "slide_from_right",
          headerShown: true,
        })}
      />
      <Stack.Screen
        name='QuizScreen'
        options={({ route }: { route: { params?: { quizCategory?: string } } }) => ({
          title: route.params?.quizCategory || "QuizScreen",
          presentation: "card",
          animation: "slide_from_right",
          headerShown: true,
        })}
      />
      <Stack.Screen
        name='PersonalizeSurveyScreen'
        options={{
          title: "Personalize survey",
          presentation: "card",
          animation: "slide_from_right",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
