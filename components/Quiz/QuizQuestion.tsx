import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { imageMap, fallbackImage } from "../../components/utils/ImagesMap";
import { Question } from "@/components/utils/types";
import { Box } from "@/components/ui/box";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useQuizDataContext } from "@/components/lib/useQuizDataContext";
import { onAnswerPressed } from "@/components/utils/functions";
import * as Animatable from "react-native-animatable";
import { QuizAnswerButton } from "./QuizAnswerButton";
const tinycolor = require("tinycolor2");
const imageSource = imageMap["background"] ?? fallbackImage;
type Props = {
  question: Question;
  onChange: () => void;
  animation: string;
};

export default function QuizQuestion({ question, onChange, animation }: Props) {
  const { quizDataValue, setQuizDataValue } = useQuizDataContext();
  const { colorScheme, setColorScheme } = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const baseColor = Colors[colorScheme ?? "light"].overImageBackground;
  const lighterBorder = tinycolor(baseColor).lighten(20).toString(); // 20% lighter

  if (!quizDataValue) return;
  <View style={styles.questionContainer}></View>;

  return (
    <Animatable.View
      animation={animation}
      direction='normal'
      duration={1000}>
      <View style={styles.questionContainer}>
        <Box style={[styles.questionBoxStyle, { backgroundColor: baseColor, borderColor: lighterBorder }]}>
          <Text style={[styles.text, { color: textColor }]}>{question.question}</Text>
        </Box>
        <View style={styles.answersList}>
          {question.answers_t1 &&
            question.answers_t1.map((answer, index) => (
              <QuizAnswerButton
                key={index}
                answer={answer}
                colorScheme={colorScheme}
                pressable={question.is_answered}
                onPress={() => {
                  setQuizDataValue(onAnswerPressed(question.id, answer.id, quizDataValue));
                  console.log(JSON.stringify(quizDataValue[0]));
                  onChange();
                }}
              />
            ))}
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  questionContainer: {
    alignItems: "center",
  },
  answersList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
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
});
