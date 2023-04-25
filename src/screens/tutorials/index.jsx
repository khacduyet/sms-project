import { TextInput } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { Screens } from "../../common/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Page2 = () => {
  const nav = useNavigation();
  const [url, setUrl] = useState("");

  const handleSetUrl = async () => {
    await AsyncStorage.setItem("BASE_URL", url);
    nav.navigate(Screens.Login);
  };

  const handleGetUrl = async () => {
    let url = await AsyncStorage.getItem("BASE_URL");
    setUrl(url);
  };

  useEffect(() => {
    handleGetUrl();
  }, []);

  return (
    <View style={[s.wrapper, s.wrapper2]}>
      <View style={[s.wrapperView]}>
        <Text style={[s.text, { fontSize: 20 }]}>
          Mời bạn nhập đường dẫn Server
        </Text>
      </View>
      <View style={[s.wrapperView]}>
        <TextInput
          variant="standard"
          style={[s.textInput]}
          value={url}
          onChangeText={setUrl}
        />
      </View>
      <View style={[s.wrapperView]}>
        <TouchableOpacity style={[s.button]} onPress={handleSetUrl}>
          <Text style={[s.text]}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function TutorialPreview() {
  return (
    <View style={[s.container]}>
      <Swiper loop={false}>
        <View style={[s.wrapper, s.wrapper1]}>
          <Text style={[s.text]}>Chào mừng bạn đến với ứng dụng Sinh viên</Text>
        </View>
        <Page2 />
      </Swiper>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper1: {
    backgroundColor: "#FBBE0F",
  },
  wrapper2: {
    backgroundColor: "#2FF0FA",
    flexDirection: "column",
  },
  wrapperView: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "#fff",
    fontWeight: 700,
    textAlign: "center",
  },
  textInput: {
    width: "80%",
  },
  button: {
    width: "70%",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "#000",
  },
});
