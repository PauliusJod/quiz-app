import { AuthSession } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

interface SessionContextType {
  sessionValue: AuthSession | null;
  setSessionValue: (value: AuthSession) => void;
}
export const SessionContext = createContext<SessionContextType | null>(null);

export function useSessionContext() {
  const sessionValue = useContext(SessionContext);
  if (sessionValue == null) {
    throw new Error("useSessionContext must be used within a SessionContext.Provider");
  }
  return sessionValue;
}
