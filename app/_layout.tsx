import { OnboardingProvider } from "@/context/OnboardingContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    "ZonaPro-Bold": require("@/assets/fonts/ZonaPro-Bold.otf"),
    "ZonaPro-Light": require("@/assets/fonts/ZonaPro-ExtraLight.otf"),
    Manrope: require("@/assets/fonts/Manrope-VariableFont_wght.ttf"),
  });

  if (loaded || error) {
    SplashScreen.hideAsync();
  }
  return (
    <>
      <StatusBar hidden />
      <OnboardingProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </OnboardingProvider>
    </>
  );
}
