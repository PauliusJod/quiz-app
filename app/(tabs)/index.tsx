import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Card } from "@/components/ui/card";
import HomePageContent from "../HomePageContent";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text> */}
      {/* <Card className='p-5 rounded-lg max-w-[380px] m-3 bg-red-500'>
        <Text style={styles.title}>Tab One</Text>
        <Text style={styles.title}>Tab One</Text>
        <Text style={styles.title}>Tab One</Text>
        <Text style={styles.title}>Tab One</Text>
      </Card>
      */}
      <HomePageContent></HomePageContent>
      {/* <EditScreenInfo path='app/(tabs)/index.tsx' /> */}
    </View>
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
