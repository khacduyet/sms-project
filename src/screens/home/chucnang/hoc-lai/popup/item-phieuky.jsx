import React from "react";
import { SafeAreaView } from "react-native";
import { Text, StyleSheet, useColorScheme, View, ScrollView, Alert } from 'react-native';
import HeaderBack from "../../../../../common/header";
import { Colors, Screens } from "../../../../../common/constant";
import { TextInput } from "@react-native-material/core";
import { Button } from 'react-native-paper';
import { TYPE } from "../hoc-lai";

const data = {
    HoTen: 'Nguyễn Học Lại',
    MSV: '19008198'
}

function ChuyenTiep() {
    Alert.alert('Bạn có chắc chắn muốn đăng ký môn học?', '', [
        { text: 'Xác nhận', onPress: () => console.log('OK Pressed') },
        {
            text: 'Đóng',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
        },
    ]);
}


export default function ItemPhieuKy({ route }) {
    const { type } = route.params;
    console.log("type", type);
    return (
        <SafeAreaView>
            <HeaderBack header={Screens.PhieuDangKy} />
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            value={data?.HoTen}
                            label={'Họ và tên'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            value={data?.MSV}
                            label={'Mã sinh viên'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Ngày sinh'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Số điện thoại'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Lớp'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Khoa'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Tên môn học'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Mã môn học'}
                            variant="standard" />
                    </View>
                    <View style={styles.items}>
                        <TextInput
                            // onChangeText={(e) => setForm(e, 'DienThoai', 'itemSYLL')}
                            // value={syll.itemSYLL?.DienThoai}
                            label={'Số tín chỉ'}
                            variant="standard" />
                    </View>
                    <View style={styles.btn}>
                        {type === TYPE.DANGKY ? <Button mode="contained"
                            onPress={ChuyenTiep}
                            style={{ width: '75%' }}>
                            Chuyển Tiếp
                        </Button> : <Button mode="contained"
                            onPress={ChuyenTiep}
                            style={{ width: '75%', backgroundColor: Colors.Danger }}>
                            Hủy đăng ký
                        </Button>}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = {
    container: {
        margin: 16,
    },
    items: {
        padding: 10,
    },
    btn: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: 'center'
    },
}