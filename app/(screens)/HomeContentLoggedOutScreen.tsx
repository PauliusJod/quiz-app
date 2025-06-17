import { StyleSheet } from "react-native";
import { Text, View } from "@/components/[default_components]/Themed";
import { useColorScheme } from "nativewind";
import QuizPreviewCard from "@/components/Quiz/QuizPreviewCard";
import { categoriesMockData } from "@/components/utils/mockData";
import PersonalizeCard from "@/components/Personalize/PersonalizeCard";

export default function HomeContentLoggedOutScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  return (
    <View style={[styles.container]}>
      <View style={{ paddingVertical: 20 }}>
        <Text style={styles.title}>NOT - Personalized</Text>
        <PersonalizeCard></PersonalizeCard>
        {categoriesMockData.map((category, index) => (
          <QuizPreviewCard
            key={index}
            label={category.label}
            type={category.type}></QuizPreviewCard>
        ))}
      </View>
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
