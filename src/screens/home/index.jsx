import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "../../redux/actions/loginAction";
import { setLoading } from "../../redux/actions/loadingAction";
import HomeNavBar from "./navbar";
import { ToastMessage } from "../../common/components";
import { getBadgeNotify } from "../../redux/actions/notifyAction";

export default function HomePage({ navigation }) {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  function showToast() {
    ToastMessage(`Chào bạn ${currentUser.TenNhanVien}`);
  }

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getBadgeNotify());
    if (currentUser && currentUser.TenNhanVien) {
      showToast();
    }
  }, [currentUser.TenNhanVien]);

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          //   backgroundColor: "blue",
        }}
      >
        <Text style={{ fontSize: 20 }}>
          Xin chào {currentUser.TenNhanVien}!
        </Text>
      </View>
    </SafeAreaView>
  );
}
