import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { useColorScheme } from "nativewind";
import colors from "tailwindcss/colors";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Text, View } from "@/components/[default_components]/Themed";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Switch } from "@/components/ui/switch";
import { Pressable } from "@/components/ui/pressable";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import { useSessionContext } from "@/components/lib/useSessionContext";
import { supabase } from "@/components/lib/supabase";
import * as Animatable from "react-native-animatable";

// SETTINGS
export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [showLoginOptions, setShowLoginOptions] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const { sessionValue } = useSessionContext();
  useEffect(() => {
    console.log(!sessionValue);
    if (!sessionValue) {
      setShowLoginOptions(true);
    } else {
      setShowLoginOptions(false);
    }
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <Box className='h-full'>
        <VStack
          space='md'
          reversed={false}>
          <Divider
            className='my-0.5'
            label='Account'
          />
          <Pressable
            onPress={() => setShowLoginOptions((prev) => !prev)}
            style={[styles.viewContainer, { backgroundColor: Colors[colorScheme ?? "light"].boxbackground }]}>
            {!sessionValue ? (
              // Session OFF
              <Box style={[styles.boxStyle]}>
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
              </Box>
            ) : (
              // Session ON
              <Box style={[styles.boxStyle]}>
                <Text style={styles.title}>{sessionValue.user.user_metadata.name}</Text>
                <View style={[styles.socialsContainer]}>
                  <FontAwesome6
                    name='square-google-plus'
                    size={25}
                    color={Colors[colorScheme ?? "light"].gIconDefault}
                    style={{ padding: 5, opacity: 1 }}
                  />
                  {sessionValue.user.user_metadata.email_verified ? (
                    <FontAwesome
                      name='check-square'
                      size={25}
                      color={Colors[colorScheme ?? "light"].gIconDefault}
                      style={{ padding: 5, opacity: 1 }}
                    />
                  ) : (
                    <FontAwesome
                      name='check-square'
                      size={25}
                      color={Colors[colorScheme ?? "light"].text}
                      style={{ padding: 5, opacity: 1 }}
                    />
                  )}
                </View>
              </Box>
            )}
            <Box style={[styles.boxStyleSignInView, { display: !sessionValue ? "flex" : "none" }]}>
              <GoogleSignInButton />
            </Box>
            <Box style={[styles.boxStyle, { display: sessionValue ? "flex" : "none" }]}>
              {sessionValue && !loading ? (
                <Animatable.View
                  animation='bounceIn'
                  duration={3000}
                  delay={200}>
                  <Pressable
                    onPress={async () => {
                      setLoading(true);
                      try {
                        const { error } = await supabase.auth.signOut();
                        console.log("OUT: ", JSON.stringify(error));

                        throw new Error("sign out sucess!");
                      } catch (error: any) {
                        console.log("err: ", JSON.stringify(error));
                        setLoading(false);
                      }
                    }}>
                    <Text style={styles.text}>Log out</Text>
                  </Pressable>
                </Animatable.View>
              ) : (
                <></>
              )}
            </Box>
          </Pressable>

          <Divider
            className='my-0.5'
            label='App settings'
          />
          <View style={[styles.viewContainer, { backgroundColor: Colors[colorScheme ?? "light"].boxbackground }]}>
            <Box style={styles.boxStyle}>
              <Text style={styles.title}>Dark Mode</Text>
              <Switch
                size='md'
                value={colorScheme === "dark" ? true : false}
                isDisabled={false}
                trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
                thumbColor={colors.neutral[50]}
                ios_backgroundColor={colors.neutral[300]}
                onValueChange={() => {
                  setColorScheme(colorScheme === "light" ? "dark" : "light");
                }}
              />
            </Box>
            <Box style={styles.boxStyle}>
              <Text style={styles.title}>Notifications</Text>
              <Switch
                size='md'
                isDisabled={false}
                trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
                thumbColor={colors.neutral[50]}
                ios_backgroundColor={colors.neutral[300]}
                onValueChange={() => {
                  // setColorScheme(colorScheme === "light" ? "dark" : "light");
                }}
              />
            </Box>
            <Box style={styles.boxStyle}>
              <Text style={styles.title}>Sounds</Text>
              <Switch
                size='md'
                isDisabled={false}
                trackColor={{ false: colors.neutral[300], true: colors.neutral[600] }}
                thumbColor={colors.neutral[50]}
                ios_backgroundColor={colors.neutral[300]}
                onValueChange={() => {
                  // setColorScheme(colorScheme === "light" ? "dark" : "light");
                }}
              />
            </Box>
          </View>
          <Divider
            className='my-0.5'
            label='Information'
          />
          <View style={[styles.viewContainer, { backgroundColor: Colors[colorScheme ?? "light"].boxbackground }]}>
            <Box style={styles.boxStyle}>
              <Text style={styles.title}>Terms of Service</Text>
            </Box>
            <Box style={styles.boxStyle}>
              <Text style={styles.title}>Privacy Policy</Text>
            </Box>
            <Box style={styles.boxStyle}>
              <Text style={styles.title}>About</Text>
            </Box>
          </View>
        </VStack>
      </Box>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto",
    paddingTop: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
  },
  viewContainer: {
    borderRadius: 20,
  },
  boxStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 70,
    paddingHorizontal: 20,
  },
  boxStyleSignInView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 70,
    paddingHorizontal: 20,
  },
  socialsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
});
