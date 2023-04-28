import React from "react";
import { View, Text } from "react-native"
import Items from './item-dangky'

export default function ItemMonHocDK() {
    return (
        <View style={styles.container}>
            <Items title={'Chi tiết'} />
        </View>
    )
}

const styles = { 
    container: {
        margin: 16,
    },
}