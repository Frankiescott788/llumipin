import {ReactElement, useEffect, useState} from "react";
import {
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Notification01Icon, StarFill, Tag} from "@/assets/icons/icons";
import {Clock, Location, SearchNormal} from "iconsax-react-native";
import {LinearGradient} from "expo-linear-gradient";
import useFetch from "@/hooks/useFetch";
import {RestaurantInterface} from "@/interfaces/interfaces";

export default function Home(): ReactElement {
    const {isLoading, error, data} = useFetch();

    const cusines = Array.from(
        new Set(data?.data.flatMap((res: RestaurantInterface) => res.cuisine))
    );

    const [categories, setCategories] = useState<string>("all");

    const filterCategories = data?.data.filter((categ: RestaurantInterface) => {
        if (categories === "all") {
            return data?.data
        }
        return categ.cuisine.some((cuisine) =>
            cuisine.toUpperCase().includes(categories.toUpperCase())
        );
    });

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        console.log(error);
    }

    return (
        <SafeAreaView className={"flex-1 bg-white "}>
            <ScrollView>
                <View className={"w-full mt-8"}>
                    <View className={"flex-row w-full justify-between px-5"}>
                        <View>
                            <View className="flex-row ">
                                <View>
                                    <Location size={20} color="#9ca3af"/>
                                </View>
                                <Text
                                    style={[styles.poppinsMedium]}
                                    className={"text-gray-400"}
                                >
                                    Location
                                </Text>
                            </View>

                            <Text className={"text-3xl"} style={[styles.poppinsMedium]}>
                                Polokwane
                            </Text>
                        </View>
                        <View className="pt-[28]">
                            <Notification01Icon height={32} width={32} color={"#9ca3af"}/>
                        </View>
                    </View>
                    <View className="flex-row bg-gray-100 p-2 rounded-xl my-5 mx-5">
                        <View className="mt-[10px]">
                            <SearchNormal size={25} color="#9ca3af"/>
                        </View>
                        <TextInput
                            placeholder="Search"
                            className="text-[14px] w-full"
                            style={[styles.poppinsRegular, {lineHeight: 30}]}
                        />
                    </View>
                    <View className="">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{
                                flexDirection: "row",
                                gap: 10,
                                paddingInline: 20,
                            }}
                        >
                            <TouchableOpacity className={"bg-primary rounded-full px-10 pt-2"}>
                                <Text
                                    className="text-center text-white"
                                    style={[styles.poppinsRegular, {lineHeight: 28}]}
                                >
                                    All
                                </Text>
                            </TouchableOpacity>
                            {cusines.map((cusine, i) => (

                                <TouchableOpacity
                                    className={"bg-primary rounded-full px-3 py-1 text-sm"}
                                    key={i}
                                    onPress={() => setCategories(cusine as string)}
                                >
                                    <Text
                                        className="text-center text-white"
                                        style={[styles.poppinsRegular, {lineHeight: 28}]}
                                    >
                                        {cusine as string}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                    <View className="py-3 flex-row justify-between px-5">
                        <View>
                            <Text
                                style={[styles.poppinsMedium]}
                                className="text-gray-400 text-lg"
                            >
                                Recommendations
                            </Text>
                        </View>
                        <View>
                            <Text
                                style={[styles.poppinsMedium]}
                                className="text-gray-400 underline underline-offset-5 text-sm pt-1"
                            >
                                see more
                            </Text>
                        </View>
                    </View>
                    <ScrollView
                        contentContainerStyle={{
                            flexDirection: "row",
                            gap: 10,
                            paddingInline: 15,
                        }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {data?.data.length === 0 && (
                            <View>
                                <Text>No restaurants yet</Text>
                            </View>
                        )}
                        {data?.data.length !== 0 &&
                            filterCategories.slice(0, 5).map((res: RestaurantInterface) => (
                                <ImageBackground
                                    source={require("@/assets/images/placeholder.png")}
                                    className="w-[25rem] h-[20rem] relative"
                                    borderRadius={10}
                                    key={res._id}
                                >
                                    <View className="absolute bottom-0 right-0 left-0 ">
                                        <LinearGradient
                                            colors={["#00000000", "#00000099"]}
                                            style={{
                                                paddingTop: 30,
                                                paddingBottom: 20,
                                                paddingInline: 10,
                                                borderRadius: 10,
                                            }}
                                        >
                                            <View>
                                                <Text
                                                    className="text-white text-2xl "
                                                    style={[styles.poppinsMedium, {lineHeight: 30}]}
                                                >
                                                    {res.name}
                                                </Text>
                                                <View className="flex-row gap-3 p-1">
                                                    {res.cuisine.map((cusine, i) => (
                                                        <View key={i} className="flex-row gap-1">
                                                            <View>
                                                                <Tag height={15} width={15} color="white"/>
                                                            </View>
                                                            <Text
                                                                className="text-white mt-1"
                                                                style={[
                                                                    styles.poppinsMedium,
                                                                    {lineHeight: 15},
                                                                ]}
                                                            >
                                                                {cusine}
                                                            </Text>
                                                        </View>
                                                    ))}
                                                </View>

                                                <View className="flex-row gap-1">
                                                    <Location size={18} color="#19AFFF"/>
                                                    <Text
                                                        className="text-primary"
                                                        style={[styles.poppinsMedium]}
                                                    >
                                                        {res.address.street}, {res.address.city}
                                                    </Text>
                                                </View>
                                                <View className="flex-row gap-1 ">
                                                    <StarFill width={15} height={15} color="#FBBC05"/>
                                                    <StarFill width={15} height={15} color="#FBBC05"/>
                                                    <StarFill width={15} height={15} color="#FBBC05"/>
                                                    <StarFill width={15} height={15} color="#FBBC05"/>
                                                    <StarFill width={15} height={15} color="#FBBC05"/>
                                                </View>
                                            </View>
                                        </LinearGradient>
                                    </View>
                                </ImageBackground>
                            ))}
                    </ScrollView>
                    <View className="px-5 py-5">
                        <View className="flex-row justify-between pb-2">
                            <Text
                                className="text-lg text-gray-400"
                                style={[styles.poppinsMedium]}
                            >
                                Best for you
                            </Text>
                            <Text
                                className="text-gray-400 underline underline-offset-2"
                                style={[styles.poppinsRegular]}
                            >
                                See more
                            </Text>
                        </View>
                        <View className="flex-col gap-5">
                            {!isLoading &&
                                data?.data.slice(5, 10).map((res: RestaurantInterface) => (
                                    <View className="flex-row gap-2" key={res._id}>
                                        <View>
                                            <Image
                                                source={require("@/assets/images/placeholder2.png")}
                                                className="h-[8rem] w-[8rem]"
                                            />
                                        </View>
                                        <View>
                                            <Text
                                                className="text-xl text-gray-400 py-1"
                                                style={[styles.poppinsMedium]}
                                            >
                                                {res.name}
                                            </Text>
                                            <View className="flex-row ">
                                                <Location size={22} color="#19AFFF"/>
                                                <Text
                                                    className="text-primary"
                                                    style={[styles.poppinsMedium]}
                                                >
                                                    {res.address.street}, {res.address.city}
                                                </Text>
                                            </View>
                                            <View className="flex-row gap-1 py-1">
                                                <Clock size={18} color="#9ca3af"/>
                                                <Text
                                                    style={[styles.poppinsMedium]}
                                                    className="text-gray-400"
                                                >
                                                    {res.openingHours}
                                                </Text>
                                            </View>
                                            <View className="flex-row gap-1">
                                                <StarFill width={15} height={15} color="#FBBC05"/>
                                                <StarFill width={15} height={15} color="#FBBC05"/>
                                                <StarFill width={15} height={15} color="#FBBC05"/>
                                                <StarFill width={15} height={15} color="#FBBC05"/>
                                                <StarFill width={15} height={15} color="#FBBC05"/>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    poppinsRegular: {
        fontFamily: "poppinsRegular",
    },
    poppinsMedium: {
        fontFamily: "poppinsMedium",
    },
});
