import React from "react";
import { Text, StyleSheet, View, Image } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { Screens } from "../../../../../common/constant";
import { useNavigation } from "@react-navigation/native";
import { QuyTrinhServices } from "../../../../../services/danhmuc.service";
import { useEffect } from "react";
import { useState } from "react";


export default function Items({ title, type }) {
    const [item, setitem] = useState({
        TenMonHoc: 'MH - Đại số tuyến tính',
        DiemTongKet: 4.5,
        SoTinChi: 3,
        IdSinhVien: '',
        IddmMonHoc: ''
    })
    const GetDanhSachMonHocLaiCuaSinhVien = async () => {
        console.log(1);
        let data = {
            "IdSinhVien": "",
            "IddmMonHoc": "",
            "IdDSMonHoc": ""
        }
        if (type === 'DANGKY') {
            let res = await QuyTrinhServices.ThongTinCaNhan.GetDanhSachMonHocLaiCuaSinhVien(data);
            if (res) {
                // setitem(res)
            }
        } else {
            let res = await QuyTrinhServices.ThongTinCaNhan.GetDanhSachQuyTrinhDangKyHocLaiCuaSinhVien(data);
            if (res) {
                // setitem(res)
            }
        }
    }

    useEffect(() => {
        GetDanhSachMonHocLaiCuaSinhVien();
    }, []);

    const nav = useNavigation();
    return (
        <View style={styles.flex}>
            <View style={styles.item_left}>
                <View style={styles.header}>
                    <View style={styles.flex}>
                        <Entypo name="open-book" size={24} color="black" />
                        <Text style={styles.item_title_header}> {item.TenMonHoc}</Text>
                    </View>
                </View>
                <View style={styles.item_content}>
                    <View style={styles.flex}>
                        <Entypo name="layers" size={22} color="black" />
                        <Text style={styles.item_diem}>Điểm tổng kết: {item.DiemTongKet}</Text>
                    </View>
                    <View style={styles.flex}>
                        <Entypo name="pencil" size={22} color="black" />
                        <Text style={styles.item_diem}>Tín chỉ : {item.SoTinChi}</Text>
                    </View>
                    {
                        item.TenTrangThai ?
                            <View style={styles.flex}>
                                <Image
                                    source={require("../../../../../resources/trang-thai.png")}
                                    style={{ width: 20, height: 20, }}
                                    resizeMode="stretch"
                                />
                                <Text style={styles.item_diem}>{item.TenTrangThai} </Text>
                            </View>
                            : null
                    }
                </View>
            </View>
            <View style={styles.item_right}>
                <Text
                    style={{ color: '#fff' }}
                    onPress={() => {
                        nav.navigate(Screens.PhieuDangKy, {
                            type: type,
                            item: item,
                        })
                    }}
                >
                    {title}</Text>
            </View>
        </View>
    )
}

const styles = {
    container: {
        margin: 16,
    },
    flex: {
        flexDirection: 'row',
    },
    item_left: {
        borderColor: '#C6E2FF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8,
        flex: 1
    },
    item_right: {
        borderColor: '#C6E2FF',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomRightRadius: 8,
        borderTopRightRadius: 8,
        padding: 8,
        flexDirection: 'row',
        backgroundColor: '#0099FF',
        alignItems: 'center'
    },
    header: {
        backgroundColor: '#C6E2FF',
        padding: 8
    },
    item_title_header: {
        paddingLeft: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    item_content: {
        backgroundColor: '#fff',
        padding: 8,
    },
    item_diem: {
        paddingLeft: 8
    },
}