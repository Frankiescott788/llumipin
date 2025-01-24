import {ReactElement} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";

export default function Profile(): ReactElement {
    return (
        <SafeAreaView>
            <View>
                <Text>Profile</Text>
            </View>
        </SafeAreaView>
    )
}