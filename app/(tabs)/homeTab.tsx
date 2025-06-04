import { ScrollView, StyleSheet } from "react-native";
import HomePageContent from "../HomePageContent";
import { useSessionContext } from "@/components/lib/useSessionContext";
import { Text, View } from "@/components/Themed";

export default function HomeTabScreen() {
  const { sessionValue } = useSessionContext();
  return <ScrollView style={styles.container}>{sessionValue && sessionValue.user ? <HomePageContent></HomePageContent> : <Text style={styles.title}>Welcome!</Text>}</ScrollView>;
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
