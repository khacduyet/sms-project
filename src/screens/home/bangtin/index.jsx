import { Image, Pressable, Text } from "react-native";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { width } from "../../../common/constant";
import { Avatar, Button, Card } from "react-native-paper";
import Swiper from "react-native-swiper";

export default function BangTinComponent() {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerText]}>Bảng tin</Text>
        <Pressable style={[styles.headerArrow]} onPress={() => {}}>
          <Ionicons name="arrow-forward-circle" size={24} color="blue" />
        </Pressable>
      </View>
      <Swiper autoplay loop>
        {[...Array(6)].map((x, index) => {
          return (
            <Card key={index}>
              <Card.Cover
                borderRadius={0}
                source={require("../../../resources/background.png")}
              />
              <Card.Content>
                <Text variant="titleLarge" style={[styles.wrapText]}>
                  Ngày hội học sinh, sinh viên
                </Text>
                <Text variant="bodyMedium">
                  Tổ chức đoàn thanh niên cộng sản HCM, vào ngày 14/xx/xxxx đã
                  tổ chức
                </Text>
              </Card.Content>
            </Card>
          );
        })}
      </Swiper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  header: {
    width: "95%",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 600,
  },
  headerArrow: {
    position: "absolute",
    right: 5,
    top: 0,
  },
  wrap: {
    marginTop: 10,
    width: "90%",
  },
  //   body: { height: 200 },
  wrapText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 600,
  },
  bodyText: {},
});
