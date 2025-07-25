import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/[default_components]/useColorScheme";
import { useClientOnlyValue } from "@/components/[default_components]/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>["name"]; color: string }) {
  return (
    <FontAwesome
      size={28}
      style={{ marginBottom: -3 }}
      {...props}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon
              name='home'
              color={color}
            />
          ),
          headerRight: () => (
            <Link
              href='/modals/settings'
              asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='gears'
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='categoriesScreen'
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <FontAwesome5
              name='landmark'
              size={25}
              color={color}
            />
          ),
          headerRight: () => (
            <Link
              href='/modals/modal'
              asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name='info-circle'
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
