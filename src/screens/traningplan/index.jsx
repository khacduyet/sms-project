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
import { Colors, Screens } from "../../common/constant";
import { Checkbox, DataTable, TextInput } from "react-native-paper";
import { ModalMonHoc } from "../../common/modal";
import { useEffect, useState } from "react";
import { tabs } from "../schedules";
import { Card } from "react-native-paper";
import { QuyTrinhServices } from "../../services/danhmuc.service";
import { _stl, createGuid, romanize } from "../../common/common";
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
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState(``);
  const [item, setItem] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [listMon, setListMon] = useState([]);
  const [listKiemTra, setListKiemTra] = useState([]);
  const [listNgoaiHoc, setListNgoaiHoc] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ctdt, setCtdt] = useState(null);

  const getMonHoc = async () => {
    let _MonHoc = await QuyTrinhServices.SinhVien.GetChuongTrinhDaoTaoSV();
    let _NgoaiHoc =
      await QuyTrinhServices.SinhVien.GetChiTietThoiGianNgoaiHoc();
    console.log("_MonHoc", _MonHoc);
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
    if (_NgoaiHoc) {
      setListNgoaiHoc(_NgoaiHoc);
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
    <SafeAreaView style={[styles.container, _stl._container]}>
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
                editable={false}
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
                  show: show,
                  setShow: setShow,
                  listMon: listMon,
                  isLoading: isLoading,
                  listNgoaiHoc: listNgoaiHoc,
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
      <ModalMonHoc
        isVisible={show}
        onClose={() => {
          setShow(false);
        }}
        children={<ThoiGianNgoaiHoc item={listNgoaiHoc} />}
        title={`Chi tiết thời gian ngoài học`}
      />
    </SafeAreaView>
  );
}

const ColorTitle = `#000`;

const mh = StyleSheet.create({
  button: {
    height: 30,
    backgroundColor: Colors.Primary,
    width: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
    marginTop: 0,
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: 400,
  },
});

const _PADDINGLEFT_CELL = 5;

const TabMonHoc = ({ props }) => {
  return (
    <View>
      <TouchableOpacity
        style={[mh.button]}
        onPress={() => {
          props.setShow(true);
        }}
      >
        <Text style={[mh.buttonText]}>Thời gian ngoài học</Text>
      </TouchableOpacity>
      <DataTable>
        <DataTable.Header style={[tbl.header]}>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.TT }]}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            TT
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            Môn học/Modul
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.HK }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            Học kỳ
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.TC }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            Tín chỉ
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.TG }]}
            numberOfLines={3}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            TG (giờ)
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.HT }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
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
                  height: Platform.OS === "ios" ? 150 : 180,
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
            <View style={[tbl.cell, { flex: sizeWidthColumn.Ten }]}>
              <Text
                style={{ paddingLeft: _PADDINGLEFT_CELL }}
              >{`${x.MaMonHoc}`}</Text>
              <Text style={{ paddingLeft: _PADDINGLEFT_CELL }}>
                {x.TenMonHoc}
              </Text>
            </View>
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
                color={Colors.Primary}
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
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.TT }]}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            TT
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            Tên MH/MĐ
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
          >
            Điều kiện kiểm tra
          </DataTable.Title>
          <DataTable.Title
            style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
            numberOfLines={2}
            textStyle={{ color: ColorTitle, ...tbl.titleText }}
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
                <View
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.Ten },
                  ]}
                  numberOfLines={3}
                >
                  {item.item.listMon.map((x) => {
                    return (
                      <Text style={{ paddingLeft: _PADDINGLEFT_CELL }}>
                        - {x}
                      </Text>
                    );
                  })}
                </View>
                <View style={[tbl.cell, { flex: sizeWidthColumn.Ten }]}>
                  <Text style={{ paddingLeft: _PADDINGLEFT_CELL }}>
                    {item.item.DieuKienKiemTra}
                  </Text>
                </View>
                <View
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.Ten },
                  ]}
                >
                  {item.item.listPhuongPhapDanhGia.map((x) => {
                    return (
                      <Text style={{ paddingLeft: _PADDINGLEFT_CELL }}>
                        - {x}
                      </Text>
                    );
                  })}
                </View>
              </DataTable.Row>
            )}
            ListFooterComponent={<View style={{ height: 200 }}></View>}
          />
        )}
      </DataTable>
    </View>
  );
};

const ThoiGianNgoaiHoc = ({ item }) => {
  return (
    <View style={[{ width: "100%" }]}>
      <View>
        <DataTable>
          <DataTable.Header style={[tbl.header]}>
            <DataTable.Title
              style={[tbl.title, { flex: 0.3 }]}
              textStyle={{ color: ColorTitle }}
            >
              TT
            </DataTable.Title>
            <DataTable.Title
              style={[tbl.title, { flex: sizeWidthColumn.Ma }]}
              numberOfLines={2}
              textStyle={{ color: ColorTitle }}
            >
              Nội dung
            </DataTable.Title>
            <DataTable.Title
              style={[tbl.title, { flex: sizeWidthColumn.TT }]}
              numberOfLines={2}
              textStyle={{ color: ColorTitle }}
            >
              Học kỳ
            </DataTable.Title>
            <DataTable.Title
              style={[tbl.title, { flex: sizeWidthColumn.Ma }]}
              numberOfLines={2}
              textStyle={{ color: ColorTitle }}
            >
              Từ ngày
            </DataTable.Title>
            <DataTable.Title
              style={[tbl.title, { flex: sizeWidthColumn.Ma }]}
              numberOfLines={2}
              textStyle={{ color: ColorTitle }}
            >
              Đến ngày
            </DataTable.Title>
          </DataTable.Header>
          <FlatList
            style={{ maxHeight: 500 }}
            data={item}
            renderItem={(x) => (
              <DataTable.Row style={[tbl.row]}>
                <DataTable.Cell
                  style={[tbl.cell, { justifyContent: "center", flex: 0.3 }]}
                >
                  {x.index + 1}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[tbl.cell, { flex: sizeWidthColumn.Ma }]}
                  textStyle={{ paddingLeft: 5 }}
                >
                  {x.item.NoiDung}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.TT },
                  ]}
                >
                  {x.item.HocKy}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.Ma },
                  ]}
                >
                  {x.item.TuNgay}
                </DataTable.Cell>
                <DataTable.Cell
                  style={[
                    tbl.cell,
                    { justifyContent: "center", flex: sizeWidthColumn.Ma },
                  ]}
                >
                  {x.item.DenNgay}
                </DataTable.Cell>
              </DataTable.Row>
            )}
            keyExtractor={(item) => item.index}
          />
        </DataTable>
      </View>
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
    backgroundColor: Colors.HeaderTitle,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontWeight: 600,
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
    fontWeight: 600,
  },
});
