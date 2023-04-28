import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { View, Text, SafeAreaView } from 'react-native'

import DangKy from './popup/dang-ky';
import KetQuaDangKy from './popup/ket-qua-dang-ky';
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import HeaderBack from "../../../../common/header";
import { Screens } from "../../../../common/constant";

const TextButtonTab = {
    DangKy: "Đăng ký",
    KetQuaDangKy: "Kết quả đăng ký",
};

export const TYPE = {
    DANGKY: 'DANGKY',
    KETQUADANGKY: 'KETQUADANGKY'
}

export default function HocPhan() {
    const [tabIndex, setTabIndex] = useState(0);
    return <SafeAreaView>
        <HeaderBack header={Screens.HocPhan} />
        <View style={[styles.container]}>
            <View style={{paddingTop:20}}>
                <Text style={styles.center}>HỌC KỲ I - NĂM HỌC:2022-2023</Text>
            </View>
            <View style={[styles.tab]}>
                <TouchableOpacity style={[styles.buttonTab, tabIndex === 0 && styles.buttonTabActive]}
                    onPress={() => {
                        setTabIndex(0);
                    }}>
                    <Text style={[
                        styles.buttonTabText,
                        tabIndex === 0 && styles.buttonTabTextActive,
                    ]}>
                        {TextButtonTab.DangKy}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonTab, tabIndex === 1 && styles.buttonTabActive]}
                    onPress={() => {
                        setTabIndex(1);
                    }}>
                    <Text style={[
                        styles.buttonTabText,
                        tabIndex === 1 && styles.buttonTabTextActive,
                    ]}>
                        {TextButtonTab.KetQuaDangKy}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.container]}>
                {tabIndex === 0 && <DangKy type={TYPE.DANGKY}/>}
                {tabIndex === 1 && <KetQuaDangKy type={TYPE.KETQUADANGKY}/>}
            </View>
        </View>
    </SafeAreaView>
}
const styles = {
    container: {
        height: "100%",
        width: "100%",
    },
    tab: {
        flexDirection: "row",
    },
    buttonTab: {
        flex: 1,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        margin: 5,
        marginTop: 0,
    },
    buttonTabActive: {
        borderBottomWidth: 2,
        borderColor: "#2f4bfb",
        borderRadius: 5,
    },
    buttonTabTextActive: {
        color: "#2f4bfb",
    },
    buttonTabText: {},
    center: {
        textAlign: "center",
        fontWeight:'bold'
    }
}