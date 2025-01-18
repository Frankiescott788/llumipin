import {ReactElement} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, StyleSheet, Text, TextInput, View} from "react-native";
import { User } from "iconsax-react-native";

const Logo = require("@/assets/images/yumserve.png");

export default function Signup(): ReactElement {
    return (
        <SafeAreaView className={"flex-1 bg-white pt-[50]"}>
            <View>
                <View className={"flex-row justify-center py-5"}>
                    <Image source={Logo} className={"h-[40] w-[200]"}/>
                </View>
                <View>
                    <Text className={"text-center text-4xl"}
                        style={[
                            styles.poppinsMedium
                        ]}
                    >Sign up for free</Text>
                    <Text className={"text-center text-[100] px-10"}
                          style={[
                              styles.poppinsMedium
                          ]}
                    >
                        Sign up to book tables, explore restaurants, and enjoy dining experiences.
                    </Text>
                </View>
                <View className={"px-5"}>
                    <View>
                       <Text>Username</Text>
                        <View>
                            <View className={"flex-row bg-[#F2F3F5] px-3 py-4"}>
                                <View style={{ marginTop : 5 }}>
                                    <User size={28} color={"#d1d5db"} />

                                </View>
                                <TextInput placeholder={"Enter your username"}
                                           className={"text-lg "}
                                           placeholderTextColor={"#d1d5db"}
                                           style={[
                                               styles.poppinsRegular,
                                               {
                                                   lineHeight : 30
                                               }
                                           ]}
                                          />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poppinsRegular : {

            fontFamily : "poppinsRegular"

    },
    poppinsMedium : {
        fontFamily : "poppinsMedium"
    }
})