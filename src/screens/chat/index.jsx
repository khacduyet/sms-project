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
  RefreshControl,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { FindInput } from "../../common/components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "react-native-paper";
import HeaderBack from "../../common/header";
import { Screens, height, width } from "../../common/constant";
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
import { ModalGeneral } from "../../common/modal";

const ListEmptyComponent = (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      height: height / 2,
    }}
  >
    <Text>Chưa có tin nhắn...</Text>
  </View>
);

export default function ChatPage() {
  const nav = useNavigation();
  const [filter, setFilter] = useState({
    keyword: null,
  });
  const currentUser = useSelector((state) => state.currentUser);
  const [refresh, setRefresh] = useState(false);
  const [listRoom, setListRoom] = useState([]);
  const [listGV, setListGV] = useState([]);
  const [visible, setVisible] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  }, []);

  useEffect(() => {
    GetListRoom();
  }, [currentUser, refresh]);

  const GetListRoom = async () => {
    let res = await ChatService.ServiceChat.GetDSRoom({
      IdUser: currentUser.Id,
    });
    if (res) {
      setListRoom(res.Data);
    }
  };
  const GetListUserGV = async () => {
    let res = await QuyTrinhServices.SinhVien.GetDanhSachGiaoVienByIdSinhVien();
    if (res) {
      setListGV(res);
    }
  };

  const onCancel = () => {
    setVisible(false);
  };
  const onFinish = () => {
    setVisible(false);
  };

  const handleCreateNewRoom = async (item, props) => {
    let obj = {
      IdChuRoom: currentUser.Id,
      isGroup: false,
      isSinhVien: true,
      listLop: [],
      listUser: [
        {
          IdUser: currentUser.Id,
          TenUser: currentUser.TenNhanVien,
        },
        {
          IdUser: item.Id,
          TenUser: item.TenNhanVien,
        },
      ],
    };
    let res = await ChatService.ServiceChat.SetRoom(obj);
    if (res) {
      nav.navigate(Screens.ChatPersonalPage, {
        props: {
          ...props,
          item: {
            ...props.item,
            item: res.Data,
          },
        },
      });
    }
    GetListRoom();
    onCancel();
  };

  useEffect(() => {
    GetListUserGV();
  }, [filter]);

  return (
    <SafeAreaView>
      <View style={[s.container]}>
        <View style={[s.header]}>
          <Text style={[s.headerText]}>Danh sách trò chuyện</Text>
          <TouchableOpacity
            style={[s.headerButton]}
            onPress={() => setVisible(true)}
          >
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
            refreshing={refresh}
            onRefresh={onRefresh}
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
      <ModalGeneral
        onClose={onCancel}
        isVisible={visible}
        onFinish={onFinish}
        children={
          <ModalAddChat
            props={{
              listGV: listGV,
              currentUser: currentUser,
              handleCreateNewRoom: handleCreateNewRoom,
            }}
          />
        }
        isShowHeader={false}
      />
    </SafeAreaView>
  );
}

const ModalAddChat = ({ props }) => {
  const [listGV, setListGV] = useState(props.listGV);
  const [keyword, setKeyword] = useState(null);

  useEffect(() => {
    if (keyword) {
      let newLst = props.listGV.filter((x) =>
        x.TenNhanVien.toLowerCase()
          .trim()
          .includes(keyword.toLowerCase().trim())
      );
      setListGV(newLst);
      return;
    }
    setListGV(props.listGV);
  }, [keyword]);
  return (
    <View
      style={[
        {
          marginTop: 10,
          width: "90%",
        },
      ]}
    >
      <FindInput
        props={{
          value: keyword,
          onChangeText: (e) => {
            setKeyword(e);
          },
        }}
      />
      <Text style={{ padding: 3 }}>Gợi ý: </Text>
      <FlatList
        style={{ maxHeight: height / 2 }}
        data={listGV}
        showsVerticalScrollIndicator={false}
        renderItem={(item) => (
          <ItemPersonal
            props={{
              item: item,
              currentUser: props.currentUser,
              hasShowName: true,
              handleCreateNewRoom: props.handleCreateNewRoom,
            }}
          />
        )}
        keyExtractor={(item, index) => index}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={<View></View>}
        ß
      />
    </View>
  );
};

