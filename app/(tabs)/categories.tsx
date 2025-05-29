import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import QuizCard from "@/components/QuizCard";
import { Divider } from "@/components/ui/divider";
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

export default function CategoriesTabScreen() {
  return (
    <View style={styles.container}>
      {categoriesMockData.map((category, index) => (
        <QuizCard
          key={index}
          label={category.label}
          type={category.type}></QuizCard>
      ))}
    </View>
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
