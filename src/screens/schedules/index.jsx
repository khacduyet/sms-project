import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { createGuid, DateToFirstLastDateInMonth } from "../../common/common";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Colors, height } from "../../common/constant";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconButton } from "react-native-paper";
import { QuyTrinhServices } from "../../services/danhmuc.service";
import { ActivityIndicator } from "react-native";

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
          {tabIndex === 0 && <TabLichHoc />}
          {tabIndex === 1 && <TabLichThi />}
        </View>
      </View>
    </SafeAreaView>
  );
}

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
      height: 200,
      alignItems: "center",
      justifyContent: "flex-start",
    }}
  >
    <Text>Chúc bạn có một ngày học tập tốt...</Text>
  </View>
);

// #region Lịch thi
function TabLichThi() {
  const [testSchedules, setTestSchedules] = useState([{}, {}, {}]);
  return (
    <View style={[styles.container]}>
      <View style={[lichthis.header]}>
        <Text style={[lichthis.headerText]}>Lịch thi học kỳ I 2022-2023</Text>
        <View style={[lichthis.buttonWrap]}>
          <TouchableOpacity onPress={() => {}} style={[lichthis.button]}>
            <MaterialCommunityIcons
              name="book-edit-outline"
              size={24}
              color="white"
            />
            <Text style={[lichthis.buttonText]}>Điều kiện thi</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[lichthis.body]}>
        <FlatList
          data={testSchedules}
          renderItem={({ item }) => (
            <ItemTestSchedule item={item} style={items} />
          )}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={ListEmptyComponent}
          ListHeaderComponent={
            <View style={{ width: "100%", height: 10 }}></View>
          }
          ListFooterComponent={testSchedules.length && ListFooterComponent}
        />
      </View>
    </View>
  );
}

const ItemTestSchedule = ({ item, style }) => {
  return (
    <View style={[style.wrap]}>
      <View style={[style.header]}>
        <View style={[style.headerLeft]}>
          <Entypo name="open-book" size={24} color="black" />
          <Text
            style={[style.bodyText, { fontWeight: 600, color: Colors.Danger }]}
          >
            MH04 - Thực hành cơ khí (2TC)
          </Text>
        </View>
        <View style={[style.headerRight]}>
          <Text style={[style.headerRightText]}>CNTT01_K43</Text>
        </View>
      </View>
      <View style={[style.body]}>
        <View style={[style.bodyItem, { flexDirection: "row" }]}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <AntDesign name="calendar" size={24} color="black" />
            <Text style={[style.headerleftTime]}>Thứ 3, 25/05/2023</Text>
          </View>

          <Text
            style={[
              {
                color: Colors.Warning,
                alignItems: "flex-end",
                fontStyle: "italic",
                fontWeight: 500,
              },
            ]}
          >
            44 ngày nữa
          </Text>
        </View>
        <View style={[style.bodyItem]}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <Text style={[style.headerleftTime]}>15:00 - 16:00</Text>
        </View>
        <View style={[style.bodyItem, { flexDirection: "row" }]}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <EvilIcons name="location" size={24} color="black" />
            <Text style={[style.bodyText]}>Xưởng 602</Text>
          </View>

          <Text
            style={[
              {
                color: Colors.Warning,
                alignItems: "flex-end",
                fontStyle: "italic",
                fontWeight: 500,
              },
            ]}
          >
            Thi giữa kỳ
          </Text>
        </View>
      </View>
    </View>
  );
};

const lichthis = StyleSheet.create({
  buttonWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.Primary,
    padding: 3,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    paddingLeft: 3,
  },
  headerText: {
    flex: 2,
    fontSize: 16,
    fontWeight: 600,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  body: {},
});
// #endregion Lịch thi

// #region Lịch học
const data = () => {
  let _month = [];
  let _currentYear = new Date().getFullYear();
  [...Array(5)].forEach((x, index) => {
    [...Array(12)].forEach((y, idx) => {
      _month.push({
        label: `Tháng ${idx + 1}/${_currentYear - 2 + index}`,
        value: new Date(_currentYear - 2 + index, idx, 1),
      });
    });
  });
  return _month;
};

const WeekSchedule = ({ item }) => {
  return (
    <>
      <View style={bodys.weekWrap}>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 600,
            fontSize: 16,
          }}
        >
          Tuần {item?.Tuan}
        </Text>
        <View style={{ flex: 3, borderBottomWidth: 1 }}></View>
      </View>
      {item?.listChiTiet.map((x, index) => {
        return <ItemSchedule item={x} key={`${index}-${item?.Tuan}`} />;
      })}
    </>
  );
};

