import { StyleSheet } from "react-native";
import { Text, View } from "@/components/[default_components]/Themed";
import { useColorScheme } from "nativewind";
import QuizPreviewCard from "@/components/Quiz/QuizPreviewCard";
import { Divider } from "@/components/ui/divider";
import { categoriesMockDataNotPersonalized, categoriesMockDataPersonalized } from "@/components/utils/mockData";

/*

TODO PERSONALIZED QUIZZES CHOICE -> same categories, but with some additional information

*/

export default function HomeContentLoggedInScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View style={[styles.container]}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.title}>Personalized</Text>
        {categoriesMockDataPersonalized.map((category, index) => (
          <QuizPreviewCard
            key={index}
            label={category.label}
            type={category.type}></QuizPreviewCard>
        ))}
      </View>
      <Divider label='Try something new!' />
      {categoriesMockDataNotPersonalized.map((category, index) => (
        <QuizPreviewCard
          key={index}
          label={category.label}
          type={category.type}></QuizPreviewCard>
      ))}
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
    justifyContent: "center",
    minHeight: 70,
    paddingHorizontal: 20,
  },
});
