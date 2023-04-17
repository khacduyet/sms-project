import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, height, width } from "../../../common/constant";
import { ItemChildSchedule, ItemSchedule } from "../../schedules";

const data = [
  {
    IdDsMonHoc: "string",
    TenMonHoc: "Tin học đại cương",
    IdGiaoVien: "string",
    TenGiaoVien: "Hoàng Thị Ngân",
    Phong: "P301",
    ThoiGian: "Tiết 1-2 (7:30 - 8:00)",
    SoTinChi: "3",
  },
  {
    IdDsMonHoc: "string",
    TenMonHoc: "Tin học đại cương",
    IdGiaoVien: "string",
    TenGiaoVien: "Hoàng Thị Ngân",
    Phong: "P301",
    ThoiGian: "Tiết 1-2 (7:30 - 8:00)",
    SoTinChi: "3",
  },
  {
    IdDsMonHoc: "string",
    TenMonHoc: "Tin học đại cương",
    IdGiaoVien: "string",
    TenGiaoVien: "Hoàng Thị Ngân",
    Phong: "P301",
    ThoiGian: "Tiết 1-2 (7:30 - 8:00)",
    SoTinChi: "3",
  },
];

export default function LichHocHomNayComponent() {
  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <Text style={[styles.headerTitle, styles.textColor]}>
          Lịch học hôm nay (....)
        </Text>
        <TouchableOpacity style={[styles.headerButton]}>
          <Text style={[styles.headerButtonText, styles.textColor]}>
            Xem chi tiết
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.body]}>
        <ScrollView
          style={styles.scrollView}
          horizontal
          scrollEventThrottle={16}
          //   pagingEnabled
        >
          {data.map((x, index) => {
            return (
              <ItemChildSchedule
                key={index}
                data={x}
                maLop={``}
                style={items}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    width: "95%",
    backgroundColor: Colors.Primary,
    borderRadius: 5,
    marginTop: 5,
  },
  header: {
    height: "20%",
    justifyContent: "center",
  },
  textColor: {
    color: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    marginLeft: 10,
  },
  headerButton: {
    height: "100%",
    position: "absolute",
    top: 0,
    right: 10,
    justifyContent: "center",
  },
  headerButtonText: {},
  body: {
    height: "75%",
  },
  scrollView: {
    // backgroundColor: "pink",
    borderRadius: 5,
  },
});

const items = {
  wrap: {
    width: width / 1.3,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 0,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cfe2ff",
    borderBottomWidth: 1,
    padding: 2,
  },
  headerLeft: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  headerleftTime: {
    fontWeight: 600,
    paddingLeft: 8,
  },
  headerRight: {
    flex: 2,
    alignItems: "flex-end",
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
    paddingBottom: 10,
  },
  bodyText: {
    paddingLeft: 8,
  },
};