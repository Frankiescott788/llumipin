import { ReactElement, useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "@/global.css";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "@/context/authContext";
import ProfileSettings from '../app/ProfileSettings';
import SupportScreen from "../app/Support";
import  PrivacyPage from "../app/Privacy";


const queryClient = new QueryClient();

export default function RootLayout(): ReactElement | null {
  const [loaded, error] = useFonts({
    poppinsRegular: require("@/assets/fonts/Poppins-Regular.ttf"),
    poppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    poppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    poppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name={"(onboarding)"} />
          <Stack.Screen name="ProfileSettings" />
          <Stack.Screen name="SupportScreen" />
          <Stack.Screen name=" PrivacyPage" />
          <Stack.Screen name="(main)" />
        </Stack>
      </AuthProvider>
    </QueryClientProvider>
  );
}
