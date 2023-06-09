import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

//import componet
import DropDown from "../share-componet/DropDown/DropDown";
import ItemDiemTrungBinh from "./screen/item-poup-bang-diem/item-diem-trung-binh";
import ItemMonHoc from "./screen/item-poup-bang-diem/item-mon-hoc";
import { useState } from "react";
import { QuyTrinhServices } from "../../../services/danhmuc.service";
import { useEffect } from "react";
import { FlatList } from "react-native";
import { createGuid } from "../../../common/common";
import SearchBar from "../share-componet/Searchbar";
import CheckBox from "../share-componet/check";
export const listKy = [
  { label: "Kỳ I", value: "I" },
  { label: "Kỳ II", value: "II" },
];

export const LISTNAM = () => {
  const currentDate = new Date();
  const _YEAR = currentDate.getFullYear();
  let arr = [...Array(_YEAR - 2020 + 10)].map((x, index) => {
    let _time = 2020 + index;
    return {
      label: `${_time}-${_time + 1}`,
      value: _time,
    };
  });
  return arr;
};

export default function BangDiem() {
  const [object, setObject] = useState({
    Nam: null,
    Ky: listKy[0].value,
  });

  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [lstMonHoc, setLstMonHoc] = useState([]);

  const [data, setData] = useState({});
  const getData = async () => {
    let res = await QuyTrinhServices.KetQuaHocTap.GetBangDiemOfSinhVien(object);
    if (res) {
      setData(res);
      setLstMonHoc(res.listMonHoc);
    }
  };
  const [listNam, setlistNam] = useState([{ label: "Tất cả", value: 0 }]);
  const getListNam = () => {
    for (
      let i = new Date().getFullYear() - 10;
      i <= new Date().getFullYear() + 20;
      i++
    ) {
      listNam.push({ value: i, label: `${i}-${i + 1}` });
    }
    setlistNam(listNam);
  };
  useEffect(() => {
    getListNam();
  }, []);
  useEffect(() => {
    getData();
  }, [object]);

  useEffect(() => {
    let arr = null;
    if (checked) {
      arr = data?.listMonHoc?.filter(
        (ele) =>
          (ele.MaMonHoc.toLowerCase().includes(input.toLocaleLowerCase()) ||
            ele.TenMonHoc.toLowerCase().includes(input.toLocaleLowerCase())) &&
          ele.DiemTongKet < 5
      );
    } else if (input.length) {
      arr = data?.listMonHoc?.filter(
        (ele) =>
          ele.MaMonHoc.toLowerCase().includes(input.toLocaleLowerCase()) ||
          ele.TenMonHoc.toLowerCase().includes(input.toLocaleLowerCase())
      );
    } else {
      arr = data?.listMonHoc;
    }
    setLstMonHoc(arr);
  }, [input, checked]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dropdown}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.left}>
                <DropDown
                  data={listNam}
                  object={object}
                  setObject={setObject}
                  header={"Nam"}
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
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.marginBottom_16}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.left}>
                <ItemDiemTrungBinh />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.right}>
                <ItemDiemTrungBinh />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <SearchBar input={input} setInput={setInput} />
          <CheckBox
            data={"Môn học không đạt"}
            checked={checked}
            setChecked={setChecked}
          />
        </View>
      </View>
      <View style={styles.content}>
        <FlatList
          // data={data?.listMonHoc}
          data={lstMonHoc}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <ItemMonHoc item={item} />
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={{ width: "100%", height: 450 }}></View>
          }
          keyExtractor={() => createGuid()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {},
  flex: {
    flexDirection: "row",
  },
  justify_content_between: {
    flex: 1,
  },
  dropdown: {
    marginBottom: 16,
  },
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
