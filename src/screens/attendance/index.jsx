import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBack from "../../common/header";
import { Button } from "../../common/components";
import { Colors, Screens, height } from "../../common/constant";
import { StyleSheet } from "react-native";
import DropDown from "../accademics/share-componet/DropDown/DropDown";
import { LISTNAM, listKy, listNam } from "../accademics/tab/bang-diem";
import { useEffect, useMemo, useState } from "react";
import { _Modalize, DesistArea } from "../schedules/testSchedule";
import { QuyTrinhServices } from "../../services/danhmuc.service";
import { useSelector } from "react-redux";
import { _stl } from "../../common/common";
import { ActivityIndicator } from "react-native-paper";

const SIZE_ICON = 24;

const ListEmptyComponent = (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      height: height / 2,
    }}
  >
    <Text>không có dữ liệu...</Text>
  </View>
);
const ListFooterComponent = (
  <View
    style={{
      width: "100%",
      height: 300,
      alignItems: "center",
      justifyContent: "flex-start",
    }}
  >
    <Text>Chúc bạn có một ngày học tập tốt...</Text>
  </View>
);

export default function AttendancePage() {
  const [listDiemDanh, setListDiemDanh] = useState([]);
  const [object, setObject] = useState({
    Nam: null,
    Ky: listKy[0].value,
  });
  const currentUser = useSelector((state) => state.currentUser);
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [thisBox, setThisBox] = useState(null);

  const handleOpen = (item) => {
    setThisBox(item);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const getListDiemDanh = async () => {
    let res = await QuyTrinhServices.SinhVien.GetDiemDanhOfSinhVien(object);
    if (res) {
      setListDiemDanh(res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getListDiemDanh();
  }, [object]);

  const getListNam = useMemo(() => {
    return LISTNAM();
  }, []);

  const onRefresh = () => {
    setLoading(true);
    getListDiemDanh();
  };

  return (
    <SafeAreaView style={[styles.container, _stl._container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HeaderBack header={Screens.Attendance} />
        <View style={[styles.wrapper]}>
          <View style={[styles.header]}>
            <View style={styles.dropdown}>
              <View style={styles.flex}>
                <TouchableOpacity style={styles.justify_content_between}>
                  <View style={styles.left}>
                    <DropDown
                      data={getListNam}
                      object={object}
                      setObject={setObject}
                      header={"Nam"}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.justify_content_between}>
                  <View style={styles.right}>
                    <DropDown
                      data={listKy}
                      object={object}
                      setObject={setObject}
                      header={"Ky"}
                      loading={loading}
                      setLoading={setLoading}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[b.wrapper]}>
            {loading && (
              <View
                style={{
                  height: height / 2,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            )}
            {!loading && (
              <FlatList
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                data={listDiemDanh}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleOpen(item)}>
                    <ItemTestSchedule item={item} style={items} />
                  </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={ListEmptyComponent}
                ListHeaderComponent={
                  <View style={{ width: "100%", height: 10 }}></View>
                }
                ListFooterComponent={listDiemDanh.length && ListFooterComponent}
              />
            )}
          </View>
        </View>
        <_Modalize
          title={`${thisBox?.MaMonHoc ?? ""} - ${thisBox?.TenMonHoc}`}
          visible={visible}
          onOpen={handleOpen}
          onClose={handleClose}
          childrens={
            <View style={{ width: "100%", height: 500 }}>
              <DesistArea item={thisBox} />
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const ItemTestSchedule = ({ item, style }) => {
  return (
    <View style={[style.wrap]}>
      <View style={[style.header]}>
        <View style={[style.headerLeft]}>
          <Image
            source={require("../../resources/icons/open-book.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text
            numberOfLines={1}
            style={[style.bodyText, { fontWeight: 600, color: Colors.Danger }]}
          >
            {item.MaMonHoc} - {item.TenMonHoc} ({item.TinChi}TC)
          </Text>
        </View>
        <View style={[style.headerRight]}>
          <Text numberOfLines={1} style={[style.headerRightText]}>
            {item.TenLop}
          </Text>
        </View>
      </View>
      <View style={[style.body]}>
        <View style={[style.bodyItem, { flexDirection: "row" }]}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../resources/icons/reward.png")}
              style={{
                width: SIZE_ICON,
                height: SIZE_ICON,
                ...styles.iconImage,
              }}
              resizeMode="stretch"
            />
            <Text numberOfLines={1} style={[style.headerleftTime]}>
              Tổng số giờ quy định: {item.TongSoTiet}
            </Text>
          </View>
        </View>
        <View style={[style.bodyItem]}>
          <Image
            source={require("../../resources/icons/hour-glass.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text numberOfLines={1} style={[style.headerleftTime]}>
            Số giờ được nghỉ tối đa: {item.TongSoGioDuocNghi}
          </Text>
        </View>
        <View style={[style.bodyItem, { flexDirection: "row" }]}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../resources/icons/user-minus.png")}
              style={{
                width: SIZE_ICON,
                height: SIZE_ICON,
                ...styles.iconImage,
              }}
              resizeMode="stretch"
            />
            <Text numberOfLines={1} style={[style.headerleftTime]}>
              Số giờ đã nghỉ: {item.TongSoGioNghi}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const b = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
  },
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  header: {
    margin: 5,
    marginBottom: 0,
  },
  flex: {
    flexDirection: "row",
  },
  justify_content_between: {
    flex: 1,
  },
  dropdown: {},
  left: {
    marginRight: 8,
  },
  right: {
    marginLeft: 8,
  },
  content: {
    marginTop: 16,
    marginBottom: 16,
  },
  marginBottom_16: {
    marginBottom: 16,
  },
});

export const items = {
  wrap: {
    width: "95%",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.HeaderTitle,
    borderBottomWidth: 1,
    padding: 2,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerLeft: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  headerleftTime: {
    fontWeight: 600,
    paddingLeft: 8,
    fontSize: 12,
  },
  headerRight: {
    flex: 2,
    alignItems: "flex-end",
    fontSize: 12,
  },
  headerRightText: {
    fontWeight: 600,
  },
  body: {
    flexDirection: "column",
    padding: 3,
  },
  bodyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  bodyText: {
    paddingLeft: 8,
  },
};
