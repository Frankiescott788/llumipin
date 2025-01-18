import {ReactElement} from "react";
import {Stack} from "expo-router";

export default function OnboardingLayout() : ReactElement {
    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name={"index"}/>
        </Stack>
    )
}