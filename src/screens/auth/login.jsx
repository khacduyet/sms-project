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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import { loginSubmit } from "../../redux/actions/loginAction";
import Loading from "../loading";
import { setLoading } from "../../redux/actions/loadingAction";

export default function LoginPage({ navigation }) {
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardShow(true);
    });
    Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardShow(false);
    });
  }, []);

  const _isShowPrint = {
    backgroundColor: "#a3a3a3",
  };

  return (
    <View style={{ position: "relative" }}>
      {loading.loading && <Loading />}
      <KeyboardAvoidingView>
        <View
          style={[
            modalVisible ? _isShowPrint : {},
            { width: "100%", height: "100%" },
          ]}
        >
          <SafeAreaView style={[{ margin: 10 }]}>
            <HeaderLogin keyboardShow={keyboardShow} />
            <BodyLogin keyboardShow={keyboardShow} navigation={navigation} />
            {!keyboardShow && <FooterLogin setModalVisible={setModalVisible} />}
          </SafeAreaView>
        </View>
      </KeyboardAvoidingView>
      {modalVisible && (
        <ModalFingerPrint
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </View>
  );
}

function ModalFingerPrint({ modalVisible, setModalVisible }) {
  return (
    <View style={modals.bottomView}>
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          console.log("Pressed outside the box!");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modals.bottomView}>
          <Text style={{ flex: 1, fontSize: 22 }}>Smart EOS</Text>
          <Text style={{ flex: 1, fontSize: 14 }}>
            Xác thực bằng vân tay, vui lòng chạm vào cảm biến
          </Text>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              resizeMode="stretch"
              source={require("../../resources/fingerprint.png")}
            />
            <Text style={{ fontSize: 12, marginTop: 10 }}>
              Chạm vào cảm biến vân tay
            </Text>
          </View>
          <Text style={{ flex: 1 }}>
            <TouchableOpacity
              style={{
                width: 100,
                height: 40,
              }}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text
                style={{
                  color: "brown",
                  fontWeight: 600,
                  fontSize: 14,
                  alignItems: "flex-end",
                }}
              >
                CANCEL
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </Modal>
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
      }, 2000);
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
          <View style={{ flexDirection: "row", flex: 1 }}>
            {/* <Checkbox
              value={remember}
              onValueChange={setRemember}
              style={styles.checkbox}
            />
            <Text style={{ width: "90%", fontSize: 17 }}>
              Ghi nhớ đăng nhập
            </Text> */}
          </View>
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

function FooterLogin({ setModalVisible }) {
  return (
    <View
      style={{
        width: "100%",
        height: "40%",
        alignItems: "center",
        position: "relative",
      }}
    >
      <TouchableOpacity
        style={{
          width: "100%",
          height: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 20,
            flex: 2,
          }}
        >
          <Image
            style={{ width: 40, height: 40 }}
            resizeMode="stretch"
            source={require("../../resources/fingerprint.png")}
          />
          Đăng nhập bằng vân tay
        </Text>
      </TouchableOpacity>

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

const modals = {
  bottomView: {
    width: "95%",
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "absolute",
    left: 0,
    bottom: 0,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: "column",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
};
