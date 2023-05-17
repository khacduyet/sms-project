import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBack from "../../common/header";
import { Screens } from "../../common/constant";
import { Checkbox, DataTable, TextInput } from "react-native-paper";
import { ModalMonHoc } from "../../common/modal";
import { useEffect, useState } from "react";
import { tabs } from "../schedules";
import { Card } from "react-native-paper";
import { QuyTrinhServices } from "../../services/danhmuc.service";
import { createGuid, romanize } from "../../common/common";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Platform } from "react-native";

const sizeWidthColumn = {
  TT: 0.7,
  Ma: 1.5,
  Ten: 4,
  HK: 1,
  TC: 1,
  TG: 1.4,
  HT: 1.1,
};
const TextButtonTab = {
  MonHoc: "Môn học",
  KiemTra: "KT kết thúc khóa học",
  Test: "Box",
};

export const Loading = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "50%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

export default function TrainingPlanPage() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(``);
  const [item, setItem] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [listMon, setListMon] = useState([]);
  const [listKiemTra, setListKiemTra] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ctdt, setCtdt] = useState(null);

  const getMonHoc = async () => {
    let _MonHoc = await QuyTrinhServices.SinhVien.GetChuongTrinhDaoTaoSV();
    if (_MonHoc) {
      setCtdt(_MonHoc.TenChuongTrinhDaoTao);
      let data = _MonHoc.listLoaiMon.map((x, index) => {
        let _temp = x.listMonHoc.map((y, idx) => {
          return {
            ...y,
            isHoanThanh: idx === 0 ? true : false,
          };
        });
        return {
          ...x,
          listMonHoc: _temp,
        };
      });
      setListMon(data);
      setIsLoading(false);
    }
  };
  const getKiemTra = async () => {
    let _KiemTra = await QuyTrinhServices.SinhVien.GetKTKetThucKhoaHoc();
    if (_KiemTra) {
      setListKiemTra(_KiemTra.listKetthucMonHoc);
    }
  };

  useEffect(() => {
    getMonHoc();
    getKiemTra();
  }, []);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <HeaderBack header={Screens.TrainingPlan} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={[tabs.container]}>
          <View style={[tabs.tab]}>
            <TouchableOpacity
              style={[tabs.buttonTab, tabIndex === 0 && tabs.buttonTabActive]}
              onPress={() => {
                setTabIndex(0);
              }}
            >
              <Text
                style={[
                  tabs.buttonTabText,
                  tabIndex === 0 && tabs.buttonTabTextActive,
                ]}
              >
                {TextButtonTab.MonHoc}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[tabs.buttonTab, tabIndex === 1 && tabs.buttonTabActive]}
              onPress={() => {
                setTabIndex(1);
              }}
            >
              <Text
                style={[
                  tabs.buttonTabText,
                  tabIndex === 1 && tabs.buttonTabTextActive,
                ]}
              >
                {TextButtonTab.KiemTra}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={[tabs.buttonTab, tabIndex === 2 && tabs.buttonTabActive]}
              onPress={() => {
                setTabIndex(2);
              }}
            >
              <Text
                style={[
                  tabs.buttonTabText,
                  tabIndex === 2 && tabs.buttonTabTextActive,
                ]}
              >
                {TextButtonTab.Test}
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={[styles.wrapper]}>
            <View style={[s.header]}>
              <Text style={[s.text]}>Kế hoạch đào tạo:</Text>
              <TextInput
                disabled
                value={ctdt}
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#fff",
                  color: "#000",
                }}
              />
            </View>
          </View>
          <View style={[tabs.container]}>
            {tabIndex === 0 && (
              <TabMonHoc
                props={{
                  setItem: setItem,
                  setTitle: setTitle,
                  setVisible: setVisible,
                  visible: visible,
                  listMon: listMon,
                  isLoading: isLoading,
                }}
              />
            )}
            {tabIndex === 1 && (
              <TabKiemTra
                props={{
                  listKiemTra: listKiemTra,
                  isLoading: isLoading,
                }}
              />
            )}
            {/* {tabIndex === 2 && (
              <Test
                props={{
                  listMon: listMon,
                }}
              />
            )} */}
          </View>
        </View>
      </KeyboardAvoidingView>
      <ModalMonHoc
        isVisible={visible}
        onClose={onClose}
        children={<ItemModal item={item} />}
        title={title}
      />
    </SafeAreaView>
  );
}

