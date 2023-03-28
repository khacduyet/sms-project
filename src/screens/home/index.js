import { SafeAreaView } from "react-native-safe-area-context";
import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/actions/loginAction";


export default function HomePage({ navigation }) {
    const currentUser = useSelector((state) => state.currentUser);
    console.log("currentUser", currentUser);
    const dispatch = useDispatch();

    function showToast() {
        ToastAndroid.show(`Chào bạn ${currentUser.TenNhanVien}`, ToastAndroid.LONG);
    }

    useEffect(() => {
        dispatch(getCurrentUser())
        if (currentUser && currentUser.TenNhanVien) {
            showToast()
        }
    }, [currentUser.TenNhanVien])


    return <SafeAreaView>
        <TouchableOpacity style={{ width: 100, height: 40, borderWidth: 1, backgroundColor: "blue", justifyContent: "center", alignItems: "center", marginTop: 10 }}
            onPress={() => {
                navigation.navigate("Login")
            }}
        >
            <Text style={{ color: "#fff" }}>Quay lại</Text>
        </TouchableOpacity>
        <View style={{ width: "100%", height: "80%", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, }}>Xin chào {currentUser.TenNhanVien}!</Text>
        </View>
    </SafeAreaView>
}