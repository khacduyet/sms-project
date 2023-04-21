import { Image, SafeAreaView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Colors, Screens } from "../../common/constant";
import HeaderBack from "../../common/header";
import { Modalize } from "react-native-modalize";
import { useRef } from "react";
import { items } from "./index";
import { createGuid } from "../../common/common";

const SIZE_ICON = 24;

const data = [
  {
    Name: `MH04 - Thực hành cơ khí (2TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `3.5`,
    SoGioToiDa: `26/20`,
    isPass: false,
  },
  {
    Name: `MH05 - Đại số tuyến tính (2TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `4.0`,
    SoGioToiDa: `10/20`,
    isPass: false,
  },
  {
    Name: `MH11 - Tin học đại cương (2TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `7.5`,
    SoGioToiDa: `4/15`,
    isPass: true,
  },
  {
    Name: `MH07 - Giáo dục thể chất (1TC)`,
    Lop: `CNTT01_K43`,
    DiemTrungBinh: `9.0`,
    SoGioToiDa: `0/20`,
    isPass: true,
  },
];

export default function TestSchedule({ route }) {
  const modalizeRef = useRef(null);

  const onOpen = () => {
    // modalizeRef.current?.open();
  };
  const onClose = () => {
    modalizeRef.current?.close();
  };

  const { title } = route.params;
  return (
    <SafeAreaView style={[styles.container]}>
      <View>
        <HeaderBack header={`ĐIỀU KIỆN THI KẾT THÚC MÔN\n` + title} />
        {data.map((x, index) => {
          return <ItemTestSchedule onOpen={onOpen} item={x} key={index} />;
        })}
      </View>
      <Modalize
        ref={modalizeRef}
        snapPoint={300}
        onOverlayPress={() => {
          console.log("aaa");
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
        <Text>...your content</Text>
      </Modalize>
    </SafeAreaView>
  );
}

const ItemTestSchedule = ({ item, onOpen }) => {
  return (
    <TouchableOpacity style={[styles.wrap]} onPress={onOpen}>
      <View style={[styles.header]}>
        <View style={[styles.headerLeft]}>
          <Image
            source={require("../../resources/icons/open-book.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text
            numberOfLines={1}
            style={[styles.bodyText, { fontWeight: 600 }]}
          >
            {/* MH04 - Thực hành cơ khí (2TC) */}
            {item.Name}
          </Text>
        </View>
        <View style={[styles.headerRight]}>
          <Text numberOfLines={1} style={[styles.headerRightText]}>
            {/* CNTT01_K43 */}
            {item.Lop}
          </Text>
        </View>
      </View>
      <View style={[styles.body]}>
        <View style={[styles.bodyItem, { flexDirection: "row" }]}>
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
            <Text
              numberOfLines={1}
              style={[
                styles.headerleftTime,
                { color: item.isPass ? "#000" : "red" },
              ]}
            >
              Điểm trung bình: {item.DiemTrungBinh}
            </Text>
          </View>

          <Text
            numberOfLines={1}
            style={[
              {
                color: item.isPass ? "blue" : "red",
                alignItems: "flex-end",
                fontStyle: "italic",
                fontWeight: 500,
              },
            ]}
          >
            {item.isPass ? `Đủ điều kiện thi` : `Không đủ điều kiện thi`}
          </Text>
        </View>
        <View style={[styles.bodyItem]}>
          <Image
            source={require("../../resources/icons/user-check.png")}
            style={{ width: SIZE_ICON, height: SIZE_ICON, ...styles.iconImage }}
            resizeMode="stretch"
          />
          <Text numberOfLines={1} style={[styles.headerleftTime]}>
            Số giờ tối đa được nghỉ: {item.SoGioToiDa}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ...items,
});