const ItemPersonal = ({ props }) => {
  const nav = useNavigation();
  const _thisBox = useMemo(() => {
    if (props.item.item.isGroup) {
      return props.item.item.Ten;
    }
    if (props.hasShowName) {
      return props.item.item.TenNhanVien;
    }
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

  const handleOnClick = () => {
    if (props.hasShowName) {
      props.handleCreateNewRoom(props.item.item, props);
      return;
    }
    nav.navigate(Screens.ChatPersonalPage, {
      props: props,
    });
  };

  return (
    <TouchableOpacity style={[ip.container]} onPress={handleOnClick}>
      <ThisAvatar url={"/"} size={80} name={_thisBox} />
      <View style={[ip.infomation]}>
        <View style={[ip.infomationTop]}>
          <Text style={[ip.infomationText]} numberOfLines={1}>
            {_thisBox}
          </Text>
          {/* <Text style={[ip.infomationText, { color: "red" }]}> (5)</Text> */}
        </View>
        {!props.hasShowName && (
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
        )}
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
  const [listMessage, setListMessage] = useState([]);
  const [currentMess, setCurrentMess] = useState({ Message: "", listFile: [] });
  const [loadMore, setLoadMore] = useState(false);

  const socketRef = useRef();

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", () => {
      scrollToEnd();
    });
    setCurrentRoom(props.item.item);
  }, []);

  const scrollToEnd = () => {
    refFlatlist.current?.scrollToEnd();
  };

  //#region handle
  const JoinRoom = async (room) => {
    LeaveRoom();
    let payload = { IdRoom: props.item.item.Id, IdMessageFirst: "" };
    let _listMessage = await ChatService.ServiceChat.GetMessagesOfRoom(payload);
    if (_listMessage?.Data) {
      setListMessage(_listMessage?.Data);
      setTimeout(() => {
        scrollToEnd();
      }, 100);
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
    if (listMessage.length) refFlatlist.current.scrollToEnd();
  };

  useEffect(() => {
    socketRef.current = socket;

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
    let payload = {
      IdRoom: currentRoom.Id,
      IdMessageFirst: listMessage[0]?.Id,
    };
    let res = await ChatService.ServiceChat.GetMessagesOfRoom(payload);
    if (res?.Data.length) {
      setLoadMore(true);
      setListMessage([...res?.Data, ...listMessage]);
    }
    setTimeout(() => {
      setLoadMore(false);
    }, 2000);
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
        {loadMore && (
          <View
            style={{
              position: "absolute",
              top: 10,
              left: 0,
              width: "100%",
              zIndex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#fff",
                width: 100,
                height: 30,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                }}
              >
                Đang tải ...
              </Text>
            </View>
          </View>
        )}
        <View style={[cpp.body]}>
          {listMessage.length === 0 && (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: height / 2,
              }}
            >
              <Text>Bắt đầu cuộc trò chuyện với 1 tin nhắn...</Text>
            </View>
          )}
          {listMessage.length > 0 && (
            <FlatList
              ref={refFlatlist}
              data={listMessage}
              // refreshing={refresh}
              // onRefresh={onRefresh}
              onScroll={(e) => {
                let posY = e.nativeEvent.contentOffset.y;
                if (posY === 0) {
                  getMoreMessages();
                }
              }}
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
                        props={{
                          item: item,
                          isOnePerson: true,
                          type: _OBJDATE,
                        }}
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
          )}
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
            <View>
              <Text style={[cpp.ht.text]} numberOfLines={1}>
                {_thisRoom?.TenRoom}
              </Text>
              {_thisRoom?.isGroup && (
                <Text style={[cpp.ht.text, { fontSize: 13, color: "blue" }]}>
                  {props.currentRoom.listUser.length} thành viên
                </Text>
              )}
            </View>
          </View>
          <View style={[cpp.ht.wrap]}>
            <TouchableOpacity>
              <Octicons name="search" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                nav.navigate(Screens.TuyChon, {
                  props: {
                    ...props,
                    _thisRoom: _thisRoom,
                  },
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
  infomationTop: {
    flexDirection: "row",
  },
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
  const [visible, setVisible] = useState(false);

  console.log("props", props);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={tc.container}>
      <HeaderBack header={Screens.TuyChon} />
      <View style={[tc.infoArea]}>
        <ThisAvatar size={80} name={props._thisRoom.TenRoom} />
        <Text numberOfLines={1} style={[tc.infoArea.text]}>
          {props._thisRoom.TenRoom}
        </Text>
      </View>
      {!props._thisRoom.isGroup && (
        <View style={[tc.bodyArea]}>
          <TouchableOpacity style={[tc.bodyArea.button]}>
            <EvilIcons name="pencil" size={30} color="black" />
            <Text style={[tc.bodyArea.text]} numberOfLines={1}>
              Đổi tên gợi nhớ
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={[tc.bodyArea]}>
        <TouchableOpacity style={[tc.bodyArea.button]}>
          <EvilIcons name="image" size={30} color="black" />
          <Text style={[tc.bodyArea.text]} numberOfLines={1}>
            Ảnh, file, link đã gửi
          </Text>
        </TouchableOpacity>
      </View>
      {props._thisRoom.isGroup && (
        <View style={[tc.bodyArea]}>
          <TouchableOpacity
            style={[tc.bodyArea.button]}
            onPress={() => setVisible(true)}
          >
            <EvilIcons name="pencil" size={30} color="black" />
            <Text style={[tc.bodyArea.text]} numberOfLines={1}>
              Thành viên nhóm
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ModalGeneral
        isVisible={visible}
        onClose={onClose}
        children={
          <>
            <View style={{ width: "100%" }}>
              <FlatList
                style={{
                  maxHeight: 500,
                }}
                data={props.currentRoom.listUser}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => (
                  <>
                    <View style={[ip.container]}>
                      <ThisAvatar
                        url={"/"}
                        size={80}
                        name={item.item.TenUser}
                      />
                      <View style={[ip.infomation]}>
                        <View style={[ip.infomationTop]}>
                          <Text style={[ip.infomationText]} numberOfLines={1}>
                            {item.item.TenUser}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </>
                )}
                keyExtractor={(item, index) => index}
                ListFooterComponent={<View></View>}
              />
            </View>
          </>
        }
        isShowHeader={false}
      />
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
