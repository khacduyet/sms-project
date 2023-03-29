import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PersonalPage() {

    return <SafeAreaView>
        <View style={{ height: "100%", width: "100%", justifyContent: "center", alignItems: "center" }}>
            <Text>Cá nhân</Text>
        </View>
    </SafeAreaView>
}