import * as React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { QuyTrinhServices } from "../../../../services/danhmuc.service";
import { ToastMessage } from "../../../../common/components";

export default function LienHe() {
  const [syll, setSyll] = useState({
    TenGhep: "",
    GioiTinh: 0,
    NgaySinh: null,
    itemSYLL: {},
  });
  const setForm = (value, prop, propObj) => {
    if (value !== undefined) {
      if (propObj) {
        setSyll({
          ...syll,
          [propObj]: {
            ...syll[propObj],
            [prop]: value,
          },
        });
        return;
      }
      setSyll({
        ...syll,
        [prop]: value,
      });
    }
  };
  // ------ Api ------
  const GetSoYeuLyLichSinhVien = async () => {
    let res = await QuyTrinhServices.ThongTinCaNhan.GetSoYeuLyLichSinhVien();
    if (res) {
      // setItemSYLL(res.itemSYLL)
      setSyll(res);
    }
  };
  useEffect(() => {
    GetSoYeuLyLichSinhVien();
  }, []);

  const GhiLai = async () => {
    let res = await QuyTrinhServices.ThongTinCaNhan.SetSoYeuLyLichSinhVien(
      syll
    );
    // console.log(syll);
    if (res) {
      ToastMessage(res);
    }
  };

  return (
    <View>
      <View style={styles.items}>
        <TextInput
          onChangeText={(e) => setForm(e, "DienThoai", "itemSYLL")}
          value={syll.itemSYLL?.DienThoai}
          label={"Số điện thoại"}
          variant="standard"
        />
      </View>
      <View style={styles.items}>
        <TextInput
          onChangeText={(e) => setForm(e, "Email", "itemSYLL")}
          value={syll.itemSYLL?.Email}
          label={"Email"}
          variant="standard"
        />
      </View>
      <View style={styles.items}>
        <TextInput
          onChangeText={(e) => setForm(e, "ChoOHienNayDiaChi", "itemSYLL")}
          value={syll.itemSYLL?.ChoOHienNayDiaChi}
          label={"Nơi ở hiện nay"}
          variant="standard"
        />
      </View>
      <View style={styles.btn}>
        <Button
          icon="check"
          mode="contained"
          onPress={GhiLai}
          style={{ width: '75%', backgroundColor: "#037bff" }}
        >
          Xác nhận
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
  items: {
    padding: 10,
  },
  label: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  inputtext: {
    // borderColor: "#ced4da",
    // border: 1,
    // borderRadius: 3,
    // backgroundColor: "#fff",
    // padding: 4,
    // fontSize: 16,
    // height: 50,
    // lineHeight: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  RadioButton: {
    backgroundColor: "red",
    borderColor: "#fff",
  },
});
