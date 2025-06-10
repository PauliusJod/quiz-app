import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Alert } from "react-native";
import { Text } from "@/components/[default_components]/Themed";

import * as Animatable from "react-native-animatable";
export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  GoogleSignin.configure({
    webClientId: "37091550234-82dq7u39ovuh2dncrl63shmt3tcpcs6b.apps.googleusercontent.com",
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <Animatable.View
      animation='bounceIn'
      duration={3000}
      delay={200}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={async () => {
          setLoading(true);
          try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const idToken = (userInfo.data as { idToken: string }).idToken;
            if (idToken) {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: idToken,
              });
              setLoading(false);
            } else {
              throw new Error("Google Signin failed!");
            }
          } catch (error: any) {
            setLoading(false);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
              console.log("---- SIGN_IN_CANCELLED");
              Alert.alert(error.message);
            } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log("---- IN_PROGRESS");
              Alert.alert(error.message);
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
              console.log("---- PLAY_SERVICES_NOT_AVAILABLE");
              Alert.alert(error.message);
            } else {
              Alert.alert(error.message);
            }
          }
        }}
      />
    </Animatable.View>
  );
}
