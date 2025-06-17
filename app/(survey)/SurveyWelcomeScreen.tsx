import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";

export default function SurveyWelcomeScreen() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const bg_color = Colors[colorScheme ?? "light"].boxbackground;
  const text_color = Colors[colorScheme ?? "light"].text;

  return (
    <View style={[styles.container, { backgroundColor: bg_color }]}>
      <Text style={styles.title}>Welcome to the BK App Survey</Text>
      <Text style={styles.subtitle}>Help us personalize your journey. This will only take a minute!</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: bg_color, shadowColor: bg_color }]}
        onPress={() => router.push("/(survey)/SurveyQuestionScreen")}>
        <Text style={[styles.buttonText, { color: text_color }]}>Start Survey</Text>
      </TouchableOpacity>
      <Text style={styles.altText}>This survey includes only 7 basic questions.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
    color: "#2f3640",
  },
  altText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 12,
    color: "#718093",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#718093",
    marginBottom: 32,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
