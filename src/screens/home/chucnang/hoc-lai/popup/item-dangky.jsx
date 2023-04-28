import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import { Entypo } from "@expo/vector-icons";
import { Screens } from "../../../../../common/constant";
import { useNavigation } from "@react-navigation/native";


export default function Items({ title, type }) {
    const nav = useNavigation();
    return (
        <View style={styles.flex}>
            <View style={styles.item_left}>
                <View style={styles.header}>
                    <View style={styles.flex}>
                        <Entypo name="open-book" size={24} color="black" />
                        <Text style={styles.item_title_header}>MH - Đại số tuyến tính </Text>
                    </View>
                </View>
                <View style={styles.item_content}>
                    <View style={styles.flex}>
                        <Entypo name="layers" size={22} color="black" />
                        <Text style={styles.item_diem}>Điểm tổng kết</Text>
                    </View>
                    <View style={styles.flex}>
                        <Entypo name="pencil" size={22} color="black" />
                        <Text style={styles.item_diem}>Tín chỉ</Text>
                    </View>
                </View>
            </View>
            <View style={styles.item_right}>
                <Text
                    style={{ color: '#fff' }}
                    onPress={() => {
                        nav.navigate(Screens.PhieuDangKy, {
                            type: type
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