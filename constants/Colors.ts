/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#151718",
    primary: "#4E008E",
    secondary: "#A7C4A0",
    background: "#FAF9F6",
    tint: tintColorLight,
    icon: "#C5F4E0",
    tabIconDefault: "#C5F4E0",
    tabIconSelected: tintColorLight,
    gray: "#F1EBED",
    textInverse: "#FAF9F6",
    whiteAllAround: "#FAF9F6",
    danger: "#B00020",
    link: "#0000EE",
  },
  dark: {
    text: "#FAF9F6",
    primary: "#705685",
    secondary: "#A7C4A0",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    gray: "#8F8389",
    textInverse: "#151718",
    whiteAllAround: "#FAF9F6",
    danger: "#CF6679",
    link: "#0000EE",
  },
};
