import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Card } from "@/components/ui/card";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import QuizCard from "@/components/QuizCard";
import { Divider } from "@/components/ui/divider";

export default function HomePageContent() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View style={[styles.container]}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.title}>Personalized</Text>
        <QuizCard
          label='History'
          type='history'></QuizCard>
        <QuizCard
          label='Physics'
          type='physics'></QuizCard>
      </View>
      <Divider label='Try something new!' />
      <QuizCard
        label='Health'
        type='health'></QuizCard>
      <QuizCard
        label='Nature'
        type='nature'></QuizCard>
      <QuizCard
        label='Geography'
        type='geography'></QuizCard>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    left: 20,
    fontWeight: "500",
  },
  boxStyle: {
    // alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    paddingHorizontal: 20,
  },
});
