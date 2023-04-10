import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/actions/loginAction";
import { setLoading } from "../../redux/actions/loadingAction";
import HomeNavBar from "./navbar";
import { ToastMessage } from "../../common/components";


export default function HomePage({ navigation }) {
    const currentUser = useSelector((state) => state.currentUser);
    // console.log("currentUser", currentUser);
    const dispatch = useDispatch();

    function showToast() {
        ToastMessage(`Chào bạn ${currentUser.TenNhanVien}`)
    }

    useEffect(() => {
        dispatch(getCurrentUser())
        if (currentUser && currentUser.TenNhanVien) {
            showToast()
        }
    }, [currentUser.TenNhanVien])


    return <SafeAreaView>
        {/* <HomeNavBar currentUser={currentUser} /> */}
        <View style={{ width: "100%", height: "80%", alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 20, }}>Xin chào {currentUser.TenNhanVien}!</Text>
        </View>
    </SafeAreaView>
}