import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Text, View } from "@/components/Themed";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Divider } from "@/components/ui/divider";
import { Switch } from "@/components/ui/switch";
import colors from "tailwindcss/colors";
import { useColorScheme } from "nativewind";
import Colors from "@/constants/Colors";
import { Pressable } from "@/components/ui/pressable";

// SETTINGS
export default function SettingsScreen() {
  const { colorScheme, setColorScheme } = useColorScheme();
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
            onPress={() => console.log("Hello")}
            style={[styles.viewContainer, { backgroundColor: Colors[colorScheme ?? "light"].boxbackground }]}>
            <Box style={[styles.boxStyle]}>
              <Text style={styles.title}>Connect with</Text>
              <View style={[styles.socialsContainer]}>
                <FontAwesome
                  name='google'
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
    // alignItems: "center",
    paddingTop: 10,
    padding: 10,
    // justifyContent: "center",
  },
  title: {
    fontSize: 18,
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
    // backgroundColor: "rgb(255, 233, 213)",
  },
  socialsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
});
