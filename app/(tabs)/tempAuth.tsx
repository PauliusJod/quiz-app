import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Card } from "@/components/ui/card";
import HomePageContent from "../HomePageContent";
import { useEffect, useState } from "react";
import { supabase } from "@/components/lib/supabase";
import { Session } from "@supabase/supabase-js";
import Auth from "@/components/auth/Auth";

export default function TemporaryAuthTab() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Auth />
      {session && session.user && <Text>{session.user.id}</Text>}
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
