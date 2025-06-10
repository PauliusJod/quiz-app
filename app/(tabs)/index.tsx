import { ScrollView, StyleSheet } from "react-native";
import HomeContentLoggedInScreen from "../screens/HomeContentLoggedInScreen";
import HomeContentLoggedOutScreen from "../screens/HomeContentLoggedOutScreen";
import { useSessionContext } from "@/components/lib/useSessionContext";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

export default function homeScreen() {
  const { sessionValue } = useSessionContext();
  const { colorScheme } = useColorScheme();
  const backgroundColor = Colors[colorScheme ?? "light"].background;
  return (
    <ScrollView style={[styles.container, { backgroundColor: backgroundColor }]}>
      {sessionValue && sessionValue.user ? <HomeContentLoggedInScreen></HomeContentLoggedInScreen> : <HomeContentLoggedOutScreen></HomeContentLoggedOutScreen>}
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
