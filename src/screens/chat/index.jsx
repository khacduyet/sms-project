import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput as MyTextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { FindInput } from "../../common/components";
import { useEffect, useRef, useState } from "react";
import { ListEmptyComponent } from "../schedules";
import { Avatar } from "react-native-paper";
import HeaderBack from "../../common/header";
import { Screens } from "../../common/constant";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { getFirstCharacterByName } from "../../common/common";

export default function ChatPage() {
  const [filter, setFilter] = useState({
    keyword: null,
  });

  useEffect(() => {}, [filter]);
  return (
    <SafeAreaView>
      <View style={[s.container]}>
        <View style={[s.header]}>
          <Text style={[s.headerText]}>Danh sách trò chuyện</Text>
          <TouchableOpacity style={[s.headerButton]}>
            <MaterialCommunityIcons
              name="chat-plus-outline"
              size={26}
              color="blue"
            />
          </TouchableOpacity>
        </View>
        <View style={[s.headerFind]}>
          <FindInput
            props={{
              value: filter.keyword,
              onChangeText: (e) => {
                setFilter({
                  ...filter,
                  keyword: e,
                });
              },
            }}
          />
        </View>
        <View style={[s.body]}>
          <FlatList
            data={[...Array(10)]}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
              <ItemPersonal
                props={{
                  item: item,
                }}
              />
            )}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={<View></View>}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ItemPersonal = ({ props }) => {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      style={[ip.container]}
      onPress={() => {
        nav.navigate(Screens.ChatPersonalPage, {
          props: props,
        });
      }}
    >
      <ThisAvatar url={"/"} size={80} label={`P`} />
      <View style={[ip.infomation]}>
        <View style={[ip.infomationTop]}>
          <Text style={[ip.infomationText]}>Nguyễn Thu Vân (5)</Text>
        </View>
        <View style={[ip.infomationBottom]}>
          <Text
            style={[ip.infomationText, ip.infomationTextMessage]}
            numberOfLines={1}
          >
            Em chú ý ôn tập để chuẩn bị thi Em chú ý ôn tập để chuẩn bị thi
          </Text>
          <Text style={[ip.infomationText, ip.infomationTextDate]}>
            26/12/2023
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const ChatPersonalPage = ({ route }) => {
  // const { props } = route.params;
  const refFlatlist = useRef();
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      refFlatlist.current?.scrollToEnd({
        animated: true,
      });
    });
  }, []);

  return (
    <SafeAreaView style={[cpp.container]}>
      <HeaderTitle />
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={[cpp.body]}>
          <FlatList
            ref={refFlatlist}
            data={[...Array(10)]}
            renderItem={(item) => (
              <>
                <MyBoxChat />
                <AnotherBoxChat />
              </>
            )}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={<View></View>}
          />
        </View>
        <View style={[cpp.footer]}>
          <MyCustomTextInput />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const MyCustomTextInput = () => {
  return (
    <View style={[mc.container]}>
      <TouchableOpacity>
        <EvilIcons name="image" size={35} color="black" />
      </TouchableOpacity>
      <MyTextInput
        style={[mc.textinput]}
        multiline
        placeholder="Nhập tin nhắn mới.."
      />
      <TouchableOpacity>
        <Ionicons name="send" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const mc = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
  },
  textinput: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    alignItems: "center",
  },
});

const SIZE_ICON = 35;

const MyBoxChat = () => {
  return (
    <View style={[b.container]}>
      <View style={[b.wrap, b.myWrap]}>
        <View style={[b.messageArea, b.myMessage]}>
          <Text style={[b.message]}>Hello Guy!</Text>
          <View style={[b.TimeWrap]}>
            <Text style={[b.messageTime]}>14:05</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const AnotherBoxChat = () => {
  return (
    <View style={[b.container]}>
      <View style={[b.wrap]}>
        <View style={[]}>
          <ThisAvatar url={"/"} size={40} label={`P`} />
        </View>
        <View style={[b.messageArea]}>
          <Text style={[b.message]}>Today is very nice!</Text>
          <View style={[b.TimeWrap]}>
            <Text style={[b.messageTime]}>11:05</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const b = StyleSheet.create({
  container: {
    width: "100%",
  },
  wrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 5,
    padding: 5,
  },
  myWrap: {
    justifyContent: "flex-end",
  },
  messageArea: {
    backgroundColor: "rgb(242, 238, 238)",
    borderTopLeftRadius: 0,
    borderRadius: 5,
    padding: 5,
    paddingRight: 10,
    maxWidth: "80%",
  },
  myMessage: {
    backgroundColor: "#D9E8FF",
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 0,
  },
  message: {
    fontSize: 16,
  },
  TimeWrap: {
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
  messageTime: {
    fontSize: 12,
    color: `#636363`,
  },
});

const HeaderTitle = () => {
  const nav = useNavigation();
  return (
    <View style={[cpp.head.container]}>
      <TouchableOpacity style={[cpp.head.headerArrow]} onPress={nav.goBack}>
        <View>
          <MaterialIcons name="arrow-back-ios" size={SIZE_ICON} color="black" />
        </View>
      </TouchableOpacity>
      <View style={[cpp.head.header]}>
        <View style={[cpp.ht.container]}>
          <View style={[cpp.ht.wrap]}>
            <ThisAvatar size={50} name={`Nguyễn Thu Vân`} />
            <Text style={[cpp.ht.text]}>Nguyễn Thu Vân</Text>
          </View>
          <View style={[cpp.ht.wrap]}>
            <TouchableOpacity>
              <Octicons name="search" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Entypo name="dots-three-vertical" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const cpp = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  head: {
    container: {
      width: "100%",
      height: 50,
      flexDirection: "row",
      justifyContent: "flex-end",
      position: "relative",
      backgroundColor: `#EDEAEA`,
    },
    header: {
      width: "90%",
      height: "100%",
    },
    headerArrow: {
      position: "absolute",
      left: 10,
      top: 5,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 600,
      textAlign: "center",
    },
  },
  ht: {
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    wrap: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      paddingLeft: 5,
    },
  },
  body: {
    width: "100%",
    flex: 1,
  },
  footer: {
    width: "100%",
    backgroundColor: "#fff",
    flexDirection: "row",
  },
});

const ip = StyleSheet.create({
  container: {
    width: "100%",
    height: 80,
    // backgroundColor: "#F1EDED",
    marginBottom: 5,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#E1DDDD",
  },
  avatar: {
    backgroundColor: null,
  },
  infomation: {
    flex: 1,
    justifyContent: "center",
  },
  infomationTop: {},
  infomationText: {
    fontSize: 18,
  },
  infomationBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infomationTextMessage: {
    color: `#636363`,
    flex: 2,
    fontSize: 15,
  },
  infomationTextDate: {
    color: `#636363`,
    flex: 1,
    textAlign: "right",
    fontSize: 15,
  },
});

const s = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 10,
    // justifyContent: "center",
    // alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
  },
  headerFind: {
    marginTop: 5,
  },
  headerFindInput: {
    height: 40,
  },
  body: {
    marginTop: 5,
  },
});

const ThisAvatar = ({ url, size, name }) => {
  return url ? (
    <Avatar.Image
      size={size}
      source={require("../../resources/avatar-student.png")}
      // source={uri: url)}
      style={[ip.avatar]}
    />
  ) : (
    <Avatar.Text
      label={getFirstCharacterByName(name)}
      size={size - 5}
      color="#fff"
    />
  );
};