const _data = [
  {
    MaMonHoc: `MH01`,
    TenMonHoc: `Pháp luật`,
    HocKy: `I`,
    TinChi: 2,
    ThoiGian: 100,
    isPass: false,
  },
  {
    MaMonHoc: `MH02`,
    TenMonHoc: `Tiếng anh`,
    HocKy: `I`,
    TinChi: 2,
    ThoiGian: 100,
    isPass: false,
  },
  {
    MaMonHoc: `MH04`,
    TenMonHoc: `Giáo dục quốc phòng`,
    HocKy: `II`,
    TinChi: 1,
    ThoiGian: 75,
    isPass: false,
  },
];

const Test = ({ props }) => {
  return (
    <View style={[styles.wrapper]}>
      <FlatList
        data={[{}]}
        renderItem={(item) => (
          <View>
            {props?.listMon.map((x, idx) => {
              return (
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      marginLeft: 10,
                      marginBottom: 10,
                    }}
                  >
                    {x.TenLoaiMon}
                  </Text>
                  {x.listMonHoc.map((item) => {
                    return <Box item={item} />;
                  })}
                </View>
              );
            })}
          </View>
        )}
        keyExtractor={(item) => item.index}
        ListFooterComponent={<View style={{ height: 100 }}></View>}
      />
    </View>
  );
};

const Box = ({ item }) => {
  return (
    <Card style={[t.box, item.isHoanThanh ? t.isPass : {}]}>
      {/* <Image
        source={require("../../resources/tickgreen.png")}
        style={[t.image]}
      /> */}
      {item.isHoanThanh && (
        <AntDesign
          name="checkcircle"
          size={35}
          color="#46CD5A"
          style={[t.image]}
        />
      )}
      <Card.Title
        title={`${item.MaMonHoc} - ${item.TenMonHoc} (${item.TongSoGio} giờ)`}
        titleStyle={[t.title]}
      />
      <Card.Content>
        <View style={[t.flexBox]}>
          <Text style={[t.text]}>Học kỳ: {item.HocKy}</Text>
          <Text style={[t.text]}>Tín chỉ: {item.TinChi}</Text>
          <Text style={[t.text, t.textPrio]}>
            Điểm tổng kết: {item.DiemTongKet ?? `__`}
          </Text>
        </View>
        <View style={[t.flexBox]}>
          <Text style={[t.text]}>LT: {item.LT}</Text>
          <Text style={[t.text]}>TH: {item.TH}</Text>
          <Text style={[t.text, t.textPrio]}>KT: {item.KT}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const t = StyleSheet.create({
  box: {
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
  },
  flexBox: {
    flexDirection: "row",
  },
  text: {
    flex: 1,
    fontSize: 15,
    marginBottom: 5,
  },
  textPrio: {
    flex: 2,
  },
  isPass: {
    backgroundColor: "#ccc",
  },
  image: {
    position: "absolute",
    top: -10,
    right: 0,
    zIndex: 3,
  },
});

const TabMonHoc = ({ props }) => {
  return (
    <View>
      <DataTable>
        <DataTable.Header style={[tbl.header]}>
          <DataTable.Title style={[tbl.title, { flex: sizeWidthColumn.TT }]}>
            TT
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ma }]}
            numberOfLines={2}
          >
            Mã học phần
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
          >
            Tên học phần
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.HK }]}
            numberOfLines={2}
          >
            Học kỳ
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.TC }]}
            numberOfLines={2}
          >
            Tín chỉ
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.TG }]}
            numberOfLines={3}
          >
            Thời gian (giờ)
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.HT }]}
            numberOfLines={2}
          >
            Hoàn thành
          </DataTable.Title>
        </DataTable.Header>
        {props.isLoading && <Loading />}
        {!props.isLoading && (
          <FlatList
            // style={{ flex: 1 }}
            data={props.listMon}
            renderItem={(item) => <RowContainer _item={item} props={props} />}
            keyExtractor={(item) => item.index}
            ListFooterComponent={
              <View
                style={{
                  marginTop: 200,
                  width: "100%",
                  height: Platform.OS === "ios" ? 120 : 150,
                }}
              ></View>
            }
          />
        )}
      </DataTable>
    </View>
  );
};

