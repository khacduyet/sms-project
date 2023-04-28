import React from "react";
import { Text, StyleSheet, useColorScheme, View } from 'react-native';
import Items from './item-dangky'

export default function PhieuDangKy() {
    return (
        <View style={styles.container}>
            <Items title={'Đăng ký'} />
        </View>
    )
}

const styles = { 
    container: {
        margin: 16,
    },
}