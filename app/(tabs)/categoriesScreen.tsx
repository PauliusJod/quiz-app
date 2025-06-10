import { ScrollView, StyleSheet } from "react-native";
import QuizPreviewCard from "@/components/Quiz/QuizPreviewCard";
const categoriesMockData = [
  {
    label: "History",
    type: "history",
  },
  {
    label: "Physics",
    type: "physics",
  },
  {
    label: "Health",
    type: "health",
  },
  {
    label: "Nature",
    type: "nature",
  },
  {
    label: "Geography",
    type: "geography",
  },
];

export default function CategoriesScreen() {
  return (
    <ScrollView style={styles.container}>
      {categoriesMockData.map((category, index) => (
        <QuizPreviewCard
          key={index}
          label={category.label}
          type={category.type}></QuizPreviewCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
