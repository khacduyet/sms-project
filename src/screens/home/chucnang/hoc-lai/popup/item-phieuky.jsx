import React from "react";
import { SafeAreaView } from "react-native";
import {
  Text,
  StyleSheet,
  useColorScheme,
  View,
  ScrollView,
  Alert,
} from "react-native";
import HeaderBack from "../../../../../common/header";
import { Colors, Screens } from "../../../../../common/constant";
import { TextInput } from "@react-native-material/core";
import { Button } from "react-native-paper";
import { TYPE } from "../hoc-lai";
import { QuyTrinhServices } from "../../../../../services/danhmuc.service";
import { useEffect } from "react";
import { useState } from "react";
import { _stl, formatDateStringGMT } from "../../../../../common/common";
import { ToastMessage } from "../../../../../common/components";
import { useNavigation } from "@react-navigation/native";

export default function ItemPhieuKy({ route }) {
  const { type, item } = route.params;
  const [quyTrinh, setquyTrinh] = useState({
    TenMonHoc: "MH - Đại số tuyến tính",
    DiemTongKet: 4.5,
    SoTinChi: 3,
    IdSinhVien: "",
    IddmMonHoc: "",
    SoDienThoai: "0963888999",
    TenSinhVien: "Cù Mạnh Anh",
    MaSinhVien: "HQ2023166",
    NgaySinh: "2023-05-17T04:07:11.268Z",
  });
  const GetDangKyHocLaiByIdDSMonHoc = async () => {
    let data = {
      IdSinhVien: item?.IdSinhVien,
      IddmMonHoc: item?.IddmMonHoc,
      IdDSMonHoc: "",
    };
    let res = await QuyTrinhServices.ThongTinCaNhan.GetDangKyHocLaiByIdDSMonHoc(
      data
    );
    if (res) {
      // setquyTrinh(res)
    }
  };
  useEffect(() => {
    GetDangKyHocLaiByIdDSMonHoc();
  }, []);
  const nav = useNavigation();
  const GhiLai = async () => {
    if (type === "DANGKY") {
      let res = await QuyTrinhServices.ThongTinCaNhan.SetQuyTrinhDangKyHocLai(
        quyTrinh
      );
      if (res) {
        objRefresh.objRefresh(true);
        ToastMessage(res);
      }
    } else {
      let res =
        await QuyTrinhServices.ThongTinCaNhan.DeleteQuyTrinhDangKyHocLai(
          quyTrinh
        );
      if (res) {
        ToastMessage(res);
      }
    }
    nav.navigate(Screens.HocLai, {});
  };
  const title = {
    DangKy: "đăng ký môn học",
    HuyDangKy: "hủy đăng ký",
  };
  const ChuyenTiep = () => {
    Alert.alert(
      `Bạn có chắc chắn muốn ${
        type === "DANGKY" ? title.DangKy : title.HuyDangKy
      }?`,
      "",
      [
        {
          text: "Xác nhận",
          onPress: () => {
            GhiLai();
            nav.navigate(Screens.HocLai, {});
          },
        },
        {
          text: "Đóng",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[_stl._container]}>
      <HeaderBack header={Screens.PhieuDangKy} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.items}>
            <TextInput
              value={quyTrinh?.TenSinhVien}
              label={"Họ và tên"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={styles.items}>
            <TextInput
              value={quyTrinh?.MaSinhVien}
              label={"Mã sinh viên"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={styles.items}>
            <TextInput
              value={formatDateStringGMT(quyTrinh?.NgaySinh, "dd/mm/yyyy")}
              label={"Ngày sinh"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={styles.items}>
            <TextInput
              value={quyTrinh?.SoDienThoai}
              label={"Số điện thoại"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={styles.items}>
            <TextInput
              value={quyTrinh?.TenLopHoc}
              label={"Lớp"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={styles.items}>
            <TextInput
              value={quyTrinh?.TenKhoa}
              label={"Khoa"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={styles.items}>
            <TextInput
              value={quyTrinh?.TenMonHoc}
              label={"Tên môn học"}
              editable={false}
              variant="standard"
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.items, styles.flex]}>
              <TextInput
                label={"Mã môn học"}
                value={quyTrinh?.MaMonHoc}
                editable={false}
                variant="standard"
              />
            </View>
            <View style={[styles.items, styles.flex]}>
              <TextInput
                label={"Số tín chỉ"}
                value={quyTrinh?.SoTinChi}
                editable={false}
                variant="standard"
              />
            </View>
          </View>
          <View style={styles.btn}>
            {type === TYPE.DANGKY ? (
              <Button
                mode="contained"
                onPress={ChuyenTiep}
                style={{ width: "75%" }}
              >
                Chuyển Tiếp
              </Button>
            ) : (
              <Button
                mode="contained"
                onPress={ChuyenTiep}
                style={{ width: "75%", backgroundColor: Colors.Danger }}
              >
                Hủy đăng ký
              </Button>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    margin: 16,
  },
  items: {
    padding: 10,
  },
  flex: {
    flex: 1,
  },
  btn: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
  },
};
