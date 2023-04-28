import * as React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { TextInput } from "@react-native-material/core";
import { useState, useEffect } from "react";
import { Button } from 'react-native-paper';
import { QuyTrinhServices } from "../../../../services/danhmuc.service";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { DateToUnix, formatDateStringGMT } from "../../../../common/common";
import { useMemo } from "react";
import { ToastMessage } from "../../../../common/components";

export default function Family() {
  const [syll, setSyll] = useState({
    TenGhep: "",
    GioiTinh: 0,
    NgaySinh: null,
    itemSYLL: {
    },
  });
  const [itemSYLL, setItemSYLL] = useState({
    listQuanHeGiaDinhSinhVien: [{}]
  })

  const [prop, setProp] = useState(null)
  const [checked, setChecked] = React.useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [chil, setChil] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    let unix = [prop] + "Unix";
    if (chil) {
      setItemSYLL({
        ...itemSYLL,
        listQuanHeGiaDinhSinhVien: [
          {
            ...itemSYLL.listQuanHeGiaDinhSinhVien[0],
            [prop]: new Date(date),
            [unix]: DateToUnix(new Date(date)),
          }
        ],
      })
    }
    else {
      setItemSYLL({
        ...itemSYLL,
        [prop]: new Date(date),
        [unix]: DateToUnix(new Date(date)),
      })
    }
    setIsRefresh(!isRefresh)
    hideDatePicker();
  };
  // ------ Api ------
  const GetSoYeuLyLichSinhVien = async () => {
    let res = await QuyTrinhServices.ThongTinCaNhan.GetSoYeuLyLichSinhVien();
    if (res) {
      console.log('res',res);
      setItemSYLL(res.itemSYLL)
      setSyll(res)
    }
  };

  const setForm = (value, prop, isChildren) => {
    if (value !== undefined) {
      if (isChildren) {
        setItemSYLL({
          ...itemSYLL,
          listQuanHeGiaDinhSinhVien: [
            {
              ...itemSYLL.listQuanHeGiaDinhSinhVien[0],
              [prop]: value,
            }
          ]
        })
        return;
      }
      setItemSYLL({
        ...itemSYLL,
        [prop]: value
      })
    }
  }

  useEffect(() => {
    GetSoYeuLyLichSinhVien();
  }, []);

  const GhiLai = async () => {
    let data = {
      ...syll,
      itemSYLL: itemSYLL
    }
    console.log('data',data);
    let res = await QuyTrinhServices.ThongTinCaNhan.SetSoYeuLyLichSinhVien(data);
    if (res) {
      ToastMessage(res);
    }
  };

  const _ctx = {
    item: itemSYLL,
    setForm: setForm,
    showDatePicker: showDatePicker,
    hideDatePicker: hideDatePicker,
    handleConfirm: handleConfirm,
    checked: checked,
    setChecked: setChecked,
    isDatePickerVisible: isDatePickerVisible,
    prop: prop,
    setProp: setProp,
    isRefresh: isRefresh,
    setIsRefresh: setIsRefresh,
    chil: chil,
    setChil: setChil
  }

  return (
    <View style={{ paddingBottom: 100 }}>
      <DateTimePickerModal
        isVisible={_ctx.isDatePickerVisible}
        mode="date"
        onConfirm={_ctx.handleConfirm}
        onCancel={_ctx.hideDatePicker}
      />
      <ScrollView >
        <View>
          {/* liên hệ cha */}
          <View>
            <FatherContact _ctx={_ctx} />
          </View>
          <View style={styles.markdown}></View>
          {/* liên hệ mẹ */}
          <View>
            <MotherContact _ctx={_ctx} />
          </View>
          <View style={styles.markdown}></View>
          {/* liên hệ khác */}
          <AnotherContact _ctx={_ctx} />
          {/* --- end --- */}
        </View>
        <View style={styles.btn}>
          <Button icon="check" mode="contained"
            onPress={GhiLai}
            style={{ width: '75%' }}>
            Xác nhận
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const FatherContact = ({ _ctx }) => {
  return <>
    <View style={styles.items}>
      <View style={styles.flex}>
        <Text style={styles.label}>Họ và Tên cha:</Text>
        {/* <View style={styles.flex}>
          <Checkbox.Android
            status={_ctx.checked ? "checked" : "unchecked"}
            onPress={() => {
              _ctx.setChecked(!_ctx.checked);
            }}
          />
          <Text>Liên hệ chính</Text>
        </View> */}
      </View>
      <View>
        <TextInput style={styles.inputtext}
          value={_ctx.item?.HoTenCha}
          onChangeText={(e) => _ctx.setForm(e, 'HoTenCha')}
        />
      </View>
    </View>
    <View style={styles.items}>
      <TextInput
        style={styles.inputtext}
        label={"Ngày sinh"}
        variant="standard"
        value={formatDateStringGMT(_ctx.item?.NgaySinhCha, "dd/mm/yyyy")}
        onFocus={() => {
          _ctx.setProp('NgaySinhCha')
          _ctx.setChil(false)
          _ctx.showDatePicker();
        }} />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_ctx.item?.DienThoaiCha}
        onChangeText={(e) => _ctx.setForm(e, 'DienThoaiCha')}
        label={'Số điện thoại'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_ctx.item?.NgheNghiepCha}
        onChangeText={(e) => _ctx.setForm(e, 'NgheNghiepCha')}
        label={'Nghề nghiệp'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_ctx.item?.DiaChiCha}
        onChangeText={(e) => _ctx.setForm(e, 'DiaChiCha')}
        label={'Địa chỉ liên lạc'}
        variant="standard" />
    </View>
  </>
}

