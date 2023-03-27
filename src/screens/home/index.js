import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";


export default function HomePage({ navigation }) {

    return <SafeAreaView>
        <TouchableOpacity style={{ width: 100, height: 40, borderWidth: 1, backgroundColor: "blue", justifyContent: "center", alignItems: "center", marginTop: 10 }}
            onPress={() => {
                navigation.navigate("Login")
            }}
        >
            <Text style={{ color: "#fff" }}>Quay lại</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", height: "80%", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, }}>Xin chào!</Text>
        </View>
    </SafeAreaView>
}