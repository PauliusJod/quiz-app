import { supabase } from "@/components/lib/supabase";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ImageBackground, StyleSheet, Pressable } from "react-native";
import { imageMap, fallbackImage } from "../../components/utils/ImagesMap";
import { Answer, Question } from "@/components/utils/types";
import { Box } from "@/components/ui/box";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useQuizDataContext } from "@/components/lib/useQuizDataContext";
import { onAnswerPressed } from "@/components/utils/functions";
const tinycolor = require("tinycolor2");

const imageSource = imageMap["background"] ?? fallbackImage;

export default function QuizCategoriesScreen() {
  const { quizDataValue, setQuizDataValue } = useQuizDataContext();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [todos, setTodos] = useState<Question[] | null>(null);
  const textColor = Colors[colorScheme ?? "light"].text;
  const baseColor = Colors[colorScheme ?? "light"].overImageBackground;
  const lighterBorder = tinycolor(baseColor).lighten(20).toString(); // 20% lighter
  const isChosenCorrect = (answer: Answer) => {
    return answer.is_chosen ? (answer.is_correct ? "#7affce" : "#ff576d") : baseColor;
  };
  useEffect(() => {
    const getTodos = async () => {
      try {
        const { data: res, error } = await supabase.from<any, any>("questions_t1").select(`*, answers_t1 (id,answer_text,is_correct)`);
        const data: Question[] = (res ?? []).map((q) => ({
          ...q,
          answers_t1: q.answers_t1.map((a: Answer) => ({
            ...a,
            is_chosen: false,
          })),
          is_answered: false,
        }));

        console.log("data: ", JSON.stringify(data?.length));
        console.log("error: ", JSON.stringify(error));
        if (error) {
          console.error("Error fetching todos:", error.message);
          return;
        }

        if (data && data.length > 0) {
          console.log("DOWNLOAD");
          setQuizDataValue(data);
        }
      } catch (error: any) {
        console.error("Error fetching todos:", error.message);
      }
    };

    getTodos();
  }, []);

  return (
    <ImageBackground
      source={imageSource}
      resizeMode='cover'
      style={styles.container}>
      {quizDataValue ? (
        <View style={styles.container}>
          <Box style={[styles.questionBoxStyle, { backgroundColor: baseColor, borderColor: lighterBorder }]}>
            <Text style={[styles.text, { color: textColor }]}>{quizDataValue[1].question}</Text>
          </Box>
          <View style={styles.answersList}>
            {quizDataValue[1].answers_t1 &&
              quizDataValue[1].answers_t1.map((answer, index) => (
                <Pressable
                  onPress={() => setQuizDataValue(onAnswerPressed(quizDataValue[1].id, answer.id, quizDataValue))}
                  key={index}
                  style={[styles.answerItem, { backgroundColor: isChosenCorrect(answer), borderColor: lighterBorder }]}>
                  <Text style={[styles.text, { color: textColor }]}>{answer.answer_text}</Text>
                </Pressable>
              ))}
          </View>
        </View>
      ) : (
        <Text style={[styles.text, { color: textColor }]}>Error</Text>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  answersList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  answerItem: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
  },
  questionBoxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    minWidth: "50%",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderRadius: 20,
  },
  boxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});
