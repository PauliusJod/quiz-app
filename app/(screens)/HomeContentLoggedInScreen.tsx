import { Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/[default_components]/Themed";
import { useColorScheme } from "nativewind";
import QuizPreviewCard from "@/components/Quiz/QuizPreviewCard";
import { Divider } from "@/components/ui/divider";
import { categoriesMockDataNotPersonalized, categoriesMockDataPersonalized } from "@/components/utils/mockData";
import PersonalizeCard from "@/components/Personalize/PersonalizeCard";
import { useRouter } from "expo-router";

/*

TODO PERSONALIZED QUIZZES CHOICE -> same categories, but with some additional information

*/

export default function HomeContentLoggedInScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const router = useRouter();
  return (
    <View style={[styles.container]}>
      <View style={{ paddingVertical: 20 }}>
        {/* Test purpose only! */}
        <Pressable
          onPress={() => router.push({ pathname: "/(screens)/QuizScreen", params: { quizCategory: "ddd", quizId: "123" } })}
          style={{ borderRadius: 20 }}>
          <Text>assaasasas1s</Text>
        </Pressable>
        <Text style={styles.title}>Personalized</Text>
        <PersonalizeCard></PersonalizeCard>
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
