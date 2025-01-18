import {ReactElement} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";

export default function StartScreen(): ReactElement {

    const router = useRouter();

    return (
        <SafeAreaView className={"flex-1 bg-white pt-[40]"}>
            <ScrollView>
            <View>
                <View>
                    <Image source={require("@/assets/images/starthero.png")} className={"h-[36rem] w-full"}/>
                </View>
                <View className={"px-5"}>
                    <View>
                        <Text className={"text-4xl"} style={[
                            styles.poppinsMedium,
                        ]}>Find your <Text className={"text-primary"}>table</Text> for any <Text className={"text-primary"}>occasion.</Text></Text>
                        <Text className={"text-gray-400"}>Book your favourite table, discover new cuisines, and make dining effortless.</Text>
                    </View>
                    <View className={"py-4 mt-3 "} >
                        <TouchableOpacity className={"bg-primary py-8 rounded-xl"} onPress={() => router.push("/(onboarding)/signup")}>
                            <Text className={"text-center text-white "}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poppinsMedium : {
        fontFamily : "poppinsMedium"
    }
})