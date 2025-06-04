import { ScrollView, StyleSheet } from "react-native";
import HomePageContent from "../HomePageContent";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <GoogleSignInButton />
      <HomePageContent></HomePageContent>
    </ScrollView>
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
