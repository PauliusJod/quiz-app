import { MMKV } from "react-native-mmkv";
import { emptyUserSurveyData, UserSurveyData } from "../utils/types";

export const storage = new MMKV();

export const setItem = (key: string, value: string) => storage.set(key, value);
export const getItem = (key: string): string | undefined => storage.getString(key);
export const removeItem = (key: string) => storage.delete(key);

export const saveUserSurveyDataMMKV = (data: UserSurveyData) => {
  storage.set("userSurveyData", JSON.stringify(data));
};

export const getUserSurveyDataMMKV = (): UserSurveyData | null => {
  const raw = storage.getString("userSurveyData");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed.interests)) {
      parsed.interests = [];
    }
    return parsed;
  } catch (err) {
    console.error(" Error parsing survey data:", err);
    return null;
  }
};

export const clearMMKV = () => {
  storage.clearAll();
  saveUserSurveyDataMMKV(emptyUserSurveyData);
};
