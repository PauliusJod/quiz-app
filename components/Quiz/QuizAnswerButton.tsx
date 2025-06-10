import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { Answer } from "@/components/utils/types";
import tinycolor from "tinycolor2";

type Props = {
  answer: Answer;
  colorScheme: "light" | "dark" | undefined;
  pressable: boolean;
  onPress: () => void;
};

export const QuizAnswerButton = ({ answer, colorScheme, pressable, onPress }: Props) => {
  const textColor = Colors[colorScheme ?? "light"].text;
  const baseColor = Colors[colorScheme ?? "light"].overImageBackground;
  const lighterBorder = tinycolor(baseColor).lighten(20).toString();
  const [pressed, setPressed] = useState<boolean>(false);

  const isChosenCorrect = answer.is_chosen ? (answer.is_correct ? "#7affce" : "#ff576d") : baseColor;

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={onPress}
      disabled={pressable}
      style={[
        styles.answerItem,
        {
          backgroundColor: isChosenCorrect,
          borderColor: lighterBorder,
          transform: pressed ? [{ scale: 0.9 }] : [{ scale: 1 }],
        },
      ]}>
      <Text style={[styles.text, { color: textColor }]}>{answer.answer_text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
});
