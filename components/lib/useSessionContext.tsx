import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthSession } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { UserSurveyData, emptyUserSurveyData } from "../utils/types";
import { clearMMKV, getUserSurveyDataMMKV, saveUserSurveyDataMMKV } from "./storage";

interface SessionContextType {
  sessionValue: AuthSession | null;
  setSessionValue: (value: AuthSession | null) => void;

  userPersonalizationValue: UserSurveyData | null;
  setUserPersonalizationValue: (value: UserSurveyData) => void;

  isPersonalizationSynced: boolean;
  setPersonalizationSynced: (value: boolean) => void;

  loadUserPersonalization: () => Promise<void>;
  onUserLogoutSession: () => void;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context == null) {
    throw new Error("useSessionContext must be used within a SessionContext.Provider");
  }
  return context;
}

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const [sessionValue, setSessionValue] = useState<AuthSession | null>(null);
  const [userPersonalizationValue, setUserPersonalizationValue] = useState<UserSurveyData | null>(null);
  const [isPersonalizationSynced, setPersonalizationSynced] = useState<boolean>(false);

  const loadUserPersonalization = async () => {
    try {
      const { data, error } = await supabase.from("user_personalization").select("*").limit(1).maybeSingle();

      if (error) throw error;

      if (data) {
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
        return;
      }
    } catch (err) {
      const local = getUserSurveyDataMMKV();
      if (local) {
        setUserPersonalizationValue(local);
      } else {
        setUserPersonalizationValue(emptyUserSurveyData);
        saveUserSurveyDataMMKV(emptyUserSurveyData);
      }
      setPersonalizationSynced(false);
    } finally {
      console.log("LOADING ... loadUserPersonalization FINALLY");
    }
  };

  const onUserLogoutSession = () => {
    clearMMKV();
    setUserPersonalizationValue(emptyUserSurveyData);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSessionValue(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSessionValue(session);
    });

    loadUserPersonalization();
  }, []);

  return (
    <SessionContext.Provider
      value={{
        sessionValue,
        setSessionValue,
        userPersonalizationValue,
        setUserPersonalizationValue,
        loadUserPersonalization,
        onUserLogoutSession,
        isPersonalizationSynced,
        setPersonalizationSynced,
      }}>
      {children}
    </SessionContext.Provider>
  );
};
