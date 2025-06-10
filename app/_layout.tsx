import FontAwesome from "@expo/vector-icons/FontAwesome";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/[default_components]/useColorScheme";
import { AuthSession, Session } from "@supabase/supabase-js";
import { supabase } from "@/components/lib/supabase";
import { SessionContext } from "@/components/lib/useSessionContext";
import { QuizNavigationContext } from "@/components/lib/useQuizNavigationContext";
import { QuizDataContext } from "@/components/lib/useQuizDataContext";
import { Question } from "@/components/utils/types";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
// import { CurrentQuizContext } from "@/components/lib/useQuizNavigationContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode='light'>
      <RootLayoutNav />
    </GluestackUIProvider>
  );
}
type QuizNavigationType = {
  category: number;
  subCategory: number;
  quiz: number;
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [sessionValue, setSessionValue] = useState<AuthSession | null>(null);
  const [quizNavigationValue, setQuizNavigationValue] = useState<any | null>(null);
  const [quizDataValue, setQuizDataValue] = useState<Question[] | null>(null);
  const [quizIsFinished, setQuizIsFinishedValue] = useState<boolean>(false);
  const saveQuizData = (value: Question[]) => {
    setQuizDataValue(value);
  };
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      // console.log("session 1111: ", session);
      setSessionValue(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log("session 2222: ", session);
      setSessionValue(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ sessionValue, setSessionValue }}>
      <QuizNavigationContext.Provider value={{ quizNavigationValue, setQuizNavigationValue }}>
        <QuizDataContext.Provider value={{ quizDataValue, setQuizDataValue, saveQuizData, quizIsFinished, setQuizIsFinishedValue }}>
          <GluestackUIProvider mode='light'>
            <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
              {/* HIDE SOFT BAR */}
              <Stack>
                <Stack.Screen
                  name='(tabs)'
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name='modals/modal'
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name='modals/settings'
                  options={{ presentation: "modal" }}
                />
                <Stack.Screen
                  name='screens/QuizCategoriesScreen'
                  options={({ route }: { route: { params?: { quizCategory?: string } } }) => ({
                    title: route.params?.quizCategory || "Quiz",
                    presentation: "card",
                    animation: "slide_from_right",
                    headerShown: true,
                  })}
                />
                <Stack.Screen
                  name='screens/QuizScreen'
                  options={({ route }: { route: { params?: { quizCategory?: string } } }) => ({
                    title: route.params?.quizCategory || "Quiz",
                    presentation: "card",
                    animation: "slide_from_right",
                    headerShown: true,
                  })}
                />
              </Stack>
            </ThemeProvider>
          </GluestackUIProvider>
        </QuizDataContext.Provider>
      </QuizNavigationContext.Provider>
    </SessionContext.Provider>
  );
}