const RowContainer = ({ _item, props }) => {
  let item = _item.item;
  return (
    <>
      <DataTable.Row style={[tbl.row]}>
        <DataTable.Cell
          style={[tbl.cell, { fontWeight: "bold", paddingLeft: 10 }]}
        >
          {romanize(_item.index + 1)}. {item.TenLoaiMon}
        </DataTable.Cell>
      </DataTable.Row>
      {item?.listMonHoc?.map((x, index) => {
        return (
          <DataTable.Row
            style={[tbl.row]}
            onPress={(e) => {
              props.setTitle(`${x.MaMonHoc} - ${x.TenMonHoc}`);
              props.setItem(x);
              props.setVisible(true);
            }}
          >
            <DataTable.Cell
              style={[
                tbl.cell,
                { justifyContent: "center", flex: sizeWidthColumn.TT },
              ]}
            >
              {x.STT}
            </DataTable.Cell>
            <DataTable.Cell
              style={[
                tbl.cell,
                { justifyContent: "center", flex: sizeWidthColumn.Ma },
              ]}
            >
              {x.MaMonHoc}
            </DataTable.Cell>
            <DataTable.Cell
              style={[tbl.cell, { flex: sizeWidthColumn.Ten, paddingLeft: 5 }]}
            >
              {x.TenMonHoc}
            </DataTable.Cell>
            <DataTable.Cell
              style={[
                tbl.cell,
                { justifyContent: "center", flex: sizeWidthColumn.HK },
              ]}
            >
              {x.HocKy}
            </DataTable.Cell>
            <DataTable.Cell
              style={[
                tbl.cell,
                { justifyContent: "center", flex: sizeWidthColumn.TC },
              ]}
            >
              {x.TinChi}
            </DataTable.Cell>
            <DataTable.Cell
              style={[
                tbl.cell,
                { justifyContent: "center", flex: sizeWidthColumn.TG },
              ]}
            >
              {x.TongSoGio}
            </DataTable.Cell>
            <DataTable.Cell
              style={[
                tbl.cell,
                { justifyContent: "center", flex: sizeWidthColumn.HT },
              ]}
              numeric
            >
              <Checkbox.Android
                value={true}
                status={x.isHoanThanh ? "checked" : "unchecked"}
              />
            </DataTable.Cell>
          </DataTable.Row>
        );
      })}
    </>
  );
};

const TabKiemTra = ({ props }) => {
  return (
    <View>
      <Text style={[styles.wrapper]}>
        Quy định kiểm tra kết thúc khóa học:{" "}
      </Text>
      <DataTable>
        <DataTable.Header style={[tbl.header]}>
          <DataTable.Title style={[tbl.title, { flex: sizeWidthColumn.TT }]}>
            TT
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
          >
            Môn học
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
          >
            Điều kiện kiểm tra
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
          >
            Phương pháp đánh giá
          </DataTable.Title>
        </DataTable.Header>
        {props.isLoading && <Loading />}
        {!props.isLoading && (
          <FlatList
            data={props.listKiemTra}
            renderItem={(item) => (
              <DataTable.Row style={[tbl.row]} onPress={(e) => {}}>
                <DataTable.Cell
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.TT },
                  ]}
                >
                  {item.index + 1}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.Ten },
                  ]}
                  numberOfLines={3}
                >
                  {item.item.listMon.map((x) => {
                    return <Text>- {x}</Text>;
                  })}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[tbl.cell, { flex: sizeWidthColumn.Ten }]}
                >
                  {item.item.DieuKienKiemTra}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.Ten },
                  ]}
                >
                  {item.item.listPhuongPhapDanhGia.map((x) => {
                    return <Text>- {x}</Text>;
                  })}
                </DataTable.Cell>
              </DataTable.Row>
            )}
            ListFooterComponent={<View style={{ height: 200 }}></View>}
          />
        )}
      </DataTable>
    </View>
  );
};

const ItemModal = ({ item }) => {
  return (
    <View style={[i.container]}>
      <View style={[i.wrap]}>
        <Text style={[i.text]}>Tổng thời gian </Text>
        <Text style={[i.text]}>Trong đó </Text>
        <Text style={[i.text]}>Điểm tổng kết </Text>
      </View>
      <View style={[i.wrap, { flex: 6 }]}>
        <Text style={[i.text]}>: {item.TongSoGio} giờ </Text>
        <Text style={[i.text]}>
          : LT: {item.LT}; TH: {item.TH}; KT: {item.KT}{" "}
        </Text>
        <Text style={[i.text]}>: {item.DiemTongKet ?? `__`} </Text>
      </View>
    </View>
  );
};
// style ItemModal
const i = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  wrap: {
    flex: 5,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "column",
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
  },
});
// end style ItemModal

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    margin: 5,
  },
});

const tbl = StyleSheet.create({
  header: {},
  title: {
    borderWidth: 0.2,
    backgroundColor: "#cfe2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {},
  cell: {
    borderWidth: 0.2,
  },
});

const s = StyleSheet.create({
  header: {
    width: "100%",
  },
  text: {
    fontSize: 16,
  },
});
