import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, TouchableOpacity } from "react-native";

//
import ItemPhoDiem from './screen/item-pho-diem'
import ItemDiemTrungBinh from './screen/item-poup-bang-diem/item-diem-trung-binh'
import Radio from '../share-componet/radio'
import DropDown from '../share-componet/DropDown/DropDown'
import { useState } from 'react';
import { useEffect } from 'react';
import { QuyTrinhServices } from '../../../services/danhmuc.service';

const listKy = [
  { label: 'Kỳ I', value: 'I' },
  { label: 'Kỳ II', value: 'II' },
];
const listChiTiet = [
  { TenLabel: 'Yếu', SoLuong: 23, isCheck: false, },
  { TenLabel: 'TB', SoLuong: 16, isCheck: false, },
  { TenLabel: 'Khá', SoLuong: 42, isCheck: true, },
  { TenLabel: 'Giỏi', SoLuong: 19, isCheck: false, },
  { TenLabel: 'Xuất sắc', SoLuong: 19, isCheck: false, },
];

export default function PhoDiem() {
  const [object, setObject] = useState({
    Nam: null,
    Ky: listKy[0].value,
    isLop: true,
    isKhoa: false,
    IdDsMonhoc: null,
  });
  const [value, setValue] = React.useState(0);
  const [valueRadioMonHoc, setValueRadioMonHoc] = React.useState(0);

  // api
  const [data, setData] = useState({})
  const [dataMonHocByKy, setDataMonHocByKy] = useState([])
  const getData = async () => {
    let res = await QuyTrinhServices.KetQuaHocTap.GetPhoDiemSV(object)
    if (res) {
      setData(res)
    }
  }
  const GetDanhSachMonHocByKy = async () => {
    let res = await QuyTrinhServices.KetQuaHocTap.GetDanhSachMonHocByKy(object)
    if (res) {
      setDataMonHocByKy(res)
    }
  }

  const _objCtx = {
    value: value,
    setValue: setValue
  }
  const _objCtxMonHoc = {
    value: valueRadioMonHoc,
    setValue: setValueRadioMonHoc
  }

  const setKyByNam = (nam) => {
    setObject({
      ...object,
      Nam: nam,
      Ky: null,
    })
  }
  const [listNam, setlistNam] = useState([
    { label: 'Tất cả', value: 0 },
  ]);
  const getListNam = () => {
    for (let i = new Date().getFullYear() - 10; i <= (new Date().getFullYear() + 20); i++) {
      listNam.push({ value: i, label: `${i}-${i + 1}` });
    }
    setlistNam(listNam);
  }
  useEffect(() => {
    getListNam()
  }, [])

  useEffect(() => {
    getData()
    GetDanhSachMonHocByKy()
  }, [object, value, valueRadioMonHoc])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dropdown}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.left}>
                <DropDown data={listNam} object={object} setObject={setObject} header={'Nam'} setKyByNam={setKyByNam} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.right}>
                <DropDown data={listKy} object={object} setObject={setObject} header={'Ky'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.marginBottom_16}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.left}>
                <ItemDiemTrungBinh Diem={data.DiemTBKy} TC={data.SoTinChiDatHocKy} title={'học kỳ'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.right}>
                <ItemDiemTrungBinh Diem={data.DiemTichLuy} TC={data.SoTinChiTichLuy} title={'tích lũy'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.marginBottom_16}>
          <View style={styles.flex}>
            <Radio _objCtx={_objCtx} />
          </View>
          <View>
            {
              data.length ? <ItemPhoDiem data={listChiTiet} title={'Điểm trung bình tích lũy'} />
                : <ItemData />
            }
            {/* <ItemPhoDiem data={listChiTiet} title={'Điểm trung bình tích lũy'} /> */}
          </View>
        </View>
        <View style={styles.marginBottom_16}>
          <DropDown data={dataMonHocByKy} object={object} setObject={setObject} header={'IdDsMonhoc'}  />
        </View>
        {/* ---- View điểm môn học ----- */}
        <View style={{ paddingBottom: 210 }}>
          <View style={styles.flex}>
            <Radio _objCtx={_objCtxMonHoc} />
          </View>
          <View>
          {
              data.length ? <ItemPhoDiem data={listChiTiet} title={'Điểm tổng kết môn học'} />
                : <ItemData />
            }
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  header: {
  },
  flex: {
    flexDirection: 'row',
  },
  justify_content_between: {
    flex: 1,
  },
  dropdown: {
    marginBottom: 16
  },
  left: {
    marginRight: 8
  },
  right: {
    marginLeft: 8
  },
  content: {
    marginTop: 16,
    marginBottom: 16
  },
  marginBottom_16: {
    marginBottom: 16
  },
  title_diem: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

const ItemData = () => {
  return (
    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:20}}>
      <Text>Chưa có dữ liệu!</Text>
    </View>
  )
}


