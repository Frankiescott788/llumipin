import { AuthContext } from "@/context/authContext";
import { Redirect, Tabs } from "expo-router";
import { ReactElement, useContext } from "react";
import { Text } from "react-native";
import {
    Bookmark02Icon,
    Bookmark02IconFilled,
    Home02Icon,
    Home02IconFilled,
    Search01Icon,
    Search01IconFilled
} from "@/assets/icons/icons";
import {Profile} from "iconsax-react-native";

export default function MainLayout(): ReactElement {

    const { isAuthenticated, isLoading } = useContext(AuthContext);

    if(isLoading) {
        return <Text>Loading...</Text>
    }

    // if(!isAuthenticated) {
    //     return <Redirect href={"/(onboarding)"}/>
    // }

    return (
        <Tabs screenOptions={{ headerShown: false, tabBarStyle: { borderWidth: 0, borderColor: "transparent", shadowColor : "white" , height : 60, paddingTop : 10} }}>
            <Tabs.Screen name="index" options={{
                tabBarIcon : ({focused}) => (
                    focused ? <Home02IconFilled height={32} width={32} color={"#19AFFF"} /> :
                    <Home02Icon height={30} width={30} color={"#d1d5db"} />
                ),
                tabBarLabel : () => null
            }}/>
            <Tabs.Screen name="search" options={{
                tabBarIcon : ({focused}) => (
                    focused ? <Search01IconFilled height={32} width={32} color={"#19AFFF"} /> :
                        <Search01Icon height={32} width={32} color={"#d1d5db"} />
                ),
                tabBarLabel : () => null
            }}/>
            <Tabs.Screen name="saved" options={{
                tabBarIcon : ({focused}) => (
                    focused ? <Bookmark02IconFilled height={32} width={32} color={"#19AFFF"} /> :
                        <Bookmark02Icon height={32} width={32} color={"#d1d5db"} />
                ),
                tabBarLabel : () => null
            }}/>
            <Tabs.Screen name="profile" options={{
                tabBarIcon : ({focused}) => (
                    focused ? <Profile size={32} color={"#19AFFF"} variant={"Bold"}/> :
                        <Profile size={32} color={"#d1d5db"} />
                ),
                tabBarLabel : () => null
            }}/>
        </Tabs>
    )
}