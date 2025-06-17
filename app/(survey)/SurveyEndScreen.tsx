import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserSurveyDataMMKV, saveUserSurveyDataMMKV } from "@/components/lib/storage";
import { useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useSessionContext } from "@/components/lib/useSessionContext";
import { fallbackImage, imageMap } from "@/components/utils/ImagesMap";
import { Spinner } from "@/components/ui/spinner";
import { supabase } from "@/components/lib/supabase";
import { UserSurveyData } from "@/components/utils/types";

const imageSource = imageMap["setupCompleted"] ?? fallbackImage;
export default function SurveyEndScreen() {
  const router = useRouter();
  const { sessionValue, userPersonalizationValue, setUserPersonalizationValue, setPersonalizationSynced } = useSessionContext();
  const { colorScheme } = useColorScheme();
  const [loading, setLoading] = useState<boolean>(false);
  const bg_color = Colors[colorScheme ?? "light"].boxbackground;
  const text_color = Colors[colorScheme ?? "light"].text;

  useEffect(() => {
    const insertUserSurveyData = async () => {
      setLoading(true);
      try {
        const userId = sessionValue?.user.id;
        if (!userId) throw new Error("User ID is undefined");
        const userSurveyData: UserSurveyData | null = getUserSurveyDataMMKV();
        if (!userSurveyData) throw new Error("Survey data not found in storage");
        const formattedSurveyData: UserSurveyData = {
          ...userSurveyData,
          interests: Array.isArray(userSurveyData.interests) ? userSurveyData.interests : [],
        };
        const { data, error } = await supabase
          .from("user_personalization")
          .upsert(
            [
              {
                user_id: userId,
                ...formattedSurveyData,
              },
            ],
            {
              onConflict: "user_id",
              ignoreDuplicates: false,
            }
          )
          .select("*")
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        const transformed: UserSurveyData = {
          age: data.age,
          difficulty: data.difficulty,
          frequency: data.frequency,
          gender: data.gender,
          interests: Array.isArray(data.interests) ? data.interests : [],
          modePreference: data.modePreference,
          timedPreference: data.timedPreference,
        };
        setUserPersonalizationValue(transformed);
        saveUserSurveyDataMMKV(transformed);
        setPersonalizationSynced(true);
      } catch (err) {
        setPersonalizationSynced(false);
        const local = getUserSurveyDataMMKV();
        if (local) {
          setUserPersonalizationValue(local);
        }
      } finally {
        setLoading(false);
      }
    };
    insertUserSurveyData();
  }, []);

  const userLoggedIn = sessionValue ? (
    <View style={styles.signInView}>
      <Text style={[styles.text, { color: "#718093" }]}>{sessionValue.user.user_metadata.name}</Text>
    </View>
  ) : (
    <View style={styles.signInView}>
      <Text style={[styles.text, { color: "#718093" }]}>We’ll save your preferences so they’re always with you</Text>
      <GoogleSignInButton />
    </View>
  );
  return (
    <View style={styles.container}>
      <Text>SurveyEndScreen</Text>
      <Image
        style={styles.stretch}
        source={imageSource}
      />
      <Text>{JSON.stringify(userPersonalizationValue)}</Text>
      <Text style={{ fontSize: 20, padding: 10 }}>Design needed</Text>
      {loading && (
        <Spinner
          size={50}
          color={text_color}
        />
      )}
      {userLoggedIn}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: bg_color, shadowColor: bg_color }]}
        onPress={() => router.push("/(tabs)")}>
        <Text style={[styles.buttonText, { color: text_color }]}>Home page</Text>
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
  text: {
    fontSize: 14,
    textAlign: "center",
    marginVertical: 12,
  },
  signInView: {
    padding: 12,
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
  stretch: {
    width: 100,
    height: 100,
    borderRadius: 99,
  },
});
