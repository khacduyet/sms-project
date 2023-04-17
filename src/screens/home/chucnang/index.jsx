import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Colors, height, width } from "../../../common/constant";
import { TouchableOpacity } from "react-native";
import Swiper from "react-native-swiper";

const SIZE_ICON = 30;
// 1 page - max 6 item
const COMPONENTS_WITHPAGES = [
  {
    page: 1,
    components: [
      {
        label: `Đăng ký học phần`,
        icon: (
          <MaterialCommunityIcons
            name="calendar-edit"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
      {
        label: `Đóng học phí`,
        icon: (
          <FontAwesome5
            name="dollar-sign"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
      {
        label: `Chương trình đào tạo`,
        icon: <AntDesign name="book" size={SIZE_ICON} color={Colors.Primary} />,
        onPress: () => {},
      },
      {
        label: `Xin bảo lưu`,
        icon: (
          <FontAwesome5
            name="user-clock"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
      {
        label: `Chuyển lớp/chuyển ngành`,
        icon: (
          <MaterialCommunityIcons
            name="book-refresh"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
      {
        label: `Đánh giá rèn luyện`,
        icon: (
          <MaterialIcons
            name="assessment"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
    ],
  },
  {
    page: 2,
    components: [
      {
        label: `Đăng ký học phần`,
        icon: (
          <MaterialCommunityIcons
            name="calendar-edit"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
      {
        label: `Đóng học phí`,
        icon: (
          <FontAwesome5
            name="dollar-sign"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
      {
        label: `Chương trình đào tạo`,
        icon: <AntDesign name="book" size={SIZE_ICON} color={Colors.Primary} />,
        onPress: () => {},
      },
      {
        label: `Xin bảo lưu`,
        icon: (
          <FontAwesome5
            name="user-clock"
            size={SIZE_ICON}
            color={Colors.Primary}
          />
        ),
        onPress: () => {},
      },
    ],
  },
];

export default function ChucNangComponent() {
  return (
    <View style={[styles.container]}>
      <Swiper>
        {COMPONENTS_WITHPAGES.map((x, index) => {
          return <Component_Page key={index} lstData={x.components} />;
        })}
      </Swiper>
    </View>
  );
}

const Component_Page = ({ lstData }) => {
  return (
    <View style={[components.container]}>
      {lstData.map((x, idx) => {
        return (
          <View style={[components.box, { ...styles.shadow }]} key={idx}>
            <TouchableOpacity style={[components.item]}>
              <View style={[components.itemView]}>
                {x.icon}
                <Text style={[components.itemViewText]}>{x.label}</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    height: 250,
    marginLeft: 10,
    marginRight: 10,
  },
  wrapper: {},
  shadow: {
    shadowColor: "#636363", // IOS
    shadowOffset: { height: 2, width: 1 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 2, //IOS
    elevation: 20, // Android
  },
});
const components = StyleSheet.create({
  container: {
    width: width,
    height: height / 4,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  box: {
    width: "33%",
    height: 105,
    padding: 5,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#cfe2ff",
    justifyContent: "center",
  },
  itemView: {
    alignItems: "center",
    justifyContent: "center",
  },
  itemViewText: {
    color: Colors.Primary,
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
});
