import * as React from 'react';
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function ItemDiemTrungBinh() {
    const [value, setValue] = useState(null);
    return (
        <View>
            <TouchableOpacity style={styles.items}>
                <View style={styles.flex}>
                    <Text style={styles.item_title}>Điểm TB học kỳ:</Text>
                    <Text style={styles.item_title}>8.55</Text>
                </View>
                <View style={styles.flex}>
                    <Text style={styles.item_title}>Số TC đạt học kỳ:</Text>
                    <Text style={styles.item_title}>12/14</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    items: {
        backgroundColor: '#C6E2FF',
        borderColor: '#C6E2FF',
        borderWidth: 1,
        borderRadius:8,
        padding:8,
    },
    flex: {
        flexDirection: 'row',
    },
    item_title: {
        padding:2
    },
});