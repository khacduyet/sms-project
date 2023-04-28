import React from "react";
import { Text, StyleSheet, useColorScheme, View } from 'react-native';
import Items from './item-dangky'

export default function PhieuDangKy({type}) {
    return (
        <View style={styles.container}>
            <Items title={'Đăng ký'} type={type} />
        </View>
    )
}

const styles = { 
    container: {
        margin: 16,
    },
}