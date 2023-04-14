import { useCallback, useState } from "react";
import { FlatList } from "react-native";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { createGuid, formatDateStringGMT } from "../../common/common";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Colors } from "../../common/constant";
import { MonthPicker } from "../../common/modal";

const TextButtonTab = {
  LichHoc: "Lịch học",
  LichThi: "Lịch thi",
};

// View Thời khóa biểu
export default function SchedulePage() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <SafeAreaView>
      <View style={[styles.container]}>
        <View style={[styles.tab]}>
          <TouchableOpacity
            style={[styles.buttonTab, tabIndex === 0 && styles.buttonTabActive]}
            onPress={() => {
              setTabIndex(0);
            }}
          >
            <Text
              style={[
                styles.buttonTabText,
                tabIndex === 0 && styles.buttonTabTextActive,
              ]}
            >
              {TextButtonTab.LichHoc}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonTab, tabIndex === 1 && styles.buttonTabActive]}
            onPress={() => {
              setTabIndex(1);
            }}
          >
            <Text
              style={[
                styles.buttonTabText,
                tabIndex === 1 && styles.buttonTabTextActive,
              ]}
            >
              {TextButtonTab.LichThi}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[bodys.container]}>
          {tabIndex === 0 && <TabLichThi />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const tkb = [
  {
    Thu: "Thứ Hai",
    Ngay: "21",
    MaLop: "CNTT01_k43",
    IdLop: "string",
    listChiTiet: [
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
    ],
  },
  {
    Thu: "Thứ Ba",
    Ngay: "22",
    MaLop: "CNTT01_k43",
    IdLop: "string",
    listChiTiet: [
      {
        IdDsMonHoc: "string",
        TenMonHoc: "Đại số tuyến tính",
        IdGiaoVien: "string",
        TenGiaoVien: "Mai Đình Trình",
        Phong: "P301",
        ThoiGian: "Tiết 3-4 (8:15 - 10:00)",
        SoTinChi: "3",
      },
    ],
  },
  {
    Thu: "Thứ Tư",
    Ngay: "23",
    MaLop: "CNTT01_k43",
    IdLop: "string",
    listChiTiet: [
      {
        IdDsMonHoc: "string",
        TenMonHoc: "Đại số tuyến tính",
        IdGiaoVien: "string",
        TenGiaoVien: "Mai Đình Trình",
        Phong: "P301",
        ThoiGian: "Tiết 3-4 (8:15 - 10:00)",
        SoTinChi: "3",
      },
    ],
  },
  {
    Thu: "Thứ Năm",
    Ngay: "24",
    MaLop: "CNTT01_k43",
    IdLop: "string",
    listChiTiet: [
      {
        IdDsMonHoc: "string",
        TenMonHoc: "Đại số tuyến tính",
        IdGiaoVien: "string",
        TenGiaoVien: "Mai Đình Trình",
        Phong: "P301",
        ThoiGian: "Tiết 3-4 (8:15 - 10:00)",
        SoTinChi: "3",
      },
    ],
  },
  {
    Thu: "Thứ Sáu",
    Ngay: "25",
    MaLop: "CNTT01_k43",
    IdLop: "string",
    listChiTiet: [
      {
        IdDsMonHoc: "string",
        TenMonHoc: "Đại số tuyến tính",
        IdGiaoVien: "string",
        TenGiaoVien: "Mai Đình Trình",
        Phong: "P301",
        ThoiGian: "Tiết 3-4 (8:15 - 10:00)",
        SoTinChi: "3",
      },
    ],
  },
];
const data = [
  "T2/2022",
  "T3/2022",
  "T4/2022",
  "T5/2022",
  "T6/2022",
  "T7/2022",
  "T8/2022",
  "T9/2022",
  "T10/2022",
  "T11/2022",
  "T12/2022",
];

const ItemSchedule = ({ item }) => {
  return (
    <View style={bodys.itemFlat}>
      <View style={bodys.itemFlatLeft}>
        <View style={bodys.itemFlatLeftCircle}>
          <Text style={{}}>{item.Thu}</Text>
          <Text style={{ fontSize: 22, fontWeight: 600 }}>{item.Ngay}</Text>
          <Text>{item.Ngay}</Text>
        </View>

        <Ionicons
          name="radio-button-on"
          size={24}
          color="blue"
          style={{ position: "absolute", top: -7, right: -13.8 }}
        />
      </View>
      <View style={bodys.itemFlatRight}>
        {item.listChiTiet.map((x, idx) => {
          return <ItemChildSchedule data={x} maLop={item.MaLop} key={idx} />;
        })}
      </View>
    </View>
  );
};

const ItemChildSchedule = ({ data, maLop }) => {
  return (
    <View style={items.wrap}>
      <View style={items.header}>
        <View style={items.headerLeft}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text style={items.headerleftTime}>{data.ThoiGian}</Text>
        </View>
        <View style={items.headerRight}>
          <Text style={items.headerRightText}>{maLop}</Text>
        </View>
      </View>
      <View style={items.body}>
        <View style={items.bodyItem}>
          <Entypo name="open-book" size={24} color="black" />
          <Text style={items.bodyText}>{data.TenMonHoc}</Text>
        </View>
        <View style={items.bodyItem}>
          <FontAwesome5 name="chalkboard-teacher" size={20} color="black" />
          <Text style={items.bodyText}>{data.TenGiaoVien}</Text>
        </View>
        <View style={items.bodyItem}>
          <EvilIcons name="location" size={24} color="black" />
          <Text style={items.bodyText}>{data.Phong}</Text>
        </View>
      </View>
    </View>
  );
};

function TabLichThi() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);

  const [date, setDate] = useState(data[0]);
  const [show, setShow] = useState(false);

  const onHide = () => {
    setShow(false);
  };

  const onFinish = (value) => {
    setDate(value);
    onHide();
  };

  return (
    <View style={[bodys.wrap]}>
      <View style={[bodys.wrapTop]}>
        <TouchableOpacity
          style={[bodys.dateButton]}
          onPress={() => {
            setShow(true);
          }}
        >
          <Text style={[bodys.dateText]}>{date}</Text>
        </TouchableOpacity>

        <View style={[bodys.dropdown]}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={bodys.dropdownBox}
            textStyle={bodys.dropdownText}
          />
        </View>
        {show && (
          <MonthPicker
            onClose={onHide}
            isVisible={show}
            data={data}
            onFinish={onFinish}
          />
        )}
      </View>
      <View style={[bodys.wrapContent]}>
        <FlatList
          data={tkb}
          renderItem={({ item }) => <ItemSchedule item={item} />}
          keyExtractor={(item) => item.Ngay}
          ListHeaderComponent={
            <View style={{ width: "100%", height: 10 }}></View>
          }
          ListFooterComponent={
            <View style={{ marginTop: 100, width: "100%", height: 100 }}></View>
          }
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    height: "100%",
    width: "100%",
  },
  tab: {
    flexDirection: "row",
  },
  buttonTab: {
    flex: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginTop: 0,
  },
  buttonTabActive: {
    borderBottomWidth: 2,
    borderColor: "#2f4bfb",
    borderRadius: 5,
  },
  buttonTabTextActive: {
    color: "#2f4bfb",
  },
  buttonTabText: {},
};

const bodys = {
  container: {
    width: "100%",
    height: "100%",
    // backgroundColor: "#ccc",
  },
  wrap: {},
  wrapTop: {
    marginTop: 10,
    margin: 5,
    flexDirection: "row",
  },
  wrapContent: {
    height: "100%",
  },
  dateButton: {
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
  },
  dropdown: {
    flex: 3,
    margin: 5,
  },
  dropdownBox: {
    paddingHorizontal: 15,
  },
  dropdownText: {
    fontSize: 13,
  },

  itemFlat: {
    width: "100%",
    // backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginBottom: 15,
    flexDirection: "row",
  },
  itemFlatLeft: {
    flex: 1,
    borderRightWidth: 2,
    borderColor: "blue",
  },
  itemFlatRight: {
    flex: 3,
  },
  itemFlatLeftCircle: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    borderWidth: 3,
    borderColor: Colors.Primary,
    alignItems: "center",
    justifyContent: "center",
  },
};

const items = {
  wrap: {
    width: "97%",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
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
    paddingBottom: 5,
  },
  bodyText: {
    paddingLeft: 8,
  },
};