export const ItemSchedule = ({ item }) => {
  let _date = new Date(item.Ngay);
  return (
    <View style={bodys.itemFlat}>
      <View style={bodys.itemFlatLeft}>
        <View style={bodys.itemFlatLeftCircle}>
          <Text style={{ fontSize: 12 }}>{item.Thu}</Text>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            {_date?.getDate()}
          </Text>
          <Text style={{ fontSize: 12, textAlign: "center" }}>{`${
            _date?.getMonth() + 1
          }/${_date?.getFullYear()}`}</Text>
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
          return (
            <ItemChildSchedule
              data={x}
              maLop={item.MaLop}
              key={`${idx}-${x.ThoiGian}`}
              style={items}
            />
          );
        })}
      </View>
    </View>
  );
};

export const ItemChildSchedule = ({ data, maLop, style }) => {
  return (
    <View style={[style.wrap]}>
      <View style={[style.header]}>
        <View style={[style.headerLeft]}>
          <AntDesign
            name="clockcircleo"
            size={24}
            color="black"
            style={{ padding: 3 }}
          />
          <Text style={[style.headerleftTime]}>{data.ThoiGian}</Text>
        </View>
        <View style={[style.headerRight]}>
          <Text style={[style.headerRightText]}>{maLop}</Text>
        </View>
      </View>
      <View style={[style.body]}>
        <View style={[style.bodyItem]}>
          <Entypo
            name="open-book"
            size={24}
            color="black"
            style={{ paddingLeft: 3 }}
          />
          <Text style={[style.bodyText]}>{data.TenMonHoc}</Text>
        </View>
        <View style={[style.bodyItem]}>
          <FontAwesome5
            name="chalkboard-teacher"
            size={20}
            color="black"
            style={{ paddingLeft: 3 }}
          />
          <Text style={[style.bodyText]}>{data.TenGiaoVien}</Text>
        </View>
        <View style={[style.bodyItem]}>
          <EvilIcons
            name="location"
            size={24}
            color="black"
            style={{ paddingLeft: 3 }}
          />
          <Text style={[style.bodyText]}>{data.Phong}</Text>
        </View>
      </View>
    </View>
  );
};

function TabLichHoc() {
  const [time, setTime] = useState(data());
  const [timeActive, setTimeActive] = useState(20);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOptions = async () => {
    let _thisTime = time[timeActive];
    let _time = DateToFirstLastDateInMonth(_thisTime.value);
    let data = {
      Nam: _thisTime.value.getFullYear(),
      TuNgayUnix: _time.FirstUnix,
      DenNgayUnix: _time.LastUnix,
    };
    let tkb = await QuyTrinhServices.ThoiKhoaBieu.GetThoiKhoaBieuSV(data);
    if (tkb) {
      setSchedules(tkb);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOptions();
  }, [timeActive]);

  const handleChangeWeek = (_atc) => {
    setLoading(true);
    setTimeActive(_atc);
  };

  return (
    <View style={[bodys.wrap]}>
      {/* <View style={[bodys.wrapTop]}> */}
      <View style={[bodys.wrapTop]}>
        <IconButton
          icon={() => {
            return (
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color={timeActive === 0 ? "#ccc" : "black"}
              />
            );
          }}
          disabled={timeActive === 0}
          size={15}
          style={{ flex: 1, alignItems: "flex-start" }}
          onPress={() => {
            let _atc = timeActive - 1;
            if (_atc >= 0) {
              handleChangeWeek(_atc);
            }
          }}
        />
        <Text
          style={{
            flex: 2,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          {time[timeActive].label}
        </Text>
        <IconButton
          icon={() => {
            return (
              <MaterialIcons
                name="arrow-forward-ios"
                size={24}
                color={timeActive === time.length - 1 ? "#ccc" : "black"}
              />
            );
          }}
          size={15}
          style={{ flex: 1, alignItems: "flex-end" }}
          disabled={timeActive === time.length - 1}
          onPress={() => {
            let _atc = timeActive + 1;
            if (_atc < time.length) {
              handleChangeWeek(_atc);
            }
          }}
        />

        {/* <TouchableOpacity
          style={[bodys.dateButton]}
          onPress={() => {
            setShow(true);
          }}
        >
          <Text style={[bodys.dateText]}>{date}</Text>
        </TouchableOpacity>

        {show && (
          <MonthPicker
            onClose={onHide}
            isVisible={show}
            data={data()}
            onFinish={onFinish}
          />
        )} */}
      </View>
      <View style={[bodys.wrapContent]}>
        {loading && (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: height / 2,
            }}
          >
            <ActivityIndicator size={36} />
          </View>
        )}
        {!loading && (
          <FlatList
            data={schedules}
            renderItem={({ item }) => <WeekSchedule item={item} />}
            keyExtractor={() => createGuid()}
            ListEmptyComponent={ListEmptyComponent}
            ListHeaderComponent={
              <View style={{ width: "100%", height: 10 }}></View>
            }
            ListFooterComponent={schedules.length && ListFooterComponent}
          />
        )}
      </View>
    </View>
  );
}
// #endregion Lịch học

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
  weekWrap: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 0,
  },
  wrapTop: {
    // margin: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapContent: {
    height: "100%",
    // alignItems: "center",
    // justifyContent: "center",
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
    marginLeft: 10,
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
