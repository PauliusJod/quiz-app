import { View, ImageBackground, StyleSheet, Pressable } from "react-native";
import { Text } from "@/components/ui/text";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Animatable from "react-native-animatable";
import QuizResultCard from "@/components/Quiz/QuizResultCard";
import QuizQuestion from "./QuizQuestion";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useState } from "react";
import { useQuizDataContext } from "../lib/useQuizDataContext";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
export default function InActiveQuiz() {
  const { quizDataValue, setQuizDataValue, quizIsFinished, setQuizIsFinishedValue } = useQuizDataContext();
  const { colorScheme, setColorScheme } = useColorScheme();
  const textColor = Colors[colorScheme ?? "light"].text;
  const baseColor = Colors[colorScheme ?? "light"].overImageBackground;
  const [anim, setAnim] = useState<string>("zoomIn");
  const [currQuestion, setCurrQuestion] = useState<number>(0);
  const changeQuestion = () => {
    // Change question after any answer clicked
    // Should depend on configuration
    if (!quizDataValue) return setCurrQuestion(0);
    if (currQuestion < quizDataValue.length - 1) {
      setTimeout(() => {
        setCurrQuestion((prev: number) => prev + 1);
      }, 100);
    }
  };
  const onQuestionChangeUp = () => {
    if (!quizDataValue) return setCurrQuestion(0);
    if (currQuestion < quizDataValue.length - 1) {
      setCurrQuestion((prev: number) => prev + 1);
    }
  };
  const onQuestionChangeDown = () => {
    if (!quizDataValue) return setCurrQuestion(0);
    if (currQuestion >= 1) {
      setCurrQuestion((prev: number) => prev - 1);
    }
  };
  const areAllDone = () => {
    if (!quizDataValue) {
      setQuizIsFinishedValue(false);
      return false;
    }
    const isDone = quizDataValue.every((q) => q.is_answered);
    setQuizIsFinishedValue(isDone);
    return isDone;
  };
  if (!areAllDone() || !quizDataValue) {
    return <Text>{JSON.stringify(!areAllDone())}</Text>;
  }
  return (
    <View style={styles.container}>
      <QuizResultCard />
      <Animatable.View
        animation='bounceIn'
        style={styles.quizContainer}
        duration={100}
        // 2000
        delay={200}>
        <QuizQuestion
          question={quizDataValue[currQuestion]}
          key={currQuestion}
          onChange={changeQuestion}
          animation={anim}
        />
      </Animatable.View>
      <View style={styles.buttonsView}>
        <Pressable onPress={() => onQuestionChangeDown()}>
          <Feather
            name='arrow-left-circle'
            size={30}
            color={Colors[colorScheme ?? "light"].gIconDefault}
            style={{ padding: 5, opacity: 1 }}
          />
        </Pressable>
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={[styles.backButton, { backgroundColor: baseColor }]}>
          <AntDesign
            name='home'
            size={24}
            color={Colors[colorScheme ?? "light"].themeIconsDefault}
            style={{ padding: 5, opacity: 1 }}
          />
        </Pressable>
        <Pressable onPress={() => onQuestionChangeUp()}>
          <Feather
            name='arrow-right-circle'
            size={30}
            color={Colors[colorScheme ?? "light"].gIconDefault}
            style={{ padding: 5, opacity: 1 }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  quizContainer: { minHeight: "30%", flexDirection: "row", alignItems: "center", justifyContent: "center" },
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
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  backButton: { flexDirection: "row", paddingVertical: 4, paddingHorizontal: 12, borderRadius: 10, alignItems: "center" },
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
