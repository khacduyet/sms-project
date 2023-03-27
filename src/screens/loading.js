import { Image, Text, View } from "react-native";


export default function Loading() {

    return <View style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <Image source={require("../../src/resources/loading.gif")} style={{ width: 300, height: 150 }} resizeMode='stretch' />
        <Text>Đang tải...</Text>
    </View>
}