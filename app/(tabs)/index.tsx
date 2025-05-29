import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import HomePageContent from "../HomePageContent";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <HomePageContent></HomePageContent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
