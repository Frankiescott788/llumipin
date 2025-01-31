import {ReactElement, useContext} from "react";
import {Redirect, Stack} from "expo-router";
import { AuthContext } from "@/context/authContext";
import { Text } from "react-native";

export default function OnboardingLayout() : ReactElement {

    const { isLoading, isAuthenticated } = useContext(AuthContext);

    if(isLoading) {
        return <Text>Loading...</Text>
    };

    if(isAuthenticated) {
        return <Redirect href={"/(main)"}/>
    }

    return (
        <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name={"index"}/>
            <Stack.Screen name="signup" />
        </Stack>
    )
}