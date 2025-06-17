import { AppState } from "react-native";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { UserPersonalization } from "../utils/types";

const supabaseUrl = "https://orfxyiftowccawsgqwqf.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9yZnh5aWZ0b3djY2F3c2dxd3FmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MzU2NDksImV4cCI6MjA2NDExMTY0OX0.9B1SwgZI8vKbn06S_zCvqglwdzLmRvau9F671lqnVMU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {},
  },
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const getUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
