import { Pressable, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export default function MonHocCanhBaoComponent() {
  return (
    <View style={[styles.container]}>
      <View style={[styles.wrap]}>
        <Pressable
          style={[styles.header]}
          onPress={() => {
            console.log("aaa");
          }}
        >
          <Feather name="bookmark" size={24} color="black" />
          <Text style={[styles.headerText]}>Môn học cảnh báo</Text>
          <Ionicons
            name="arrow-forward-circle"
            size={24}
            color="blue"
            style={[styles.headerArrow]}
          />
        </Pressable>
        <View style={[styles.body]}>
          <View style={[styles.bodyWrap]}>
            <Entypo
              name="open-book"
              size={24}
              color="black"
              style={[styles.bodyIcon]}
            />
            <Text style={[styles.bodyWrapText, styles.bodyText]}>
              Thực hành cơ khí
            </Text>
            <Text style={[styles.bodyWrapNote, styles.bodyText]}>2 TC</Text>
          </View>
          <View style={[styles.bodyWrap]}>
            <Entypo
              name="open-book"
              size={24}
              color="black"
              style={[styles.bodyIcon]}
            />
            <Text style={[styles.bodyWrapText, styles.bodyText]}>
              Đại số tuyến tính
            </Text>
            <Text style={[styles.bodyWrapNote, styles.bodyText]}>2 TC</Text>
          </View>
          <View style={[styles.bodyWrap]}>
            <Entypo
              name="open-book"
              size={24}
              color="black"
              style={[styles.bodyIcon]}
            />
            <Text style={[styles.bodyWrapText, styles.bodyText]}>
              Thiết kế đồ họa
            </Text>
            <Text style={[styles.bodyWrapNote, styles.bodyText]}>3 TC</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: height / 7,
    alignItems: "center",
    justifyContent: "center",
  },
  wrap: {
    width: "95%",
    // height: "90%",
    // backgroundColor: "#565656",
    borderRadius: 5,
    borderWidth: 0.3,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#cfe2ff",
    alignItems: "center",
    padding: 3,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 600,
    paddingLeft: 5,
  },
  headerArrow: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  body: { padding: 5 },
  bodyWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  bodyIcon: {},
  bodyWrapText: {
    paddingLeft: 5,
  },
  bodyText: {
    color: "red",
    fontSize: 16,
  },
  bodyWrapNote: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
