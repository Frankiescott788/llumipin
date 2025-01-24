import { ReactElement, useState } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { User } from "iconsax-react-native";
import { Call02Icon, LockPasswordIcon, Mail01Icon } from "@/assets/icons/icons";
import {useMutation} from "@tanstack/react-query";
import useAuth from "@/hooks/auth/useSignup";
import {Link, useRouter} from "expo-router";

const Logo = require("@/assets/images/yumserve.png");

export default function Signup(): ReactElement {

    const {
        setUsername,
        setEmail,
        setPhone,
        setPassword,
        isFocused,
        setIsFocused,
        emailIsFocused,
        setEmailIsFocused,
        phoneIsFocused,
        setPhoneIsFocused,
        passwordIsFocused,
        setPasswordIsFocused,
        fieldErrors,
        mutateSignup,
        isLoading
     } = useAuth();


    

    return (
        <SafeAreaView className={"flex-1 bg-white"}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="mt-[30]">
                        <View className={"flex-row justify-center py-5"}>
                            <Image source={Logo} className={"h-[40] w-[200]"} />
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
                        <View className={"px-5 flex-col gap-5 mt-10"}>
                            <View>
                                <Text className={"text-gray-400 px-[5px]"}
                                    style={[styles.poppinsMedium]}
                                >Username</Text>
                                <View>
                                    <View className={`flex-row bg-[#F2F3F5] px-3 rounded-xl py-2 ${isFocused ? "border-2 border-primary" : ""} ${fieldErrors.username ? "border-2 border-red-500" : ""}`}>
                                        <View style={{ marginTop: 10 }}>
                                            <User size={25} color={"#d1d5db"} />
                                        </View>
                                        <TextInput placeholder={"Enter your username"}
                                                    className={"text-lg w-full"}
                                                    placeholderTextColor={"#d1d5db"}
                                                    style={[
                                                        styles.poppinsRegular,
                                                        {
                                                            lineHeight: 30
                                                        }
                                                    ]}
                                                    onFocus={() => setIsFocused(true)}
                                                    onBlur={() => setIsFocused(false)}
                                                    onChangeText={e => setUsername(e.trim())}

                                        />
                                    </View>
                                </View>
                                {fieldErrors.username.length !== 0 && <Text className="text-sm px-2 text-red-500">{fieldErrors.username}</Text>}
                            </View>
                          
                            <View>
                                <Text className={"text-gray-400 px-[5px]"}
                                    style={[styles.poppinsMedium]}
                                >Email</Text>
                                <View>
                                    <View className={`flex-row bg-[#F2F3F5] px-3 rounded-xl py-2 w-full ${emailIsFocused ? "border-2 border-primary" : ""} ${fieldErrors.email ? "border-2 border-red-500" : ""}`}>
                                        <View style={{ marginTop: 8 }}>
                                            <Mail01Icon height={30} width={30} color={"#d1d5db"} />
                                        </View>
                                        <TextInput placeholder={"Enter your email"}
                                                    className={"text-lg w-full"}
                                                    placeholderTextColor={"#d1d5db"}
                                                    style={[
                                                        styles.poppinsRegular,
                                                        {
                                                            lineHeight: 30
                                                        }
                                                    ]}
                                                    onFocus={() => setEmailIsFocused(true)}
                                                    onBlur={() => setEmailIsFocused(false)}
                                                    onChangeText={e => setEmail(e.trim())}
                                        />
                                    </View>
                                </View>
                                {fieldErrors.email.length !== 0 && <Text className="text-sm px-2 text-red-500">{fieldErrors.email}</Text>}
                            </View>
                            <View>
                                <Text className={"text-gray-400 px-[5px]"}
                                    style={[styles.poppinsMedium]}
                                >Phone</Text>
                                <View>
                                    <View className={`flex-row bg-[#F2F3F5] px-3 rounded-xl py-2 ${phoneIsFocused ? "border-2 border-primary" : ""} ${fieldErrors.phone ? "border-2 border-red-500" : ""}`}>
                                        <View style={{ marginTop: 8 }}>
                                            <Call02Icon height={30} width={30} color={"#d1d5db"} />
                                        </View>
                                        <TextInput placeholder={"Enter your phone"}
                                                    className={"text-lg w-full"}
                                                    placeholderTextColor={"#d1d5db"}
                                                    style={[
                                                        styles.poppinsRegular,
                                                        {
                                                            lineHeight: 30
                                                        }
                                                    ]}
                                                    onFocus={() => setPhoneIsFocused(true)}
                                                    onBlur={() => setPhoneIsFocused(false)}
                                                    onChangeText={e => setPhone(e.trim())}
                                        />
                                    </View>
                                </View>
                                {fieldErrors.phone.length !== 0 && <Text className="text-sm px-2 text-red-500">{fieldErrors.phone}</Text>}
                            </View>
                            <View>
                                <Text className={"text-gray-400 px-[5px]"}
                                    style={[styles.poppinsMedium]}
                                >Password</Text>
                                <View>
                                    <View className={`flex-row bg-[#F2F3F5] px-3 rounded-xl py-2 ${passwordIsFocused ? "border-2 border-primary" : ""} ${fieldErrors.password ? "border-2 border-red-500" : ""}`}>
                                        <View style={{ marginTop: 5 }}>
                                            <LockPasswordIcon height={30} width={30} color={"#d1d5db"} />
                                        </View>
                                        <TextInput placeholder={"Enter your password"}
                                                    className={"text-lg w-full"}
                                                    placeholderTextColor={"#d1d5db"}
                                                    style={[
                                                        styles.poppinsRegular,
                                                        {
                                                            lineHeight: 30
                                                        }
                                                    ]}
                                                    onFocus={() => setPasswordIsFocused(true)}
                                                    onBlur={() => setPasswordIsFocused(false)}
                                                    onChangeText={e => setPassword(e.trim())}

                                        />

                                    </View>
                                    {fieldErrors.password.length !== 0 && <Text className="text-sm px-2 text-red-500">{fieldErrors.password}</Text>}
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity className={"bg-primary py-[24] rounded-xl"}
                                    onPress={() => mutateSignup()}
                                    disabled={isLoading}
                                >
                                    <Text className={"text-center text-white"}
                                        style={[
                                            styles.poppinsMedium
                                        ]}
                                    >{isLoading ? "Signing up..." : "Sign up"}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <Text className={"text-center py-5 text-gray-400"}
                                style={[
                                    styles.poppinsMedium
                                ]}
                            >Already have an account? <Text className={"text-primary"}><Link href={"/(onboarding)"}>Sign in</Link></Text></Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: "poppinsRegular"
    },
    poppinsMedium: {
        fontFamily: "poppinsMedium"
    }
})