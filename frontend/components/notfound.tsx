import { ReactElement } from "react";
import { Image, View } from "react-native";

const image = require("@/assets/images/nothingyet.webp")

export default function NotFound(): ReactElement {
    return (
        <View>
            <View>
                <Image source={image}/>
            </View>
        </View>
    )
}