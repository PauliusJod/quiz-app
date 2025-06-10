import { View, StyleSheet, Pressable } from "react-native";
import { Text } from "../ui/text";
import { Card } from "../ui/card";
import { Heading } from "../ui/heading";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { useQuizDataContext } from "../lib/useQuizDataContext";
import { useEffect, useState } from "react";
export default function QuizResultCard() {
  const { quizDataValue } = useQuizDataContext();
  const { colorScheme, setColorScheme } = useColorScheme();
  const [resultCount, setResultCount] = useState<number>(0);
  const correctCount = () => {
    if (!quizDataValue) return 0;
    const matchingCount = quizDataValue.filter((q) => Array.isArray(q.answers_t1) && q.answers_t1.every((a) => a.is_chosen === a.is_correct)).length;
    setResultCount(matchingCount);
    return matchingCount;
  };

  useEffect(() => {
    correctCount();
  }, []);
  if (!quizDataValue)
    return (
      <Card
        size='md'
        variant='elevated'
        className='m-4 p-4 rounded-2xl'>
        <Heading
          size='lg'
          className='text-center'>
          Failed to load
        </Heading>
      </Card>
    );
  return (
    <Card
      size='md'
      variant='elevated'
      className='m-4 p-4 rounded-2xl'>
      <VStack
        space='md'
        style={{ alignItems: "center" }}>
        <Heading
          size='lg'
          className='text-center'>
          🎉 Quiz Completed!
        </Heading>
        <Text
          size='md'
          className='text-center text-gray-600'>
          Here's how you did:
        </Text>
        <Center className='w-full'>
          <HStack
            style={{ justifyContent: "space-between", alignItems: "center" }}
            className='w-full mb-2 px-2'>
            {/* <HStack
              space='xs'
              style={{ alignItems: "center" }}>
              <Text size='md'></Text>
            </HStack> */}
            <HStack
              space='xs'
              style={{ alignItems: "center" }}>
              <Ionicons
                name='checkmark-circle'
                size={20}
                color='green'
              />
              <Text size='md'>
                {resultCount} / {quizDataValue.length} correct answers
              </Text>
            </HStack>
          </HStack>
          <Progress
            value={(resultCount / quizDataValue.length) * 100}
            size='md'
            orientation='horizontal'
            className='w-full'>
            <ProgressFilledTrack />
          </Progress>
        </Center>
        <Text
          size='sm'
          className='text-center text-gray-500 mt-2'>
          Great job! Review your answers or try again to improve your score.
          {/* MAKE PRESETS TO DISPLAY CUSTOM FEEDBACK */}
        </Text>

        {/* <Pressable
          onPress={() => console.log("axxx")}
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? "light"].boxbackground }]}>
          <Text>Inspect results</Text>
        </Pressable> */}
      </VStack>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
  },
  boxStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%", // make it stretch to parent container
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
