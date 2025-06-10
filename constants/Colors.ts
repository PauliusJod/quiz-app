const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#fff",
    boxbackground: "rgba(124, 45, 18, 0.1)",
    tint: tintColorLight,
    overImageBackground: "rgb(52, 211, 153)",
    gIconDefault: "#047857",
    fbIconDefault: "#0369a1",
    themeIconsDefault: "#0c4a6e",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#fff",
    background: "#141414", // "#000"
    boxbackground: "rgba(8, 51, 68, 0.5)",
    tint: tintColorDark,
    overImageBackground: "rgb(8, 47, 73)",
    gIconDefault: "#10b981", // emerald
    fbIconDefault: "#0ea5e9", // sky
    themeIconsDefault: "#10b981",
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
  },
};