const MotherContact = ({ _ctx }) => {
  return <>
    <View style={styles.items}>
      <View style={styles.flex}>
        <Text style={styles.label}>Họ và Tên mẹ:</Text>
        {/* <View style={styles.flex}>
          <Checkbox.Android
            status={_ctx.checked ? "checked" : "unchecked"}
            onPress={() => {
              _ctx.setChecked(!_ctx.checked);
            }}
          />
          <Text>Liên hệ chính</Text>
        </View> */}
      </View>
      <View>
        <TextInput style={styles.inputtext}
          value={_ctx.item?.HoTenMe}
          onChangeText={(e) => _ctx.setForm(e, 'HoTenMe')}
        />
      </View>
    </View>
    <View style={styles.items}>
      <TextInput
        style={styles.inputtext}
        label={"Ngày sinh"}
        variant="standard"
        value={formatDateStringGMT(_ctx.item?.NgaySinhMe, "dd/mm/yyyy")}
        onFocus={() => {
          _ctx.setProp('NgaySinhMe')
          _ctx.setChil(false)
          _ctx.showDatePicker();
        }} />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_ctx.item?.DienThoaiMe}
        onChangeText={(e) => _ctx.setForm(e, 'DienThoaiMe')}
        label={'Số điện thoại'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_ctx.item?.NgheNghiepMe}
        onChangeText={(e) => _ctx.setForm(e, 'NgheNghiepMe')}
        label={'Nghề nghiệp'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_ctx.item?.DiaChiMe}
        onChangeText={(e) => _ctx.setForm(e, 'DiaChiMe')}
        label={'Địa chỉ liên lạc'}
        variant="standard" />
    </View>
  </>
}

const AnotherContact = ({ _ctx }) => {
  const _another = useMemo(() => {
    let data = _ctx.item?.listQuanHeGiaDinhSinhVien[0]
    console.log("data",data);
    return data
  }, [_ctx.isRefresh])
  return <>
    <View style={styles.items}>
      <View style={styles.flex}>
        <Text style={styles.label}>Họ và Tên người thân:</Text>
        {/* <View style={styles.flex}>
          <Checkbox.Android
            status={_ctx.checked ? "checked" : "unchecked"}
            onPress={() => {
              _ctx.setChecked(!_ctx.checked);
            }}
          />
          <Text>Liên hệ chính</Text>
        </View> */}
      </View>
      <View>
        <TextInput style={styles.inputtext}
          value={_another?.HoTen}
          onChangeText={(e) => {
            _ctx.setForm(e, 'HoTen', true)
            _ctx.setIsRefresh(!_ctx.isRefresh)
          }}
        />
      </View>
    </View>
    <View style={styles.items}>
      <TextInput
        value={_another?.QuanHe}
        onChangeText={(e) => {
          _ctx.setForm(e, 'QuanHe', true)
          _ctx.setIsRefresh(!_ctx.isRefresh)
        }}
        label={'Quan hệ'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        style={styles.inputtext}
        label={"Ngày sinh"}
        variant="standard"
        value={formatDateStringGMT(_another?.NgaySinh, "dd/mm/yyyy")}
        onFocus={() => {
          _ctx.setProp('NgaySinh')
          _ctx.setChil(true)
          _ctx.showDatePicker();
        }} />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_another?.DienThoai}
        onChangeText={(e) => {
          _ctx.setForm(e, 'DienThoai', true)
          _ctx.setIsRefresh(!_ctx.isRefresh)
        }}
        label={'Số điện thoại'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_another?.NgheNghiep}
        onChangeText={(e) => {
          _ctx.setForm(e, 'NgheNghiep', true)
          _ctx.setIsRefresh(!_ctx.isRefresh)
        }}
        label={'Nghề nghiệp'}
        variant="standard" />
    </View>
    <View style={styles.items}>
      <TextInput
        value={_another?.DiaChi}
        onChangeText={(e) => {
          _ctx.setForm(e, 'DiaChi', true)
          _ctx.setIsRefresh(!_ctx.isRefresh)
        }}
        label={'Địa chỉ liên lạc'}
        variant="standard" />
    </View>
  </>
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  markdown: {
    borderBottomColor: "#d0d7de",
    borderBottomWidth: 1,
    fontSize: 1.5,
  },
  items: {
    padding: 10,
  },
  label: {
    paddingBottom: 5,
    paddingTop: 5,
    fontWeight: 'bold'
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
