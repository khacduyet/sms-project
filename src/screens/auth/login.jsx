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
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { loginSubmit } from "../../redux/actions/loginAction";
import Loading from "../loading";
import * as LocalAuthentication from "expo-local-authentication";
import { setLoading } from "../../redux/actions/loadingAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage({ navigation }) {
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const loading = useSelector((state) => state.loading);

  const [fingerPrint, setFingerPrint] = useState(false);
  const getFinger = async () => {
    let func = await AsyncStorage.getItem("fingerPrint");
    if (func) {
      let bool = func === "true";
      setFingerPrint(bool);
    }
  };

  useEffect(() => {
    getFinger();

    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShow(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShow(false);
    });
  }, []);

  useEffect(() => {
    async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
  });

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const alertComponent = (title, mess, btnTxt, btnFunc) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometricAuth = async () => {
    const isBiometricAvail = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricAvail)
      return alertComponent(
        "Please enter your password",
        "Biometric auth not supported",
        "Ok",
        () => fallBackToDefaultAuth
      );

    let supportedBiometrics;
    if (isBiometricAvail)
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return alertComponent(
        "Biometric record not found",
        "Please ...",
        "Ok",
        () => fallBackToDefaultAuth()
      );

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "HarmonyES",
      cancelLabel: "cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth) {
      navigation.navigate("Home");
      // TwoButtonAlert();
    }

    // console.log({ isBiometricAvail });
    // console.log({ supportedBiometrics });
    // console.log({ savedBiometrics });
    // console.log({ biometricAuth });
  };

  return (
    <View style={{ position: "relative" }}>
      {loading.loading && <Loading />}
      <SafeAreaView style={[{ margin: 10 }]}>
        <KeyboardAvoidingView>
          <View style={[styles.container, {}]}>
            <HeaderLogin keyboardShow={keyboardShow} />
            <BodyLogin keyboardShow={keyboardShow} navigation={navigation} />
            <FooterLogin
              handleBiometricAuth={handleBiometricAuth}
              fingerPrint={fingerPrint}
            />
            {/* {!keyboardShow && <FooterLogin />} */}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

function BodyLogin({ keyboardShow, navigation, _loading }) {
  const [account, setAccount] = useState({
    username: "nypt",
    password: "123456",
  });
  const loading = useSelector((state) => state.loading);
  const tokenReducer = useSelector((state) => state.tokenReducer);
  const dispatch = useDispatch();
  // console.log("loading", loading);

  const onChangeText = (value, prop) => {
    if (value !== undefined && value !== null) {
      setAccount({
        ...account,
        [prop]: value,
      });
    }
  };

  const handleLogin = () => {
    // dispatch(setLoading(true));
    dispatch(loginSubmit(account));
  };

  useEffect(() => {
    if (tokenReducer.access_token) {
      setTimeout(() => {
        navigation.navigate("Home");
      }, 1000);
    }
  }, [tokenReducer]);

  return (
    <View
      style={[
        {
          height: keyboardShow ? "60%" : "35%",
          width: "100%",
          flexDirection: "column",
        },
        styles.body,
      ]}
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
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View style={{ flexDirection: "row", flex: 1 }}></View>
          <View style={{ flex: 2 }}>
            <TouchableOpacity style={{ width: "100%", height: "100%" }}>
              <Text
                style={{
                  width: "100%",
                  fontSize: 17,
                  color: "#223ffa",
                  textAlign: "right",
                }}
              >
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
            borderRadius: 10,
          }}
          onPress={() => {
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
      style={[
        {
          width: "100%",
          height: keyboardShow ? "40%" : "25%",
          justifyContent: "center",
          alignItems: "center",
        },
        styles.header,
      ]}
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

function FooterLogin({ handleBiometricAuth, fingerPrint }) {
  console.log("fingerPrint", fingerPrint);
  return (
    <View
      style={[
        {
          width: "100%",
          height: "40%",
          alignItems: "center",
          position: "relative",
        },
        styles.footer,
      ]}
    >
      {fingerPrint && (
        <TouchableOpacity
          style={{
            width: "80%",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={handleBiometricAuth}
        >
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <Image
              style={{ width: 30, height: 30 }}
              resizeMode="stretch"
              source={require("../../resources/fingerprint.png")}
            />
          </View>
          <Text
            style={{
              marginLeft: 10,
              color: "#000",
              fontSize: 16,
              flex: 3,
            }}
          >
            Đăng nhập bằng vân tay
          </Text>
        </TouchableOpacity>
      )}

      {/* <Text style={{ fontSize: 14, marginTop: 10 }}>
        Phần mềm được phát triển bởi
      </Text>
      <Text
        style={{
          fontSize: 14,
          marginBottom: 10,
        }}
      >
        Công ty TNHH Giải pháp doanh nghiệp Hài Hòa
      </Text> */}
    </View>
  );
}

//#endregion

const styles = {
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 2,
  },
  footer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    fontSize: 18,
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
    height: 50,
  },
};
