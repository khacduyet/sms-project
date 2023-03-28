import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { loginSubmit } from "../../redux/actions/loginAction";

export default function LoginPage({ navigation }) {
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShow(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShow(false);
    });
  }, []);

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <HeaderLogin keyboardShow={keyboardShow} />
      <BodyLogin keyboardShow={keyboardShow} navigation={navigation} />
      {!keyboardShow && <FooterLogin />}
    </SafeAreaView>
  );
}

function BodyLogin({ keyboardShow, navigation }) {
  const [account, setAccount] = useState({
    username: "nypt",
    password: "123456",
  });
  const [remember, setRemember] = useState(false);
  const tokenReducer = useSelector((state) => state.tokenReducer);
  const dispatch = useDispatch();

  const onChangeText = (value, prop) => {
    if (value !== undefined && value !== null) {
      setAccount({
        ...account,
        [prop]: value,
      });
    }
  };

  const handleLogin = () => {
    dispatch(loginSubmit(account));
  };

  useEffect(() => {
    if (tokenReducer.access_token) {
      navigation.navigate("Home");
    }
  }, [tokenReducer]);

  return (
    <View
      style={{
        height: keyboardShow ? "60%" : "35%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Tên tài khoản</Text>
        <TextInput
          style={styles.input}
          onChangeText={(e) => onChangeText(e, "username")}
          value={account.username}
          placeholder="Nhập tài khoản hoặc email của bạn"
        />
      </View>
      <View style={{ width: "100%", marginTop: 10 }}>
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          secureTextEntry
          style={styles.input}
          onChangeText={(e) => onChangeText(e, "password")}
          value={account.password}
          placeholder="Nhập mật khẩu của bạn"
        />
      </View>
      <View style={{ height: 50 }}>
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          <View style={{ flexDirection: "row", flex: 2 }}>
            <Checkbox
              value={remember}
              onValueChange={setRemember}
              style={styles.checkbox}
            />
            <Text style={{ width: "90%", fontSize: 17 }}>
              Ghi nhớ đăng nhập
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ width: "100%", height: "100%" }}>
              <Text style={{ width: "100%", fontSize: 17, color: "#223ffa" }}>
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity
          style={{
            width: "100%",
            height: 50,
            backgroundColor: "#037bff",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => {
            // showToast();
            handleLogin();
          }}
        >
          <Text
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Đăng nhập
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// #region
function HeaderLogin({ keyboardShow }) {
  return (
    <View
      style={{
        width: "100%",
        height: keyboardShow ? "40%" : "25%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          textTransform: "uppercase",
        }}
      >
        Trường cao đẳng kỹ nghệ II
      </Text>
      <Image
        style={{ width: 250, height: 80 }}
        resizeMode="stretch"
        source={require("../../resources/logo.png")}
      />
    </View>
  );
}

function FooterLogin() {
  return (
    <View
      style={{
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: "95%", height: "85%" }}
        resizeMode="stretch"
        source={require("../../resources/footerBackfround.png")}
      />
      <Text style={{ fontSize: 14, marginTop: 10 }}>
        Phần mềm được phát triển bởi
      </Text>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        Công ty TNHH Giải pháp doanh nghiệp Hài Hòa
      </Text>
    </View>
  );
}
//#endregion

const styles = {
  label: {
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  checkbox: {
    width: 23,
    height: 23,
    marginRight: 5,
  },
  button: {
    width: "100%",
    height: 40,
  },
};
