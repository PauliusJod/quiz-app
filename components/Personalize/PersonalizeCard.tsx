import { Text } from "../ui/text";
import { Card } from "../ui/card";
import { VStack } from "../ui/vstack";
import { Heading } from "../ui/heading";
import { Center } from "../ui/center";
import { HStack } from "../ui/hstack";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Progress, ProgressFilledTrack } from "../ui/progress";
import Colors from "@/constants/Colors";
import { useColorScheme } from "nativewind";
import { StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useSessionContext } from "../lib/useSessionContext";
import { View } from "../[default_components]/Themed";
import tinycolor from "tinycolor2";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Divider } from "../ui/divider";
import UserExperienceStatistics from "./UserExperienceStatistics";
import { emptyUserSurveyData } from "../utils/types";
import SurveyStateBadge from "../utils/SurveyStateBadge";
import { Alert, AlertIcon, AlertText } from "../ui/alert";
import { InfoIcon } from "../ui/icon";

export default function PersonalizeCard() {
  const router = useRouter();
  const { colorScheme } = useColorScheme();
  const { sessionValue, userPersonalizationValue, isPersonalizationSynced } = useSessionContext();
  const bg_color = Colors[colorScheme ?? "light"].background;
  const box_color = Colors[colorScheme ?? "light"].boxbackground;
  const text_color = Colors[colorScheme ?? "light"].text;
  const test_bg_color = Colors[colorScheme ?? "light"].overImageBackground;
  const lighterColor = (value: any) => {
    return colorScheme ?? "light" ? tinycolor(value).lighten(20).toString() : tinycolor(value).darken(20).toString();
  }; // 20% lighter

  const isSurveyComplete = userPersonalizationValue
    ? Object.entries(userPersonalizationValue).every(([key, value]) => {
        if (key === "interests") {
          return Array.isArray(value) && value.length > 0;
        }
        return typeof value === "string" && value.trim().length > 0;
      })
    : false;

  const incompleteCount = userPersonalizationValue
    ? Object.entries(userPersonalizationValue).filter(([key, value]) => {
        if (key === "interests") {
          return !Array.isArray(value) || value.length === 0;
        }
        return !(typeof value === "string" && value.trim().length > 0);
      }).length
    : Object.keys(emptyUserSurveyData).length;

  return (
    <Card
      size='md'
      variant='elevated'
      className='m-4 p-4 rounded-2xl'
      style={{ backgroundColor: box_color }}>
      <VStack
        space='md'
        style={{ alignItems: "center" }}>
        <Heading
          size='lg'
          className='text-center'>
          Personal experience
        </Heading>
        <Center className='w-full'>
          <Text>{sessionValue?.user.user_metadata.name}</Text>
          <HStack
            style={{ justifyContent: "center", alignItems: "center" }}
            className='w-full mb-2'>
            <FontAwesome
              name='star-half-empty'
              size={20}
              color='#d97706'
            />
            <Text
              size='lg'
              className='px-2'>
              15/75
            </Text>
          </HStack>
          {/* TODO */}
          <Progress
            value={(15 / 75) * 100}
            size='sm'
            orientation='horizontal'
            className='w-full'
            style={{ backgroundColor: lighterColor(bg_color) }}>
            <ProgressFilledTrack />
          </Progress>
          {/* <UserActivityStatus></UserActivityStatus> */}
        </Center>
        <UserExperienceStatistics></UserExperienceStatistics>
        {!sessionValue ||
          (!isSurveyComplete && (
            <Divider
              className='my-0.5'
              label='Setup preferences'
            />
          ))}
        <View style={{ width: "100%", backgroundColor: "transparent", borderRadius: 20, alignItems: "center" }}>
          {!sessionValue && (
            <Pressable
              style={[styles.button2, { width: "70%", backgroundColor: lighterColor(box_color) }]}
              onPress={() => router.push("/modals/settings")}>
              <Text style={styles.title}>Connect with</Text>
              <View style={[styles.socialsContainer]}>
                <FontAwesome6
                  name='square-google-plus'
                  size={25}
                  color={Colors[colorScheme ?? "light"].gIconDefault}
                  style={{ padding: 5, opacity: 1 }}
                />
                <FontAwesome
                  name='facebook-square'
                  size={25}
                  color={Colors[colorScheme ?? "light"].fbIconDefault}
                  style={{ padding: 5, opacity: 1 }}
                />
              </View>
            </Pressable>
          )}
          {isSurveyComplete ? (
            // Finished
            <View style={{ backgroundColor: "transparent" }}>
              <SurveyStateBadge
                incompleteCount={incompleteCount}
                isComplete={isSurveyComplete}
                isSynced={isPersonalizationSynced}
              />
              {/* Integration Testing purpose only */}
              {/* <Pressable
                onPress={() => router.push("/(survey)/SurveyWelcomeScreen")}
                style={[styles.button, { backgroundColor: test_bg_color, shadowColor: test_bg_color }]}>
                <Text style={[styles.buttonText, { color: text_color }]}>Nothing..</Text>
              </Pressable>
              <Text>end</Text>
              <Pressable
                onPress={() => router.push("/(survey)/SurveyEndScreen")}
                style={[styles.button, { backgroundColor: test_bg_color, shadowColor: test_bg_color }]}>
                <Text style={[styles.buttonText, { color: text_color }]}>SurveyEndScreen..</Text>
              </Pressable> */}
            </View>
          ) : (
            // Started - not finished
            <View style={{ width: "100%", backgroundColor: "transparent" }}>
              {incompleteCount >= 1 && incompleteCount < 7 ? (
                <Pressable
                  onPress={() => router.push("/(survey)/SurveyWelcomeScreen")}
                  style={[styles.button, { alignItems: "center", backgroundColor: lighterColor(box_color), marginHorizontal: 10 }]}>
                  <SurveyStateBadge
                    incompleteCount={incompleteCount}
                    isComplete={isSurveyComplete}
                    isSynced={isPersonalizationSynced}
                  />
                  <Text>{JSON.stringify(isSurveyComplete)}</Text>
                  <HStack
                    style={{ justifyContent: "space-between", alignItems: "center" }}
                    className='w-full mb-2'>
                    <Progress
                      value={((7 - incompleteCount) / 7) * 100}
                      size='sm'
                      orientation='horizontal'
                      className='w-3/4'
                      style={{ backgroundColor: lighterColor(bg_color) }}>
                      <ProgressFilledTrack />
                    </Progress>
                    <FontAwesome
                      name='star-half-empty'
                      size={20}
                      color='#d97706'
                    />
                    <Text
                      size='lg'
                      className='px-2'>
                      {7 - incompleteCount}/7
                    </Text>
                  </HStack>
                  <Text style={[styles.buttonText, { color: text_color }]}>Finish survey</Text>
                </Pressable>
              ) : (
                // Not started
                <View style={{ width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "transparent" }}>
                  <SurveyStateBadge
                    incompleteCount={incompleteCount}
                    isComplete={isSurveyComplete}
                    isSynced={isPersonalizationSynced}
                  />
                  <Pressable
                    onPress={() => router.push("/(survey)/SurveyWelcomeScreen")}
                    style={[styles.button, { backgroundColor: test_bg_color, shadowColor: test_bg_color }]}>
                    <Text style={[styles.buttonText, { color: text_color }]}>Start Survey</Text>
                  </Pressable>
                </View>
              )}
            </View>
          )}
        </View>
      </VStack>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  socialsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  shadow: {
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginVertical: 12,
    borderRadius: 12,
    justifyContent: "center",
  },
  button2: {
    marginTop: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
