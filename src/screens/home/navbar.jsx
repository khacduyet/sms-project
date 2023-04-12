import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL, Screens } from "../../common/constant";
import { StatusBar } from "react-native";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";
import HeaderBack from "../../common/header";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { notifyReducer } from "../../redux/reducers/notifyReducer";
import { getListNotify } from "../../redux/actions/notifyAction";
import { formatDateStringGMT } from "../../common/common";
import { DMGeneralServices } from "../../services/danhmuc.service";

export default function HomeNavBar({ currentUser }) {
  const navigate = useNavigation();
  const nav = useNavigation();

  const [avatar, setAvatar] = useState({
    isExternal: false,
    url: "../../resources/avatar-student.png",
  });

  const getAvatar = async () => {
    console.log("currentUser", currentUser);
    if (currentUser.LinkAnhDaiDien) {
      let url = BASE_URL + currentUser.LinkAnhDaiDien;
      let obj = {
        isExternal: true,
        url: url,
      };
      setAvatar(obj);
    }
  };

  useEffect(() => {
    getAvatar();
  }, [currentUser.LinkAnhDaiDien]);

  const nameStudent = useMemo(() => {
    if (currentUser.TenNhanVien) {
      let arr = currentUser.TenNhanVien.split(" ");
      return arr.length && arr[arr.length - 1];
    }
    return "";
  }, [currentUser.TenNhanVien]);

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.user]}>
          <TouchableOpacity
            style={[styles.button, styles.buttonUser]}
            onPress={() => {
              // navigate.navigate(Screens.Setting)
            }}
          >
            <Image
              style={[styles.avatar]}
              source={
                avatar.isExternal
                  ? { uri: avatar.url }
                  : require(`../../resources/avatar-student.png`)
              }
              resizeMode="stretch"
            />
            <Text style={[styles.buttonText]}>
              Xin chào!{" "}
              <Text style={[styles.buttonText, styles.buttonTextName]}>
                {nameStudent}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bell]}>
          <TouchableOpacity
            style={[styles.button, styles.buttonBadge]}
            onPress={() => {
              nav.push(Screens.Notification);
            }}
          >
            <SimpleLineIcons name="bell" size={25} color="black" />
            <View style={[styles.buttonTextContainBadge]}>
              <Text style={[styles.buttonTextBadge]}>2</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export function NotificationPage() {
  const notifies = useSelector((state) => state.notify);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    dispatch(getListNotify(currentUser.Id, `0`));
  }, []);

  const seenNotification = async (item) => {
    await DMGeneralServices.Notification.Seen(item);
    setRefresh(!refresh);
  };

  return (
    <SafeAreaView style={[]}>
      <HeaderBack header={Screens.Notification} />
      <View style={[styles.wrapNotification]}>
        <FlatList
          data={notifies}
          renderItem={({ item }) => (
            <ItemNotification item={item} seenNotification={seenNotification} />
          )}
          keyExtractor={(item) => item.Id}
        />
      </View>
    </SafeAreaView>
  );
}

const ItemNotification = ({ item, seenNotification }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        seenNotification(item);
      }}
    >
      <View style={[notifies.itemNoti]}>
        <View style={[notifies.header]}>
          <Text style={[notifies.headerText]}>
            {formatDateStringGMT(item.Created, "dd/mm/yyyy hh:mm")}
          </Text>
          {item.TrangThai !== 2 && (
            <Entypo
              name="dot-single"
              size={45}
              color="red"
              style={[notifies.dots]}
            />
          )}
        </View>
        <View style={[notifies.body]}>
          <Text style={[notifies.title]}>{item.TieuDe}</Text>
          <Text style={[notifies.text]}>{item.NoiDung}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    width: "100%",
    height: 50,
    backgroundColor: "#cfe2ff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  bell: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    alignItems: "flex-end",
    paddingRight: 20,
  },
  buttonBadge: {
    position: "relative",
  },
  buttonTextContainBadge: {
    backgroundColor: "red",
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 10,
  },
  buttonTextBadge: {
    fontSize: 10,
    color: "#fff",
    fontWeight: 600,
  },
  user: {
    flex: 2,
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  button: {
    height: "100%",
    justifyContent: "center",
  },
  buttonUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonTextName: {
    fontWeight: 600,
  },
  wrapNotification: {},
};

const notifies = {
  itemNoti: {
    width: "95%",
    borderRadius: 5,
    // height: 100,
    backgroundColor: "#E2EAF6",
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingLeft: 10,
    paddingBottom: 15,
  },
  header: {
    borderBottomWidth: 1,
    width: "98%",
    marginBottom: 5,
  },
  headerText: {
    marginTop: 5,
    marginBottom: 5,
    fontWeight: 600,
  },
  dots: {
    position: "absolute",
    right: -10,
    top: -7,
  },
  body: {
    paddingRight: 10,
  },
  title: {
    fontWeight: 600,
    marginBottom: 5,
    fontSize: 16,
  },
  text: {},
};
