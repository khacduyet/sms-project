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
import { useEffect, useMemo, useRef, useState } from "react";
import { ListEmptyComponent } from "../schedules";
import { Avatar } from "react-native-paper";
import HeaderBack from "../../common/header";
import { Screens, width } from "../../common/constant";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  formatDateStringGMT,
  getFirstCharacterByName,
  getTypeToDate,
} from "../../common/common";
import { socket } from "./socket";
import { QuyTrinhServices } from "../../services/danhmuc.service";
import { AuthServices } from "../../services/danhmuc.service";
import { ChatService } from "../../services/chat.service";
import { useSelector } from "react-redux";

export default function ChatPage() {
  const [filter, setFilter] = useState({
    keyword: null,
  });
  const currentUser = useSelector((state) => state.currentUser);

  const [listRoom, setListRoom] = useState([]);

  useEffect(() => {
    GetListRoom();
  }, [currentUser]);

  const GetListRoom = async () => {
    let res = await ChatService.ServiceChat.GetDSRoom({
      IdUser: currentUser.Id,
    });
    if (res) {
      setListRoom(res.Data);
    }
  };

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
            data={listRoom}
            showsVerticalScrollIndicator={false}
            renderItem={(item) => (
              <ItemPersonal
                props={{
                  item: item,
                  currentUser: currentUser,
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

  const _thisBox = useMemo(() => {
    let _this = props.item.item.listUser.filter(
      (x) => x.IdUser !== props.currentUser.Id
    );
    return (
      _this.length &&
      _this
        .map((x) => {
          return x.TenUser;
        })
        .join(", ")
    );
  }, [props.currentUser, props.item]);

  return (
    <TouchableOpacity
      style={[ip.container]}
      onPress={() => {
        nav.navigate(Screens.ChatPersonalPage, {
          props: props,
        });
      }}
    >
      <ThisAvatar url={"/"} size={80} name={_thisBox} />
      <View style={[ip.infomation]}>
        <View style={[ip.infomationTop]}>
          <Text style={[ip.infomationText]} numberOfLines={1}>
            {_thisBox} (5)
          </Text>
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
  const { props } = route.params;
  const refFlatlist = useRef();
  const currentUser = useSelector((state) => state.currentUser);
  const [currentRoom, setCurrentRoom] = useState({});
  const [listUserOnline, setListUserOnline] = useState([]);
  const [listUserCanChat, setListUserCanChat] = useState([]);
  const [listMessage, setListMessage] = useState([]);
  const [listGiaoVien, setListGiaoVien] = useState([]);
  const [currentMess, setCurrentMess] = useState({ Message: "", listFile: [] });
  const socketRef = useRef();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      refFlatlist.current?.scrollToEnd();
    });
    setCurrentRoom(props.item.item);
  }, []);

  //#region handle
  const JoinRoom = async (room) => {
    LeaveRoom();
    let payload = { IdRoom: props.item.item.Id, IdMessageFirst: "" };
    let _listMessage = await ChatService.ServiceChat.GetMessagesOfRoom(payload);
    if (_listMessage?.Data) {
      setListMessage(_listMessage?.Data);
    }
    socketRef.current.emit("joinRoom", {
      userid: currentUser.Id,
      username: currentUser.UserName,
      room: currentRoom,
    });
  };
  const LeaveRoom = () => {
    socketRef.current.emit("leaveRoom", {});
  };
  const ChatMessage = () => {
    if (!currentMess.Message) return;
    socketRef.current.emit("chatMessage", currentMess);
    setCurrentMess({ Message: "", listFile: [] });
  };

  useEffect(() => {
    socketRef.current = socket;

    getAllOptions();
    function onConnect() {
      // setIsConnected(true);
    }

    function onDisconnect() {
      // setIsConnected(false);
    }

    function onFooEvent(value) {
      // setFooEvents(previous => [...previous, value]);
    }
    function onMessageEvent(value) {
      setListMessage((previous) => [...previous, value]);
      // scrollToBottom();
    }
    function onRoomUsersEvent(value) {
      setListUserOnline(value.users);
    }
    socketRef.current.connect();

    // JoinRoom();

    socketRef.current.on("connect", onConnect);
    socketRef.current.on("disconnect", onDisconnect);
    socketRef.current.on("message", onMessageEvent);
    socketRef.current.on("roomUsers", onRoomUsersEvent);
    socketRef.current.on("foo", onFooEvent);
    return () => {
      socketRef.current.off("connect", onConnect);
      socketRef.current.off("disconnect", onDisconnect);
      socketRef.current.off("message", onMessageEvent);
      socketRef.current.off("roomUsers", onRoomUsersEvent);
      socketRef.current.off("foo", onFooEvent);
      socketRef.current.disconnect();
    };
  }, []);

  const getMoreMessages = async () => {
    // let position = messagesStart?.current.scrollTop;
    // if (position === 0) {
    //   let payload = {
    //     IdRoom: currentRoom.Id,
    //     IdMessageFirst: listMessage[0]?.Id,
    //   };
    //   let res = await ChatService.ServiceChat.GetMessagesOfRoom(payload);
    //   if (res?.Data.length) {
    //     setLoadMore(true);
    //     scrollToPrev();
    //     setListMessage([...res?.Data, ...listMessage]);
    //   }
    // }
    // setTimeout(() => {
    //   setLoadMore(false);
    // }, 2000);
  };

  const getAllOptions = async () => {
    // let personChats =
    //   await QuyTrinhService.PhanCongGiaoVien.GetLopAndSinhVienByGiaoVien();
    // if (personChats) {
    //   setListUserCanChat(personChats);
    // }
  };

  useEffect(() => {
    if (currentRoom?.Id) JoinRoom();
  }, [currentRoom]);
  //#endregion API

  return (
    <SafeAreaView style={[cpp.container]}>
      <HeaderTitle
        props={{ currentRoom: currentRoom, currentUser: currentUser }}
      />
      <KeyboardAvoidingView
        // behavior="padding"
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
      >
        <View style={[cpp.body]}>
          <FlatList
            ref={refFlatlist}
            data={listMessage}
            renderItem={(item) => {
              let _TYPE = getTypeToDate(item.item.Created);
              let _OBJDATE = {
                type: _TYPE,
                isAnotherDate: item.item.Created ? true : false,
              };
              if (item.index === 0) {
                if (item.item.IdUser !== currentUser.Id) {
                  return (
                    <AnotherBoxChat props={{ item: item, type: _OBJDATE }} />
                  );
                }
                return <MyBoxChat props={{ item: item, type: _OBJDATE }} />;
              }
              let prevMess = listMessage[item.index - 1];
              let _TYPE_PREV = getTypeToDate(prevMess.Created);
              if (_TYPE === _TYPE_PREV) {
                _OBJDATE = {
                  ..._OBJDATE,
                  isAnotherDate: false,
                };
              }
              if (item.item.IdUser === prevMess.IdUser) {
                if (item.item.IdUser !== currentUser.Id) {
                  return (
                    <AnotherBoxChat
                      props={{ item: item, isOnePerson: true, type: _OBJDATE }}
                    />
                  );
                }
              } else {
                if (item.item.IdUser !== currentUser.Id) {
                  return (
                    <AnotherBoxChat props={{ item: item, type: _OBJDATE }} />
                  );
                }
              }
              return <MyBoxChat props={{ item: item, type: _OBJDATE }} />;
            }}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={
              <View style={{ width: "100%", height: 10 }}></View>
            }
          />
        </View>
        <View style={[cpp.footer]}>
          <MyCustomTextInput
            props={{
              handleSend: ChatMessage,
              currentMess: currentMess,
              setCurrentMess: setCurrentMess,
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const MyCustomTextInput = ({ props }) => {
  return (
    <View style={[mc.container]}>
      <TouchableOpacity>
        <EvilIcons name="image" size={35} color="black" />
      </TouchableOpacity>
      <MyTextInput
        value={props.currentMess.Message}
        style={[mc.textinput]}
        multiline
        placeholder="Nhập tin nhắn mới.."
        onChangeText={(e) =>
          props.setCurrentMess({
            ...props.currentMess,
            Message: e,
          })
        }
      />
      <TouchableOpacity onPress={props.handleSend}>
        <Ionicons name="send" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const SIZE_ICON = 35;
const MyBoxChat = ({ props }) => {
  return (
    <>
      {props.type.isAnotherDate && (
        <View style={[b.containerTime]}>
          <View style={[b.TimeHr]}></View>
          <View style={[b.Time]}>
            <Text style={[b.TimeText]}>{props.type.type}</Text>
          </View>
        </View>
      )}

      <View style={[b.container]}>
        <View style={[b.wrap, b.myWrap]}>
          <View style={[b.messageArea, b.myMessage]}>
            <Text style={[b.message]}>{props.item.item.Message}</Text>
            <View style={[b.TimeWrap]}>
              <Text style={[b.messageTime]}>
                {props.item.item.Created &&
                  formatDateStringGMT(props.item.item.Created, "hh:mm")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
const AnotherBoxChat = ({ props }) => {
  return (
    <>
      {props.type.isAnotherDate && (
        <View style={[b.containerTime]}>
          <View style={[b.TimeHr]}></View>
          <View style={[b.Time]}>
            <Text style={[b.TimeText]}>{props.type.type}</Text>
          </View>
        </View>
      )}
      <View style={[b.container]}>
        <View style={[b.wrap]}>
          <View style={{ width: 40 }}>
            {!props.isOnePerson && (
              <ThisAvatar
                // url={"/"}
                size={40}
                name={getFirstCharacterByName(props.item.item.TenUser)}
              />
            )}
          </View>
          <View style={[b.messageArea]}>
            <Text style={[b.message]}>{props.item.item.Message}</Text>
            <View style={[b.TimeWrap]}>
              <Text style={[b.messageTime]}>
                {props.item.item.Created &&
                  formatDateStringGMT(props.item.item.Created, "hh:mm")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

const HeaderTitle = ({ props }) => {
  const nav = useNavigation();
  const _thisRoom = useMemo(() => {
    let obj = {
      TenRoom: null,
      Avatar: null,
      isGroup: props.currentRoom.isGroup,
    };
    if (obj.isGroup) {
      obj = {
        ...obj,
        TenRoom: props.currentRoom.Ten,
      };
    } else {
      let Its = props.currentRoom.listUser?.filter(
        (x) => x.IdUser !== props.currentUser.Id
      );
      if (Its && Its.length) {
        obj = {
          ...obj,
          TenRoom: Its[0].TenUser,
          Avatar: Its[0]?.Avatar,
        };
      }
    }
    return obj;
  }, [props.currentRoom, props.currentUser]);

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
            <ThisAvatar size={50} name={_thisRoom.TenRoom ?? ``} />
            <Text style={[cpp.ht.text]} numberOfLines={1}>
              {_thisRoom?.TenRoom}
            </Text>
          </View>
          <View style={[cpp.ht.wrap]}>
            <TouchableOpacity>
              <Octicons name="search" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(Screens.TuyChon, {
                  props: { ...props, _thisRoom: _thisRoom },
                });
              }}
            >
              <Entypo name="dots-three-vertical" size={30} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    paddingLeft: 5,
    paddingRight: 5,
  },
  textinput: {
    flex: 1,
    fontSize: 18,
    padding: 5,
    alignItems: "center",
  },
});
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
    paddingBottom: 0,
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
  containerTime: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  TimeHr: {
    height: 0.8,
    width: "90%",
    backgroundColor: "#ccc",
  },
  Time: {
    position: "absolute",
    bottom: -12,
    backgroundColor: "#f2f2f2",
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  TimeText: {
    fontSize: 12,
  },
});
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

export const ChatCustomPage = ({ route }) => {
  const { props } = route.params;
  return (
    <SafeAreaView style={tc.container}>
      <HeaderBack header={Screens.TuyChon} />
      <View style={[tc.infoArea]}>
        <ThisAvatar size={80} name={props._thisRoom.TenRoom} />
        <Text numberOfLines={1} style={[tc.infoArea.text]}>
          {props._thisRoom.TenRoom}
        </Text>
      </View>
      <View style={[tc.bodyArea]}>
        <TouchableOpacity style={[tc.bodyArea.button]}>
          <EvilIcons name="pencil" size={30} color="black" />
          <Text style={[tc.bodyArea.text]} numberOfLines={1}>
            Đổi tên gợi nhớ
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[tc.bodyArea]}>
        <TouchableOpacity style={[tc.bodyArea.button]}>
          <EvilIcons name="image" size={30} color="black" />
          <Text style={[tc.bodyArea.text]} numberOfLines={1}>
            Ảnh, file, link đã gửi
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const tc = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  infoArea: {
    alignItems: "center",
    padding: 50,
    text: {
      fontSize: 20,
      fontWeight: 600,
    },
  },
  bodyArea: {
    flexDirection: "column",
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    button: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 20,
      marginLeft: 10,
    },
  },
});
