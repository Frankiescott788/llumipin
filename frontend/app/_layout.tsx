import {ReactElement, useEffect} from "react";
import {Stack} from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import "@/global.css";
import {useFonts} from "expo-font";

export default function RootLayout() : ReactElement | null {

    const [loaded, error] = useFonts({
        poppinsRegular : require("@/assets/fonts/Poppins-Regular.ttf"),
        poppinsMedium : require("@/assets/fonts/Poppins-Medium.ttf"),
        poppinsSemiBold : require("@/assets/fonts/Poppins-SemiBold.ttf"),
        poppinsBold : require("@/assets/fonts/Poppins-Bold.ttf")
    })
    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }
    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name={"(onboarding)"}/>
        </Stack>
    )
}