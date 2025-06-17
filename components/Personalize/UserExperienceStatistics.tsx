import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import Feather from "@expo/vector-icons/Feather";
import { progressData } from "../utils/mockData";

export default function UserExperienceStatistics() {
  const [isProgressCardOpen, setProgressCardOpen] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={styles.title}>Your Quizzes Progress</Text>
        {isProgressCardOpen ? (
          <Pressable
            style={styles.cardTopButton}
            onPress={() => setProgressCardOpen(false)}>
            <Feather
              name='chevrons-up'
              size={24}
              color='black'
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.cardTopButton}
            onPress={() => setProgressCardOpen(true)}>
            <Feather
              name='chevrons-down'
              size={24}
              color='black'
            />
          </Pressable>
        )}
      </View>
      {isProgressCardOpen ? <Text style={styles.description}>Track how far you've come in each category</Text> : <></>}
      {isProgressCardOpen ? (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}>
          {progressData.map((item, index) => (
            <View
              key={index}
              style={styles.progressItem}>
              <Text style={styles.label}>{item.label}</Text>
              <Progress
                value={item.value}
                size='xs'
                style={styles.progressBar}>
                <ProgressFilledTrack />
              </Progress>
            </View>
          ))}
        </ScrollView>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minWidth: "90%",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 16,
    backgroundColor: "#f9fafb",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    zIndex: 10,
  },
  scrollArea: { maxHeight: 200 },
  scrollContent: { paddingBottom: 0 },
  title: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
    color: "#111827",
  },
  description: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  progressItem: { marginBottom: 16 },
  label: { fontSize: 12, marginBottom: 4, color: "#374151" },
  progressBar: { borderRadius: 12, backgroundColor: "#e5e7eb" },
  cardTopButton: {
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderColor: "#6b7280",
    borderWidth: 1,
    boxShadow: "0px 0px 6px rgba(107, 114, 128, 0.7)",
  },
  cardBottom: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
  },
});
