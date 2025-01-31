import {ReactElement} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, View} from "react-native";

export default function Saved(): ReactElement {
    return (
        <SafeAreaView>
            <View>
                <Text>Saved</Text>
            </View>
        </SafeAreaView>
    )
}