import { supabase } from "@/components/lib/supabase";
import React, { useEffect } from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { Text } from "@/components/ui/text";

import { imageMap, fallbackImage } from "../../components/utils/ImagesMap";
import { Answer, Question } from "@/components/utils/types";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useQuizDataContext } from "@/components/lib/useQuizDataContext";
import { Spinner } from "@/components/ui/spinner";
import { HStack } from "@/components/ui/hstack";
import ActiveQuiz from "@/components/Quiz/ActiveQuiz";
import InActiveQuiz from "@/components/Quiz/InActiveQuiz";
const tinycolor = require("tinycolor2");

const imageSource = imageMap["background"] ?? fallbackImage;

/*
TODO ANIMATION ON QUESTION LOAD
*/
export default function QuizScreen() {
  const { quizDataValue, setQuizDataValue, quizIsFinished, setQuizIsFinishedValue } = useQuizDataContext();
  const { colorScheme, setColorScheme } = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const baseColor = Colors[colorScheme ?? "light"].overImageBackground;
  useEffect(() => {
    const getTodos = async () => {
      setQuizDataValue(null);
      try {
        const { data: res, error } = await supabase.from<any, any>("questions_t1").select(`*, answers_t1 (id,answer_text,is_correct)`).limit(2);
        const data: Question[] = (res ?? []).map((q) => ({
          ...q,
          answers_t1: q.answers_t1.map((a: Answer) => ({
            ...a,
            is_chosen: false,
          })),
          is_answered: false,
        }));
        if (error) {
          throw error;
        }
        if (data && data.length > 0) {
          setQuizDataValue(data);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };
    getTodos();
  }, []);

  const areAllDone = () => {
    if (!quizDataValue) {
      setQuizIsFinishedValue(false);
      return false;
    }
    const isDone = quizDataValue.every((q) => q.is_answered);
    setQuizIsFinishedValue(isDone);
    return isDone;
  };

  if (!quizDataValue) {
    return (
      <ImageBackground
        source={imageSource}
        resizeMode='cover'
        style={styles.container}>
        <HStack style={styles.text}>
          <Spinner
            size={50}
            color={textColor}
          />
          <Text
            size='2xl'
            style={[styles.text, { color: textColor, paddingHorizontal: 20 }]}>
            Please Wait
          </Text>
        </HStack>
      </ImageBackground>
    );
  }
  return (
    <ImageBackground
      source={imageSource}
      resizeMode='cover'
      style={styles.container}>
      {/* {!areAllDone() ? <ActiveQuiz></ActiveQuiz> : <InActiveQuiz></InActiveQuiz>} */}
      <Text>{JSON.stringify(quizIsFinished)}</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
  },
});
