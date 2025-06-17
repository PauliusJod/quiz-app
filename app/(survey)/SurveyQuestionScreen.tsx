import { StyleSheet, TouchableOpacity, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { questions } from "@/components/utils/survey";
import { getUserSurveyDataMMKV, saveUserSurveyDataMMKV } from "@/components/lib/storage";
import { UserSurveyData } from "@/components/utils/types";
export default function SurveyQuestionScreen() {
  const { step } = useLocalSearchParams();
  const stepIndex = parseInt(step as string) || 0;
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const bg_color = Colors[colorScheme ?? "light"].boxbackground;
  const text_color = Colors[colorScheme ?? "light"].text;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const question = questions[stepIndex];
  const toggleOption = (option: string) => {
    if (question.multiple) {
      setSelectedOptions((prev) => (prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]));
    } else {
      setSelectedOptions([option]);
    }
  };
  const goToNext = () => {
    if (!selectedOptions.length) return;

    const data = getUserSurveyDataMMKV();
    if (data === null) return;
    if (question.type === "interests") {
      data["interests"] = selectedOptions;
    } else {
      data[question.type as Exclude<keyof UserSurveyData, "interests">] = selectedOptions[0];
    }

    saveUserSurveyDataMMKV(data);
    if (stepIndex < questions.length - 1) {
      router.push(`/(survey)/SurveyQuestionScreen?step=${stepIndex + 1}`);
    } else {
      router.push("/(survey)/SurveyEndScreen");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bg_color }]}>
      <Text style={[styles.title, { color: text_color }]}>{question.q}</Text>

      <FlatList
        style={{ maxHeight: "45%", width: "90%" }}
        data={question.ans}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const isSelected = selectedOptions.includes(item);
          return (
            <TouchableOpacity
              style={[styles.option, isSelected && styles.optionSelected]}
              onPress={() => toggleOption(item)}>
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected, { color: text_color }]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingVertical: 20, paddingHorizontal: 10 }}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: bg_color }]}
        onPress={goToNext}>
        <Text style={[styles.buttonText, { color: text_color }]}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  text: {
    fontSize: 14,
  },
  list: { flex: 1, justifyContent: "center" },
  option: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  optionSelected: {
    borderColor: "#3498db",
    backgroundColor: "#ecf6fd",
  },
  optionText: {
    fontSize: 16,
    // color: "#2d3436",
  },
  optionTextSelected: {
    color: "#2980b9",
    fontWeight: "600",
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
