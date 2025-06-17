import { Stack } from "expo-router";

export default function SurveyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='SurveyWelcomeScreen'
        options={{ title: "Personalization survey", headerShown: true }}
      />
      <Stack.Screen
        name='SurveyQuestionScreen'
        options={{ title: "Questions", headerShown: true }}
      />
      <Stack.Screen
        name='SurveyEndScreen'
        options={{ title: "Summary", headerShown: true }}
      />
    </Stack>
  );
}
