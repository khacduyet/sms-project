import React from "react";
import { View, Text } from 'react-native'
import DropDown from "../../../../accademics/share-componet/DropDown/DropDown";
import { useState } from "react";
import { Button, Checkbox } from "react-native-paper";

import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';

const dataMonHoc = [
    {
        label: 'Xác suất thống kê',
        value: '123'
    }
]

export default function () {
    const [object, setObject] = useState({});
    const [checked, setChecked] = React.useState(false);

    const state = {
        tableHead: ['', 'Lớp học phần', 'Lịch học', 'Còn trống'],
        tableData: [
            ['1', 'KTVN2023_01', 'Tuần 2 - Tuấn 13', '4'],
            ['1', 'KTVN2023_02', 'Tuần 2 - Tuấn 13', '456\n789'],
        ]
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={[styles.tinchi, styles.flex, styles.justify_content]}>
                    <View>
                        <Text style={[styles.font_medium]}> Số TC tối thiếu cần Đk: 15 </Text>
                        <Text style={[styles.font_medium]}> Số TC tối đa được phép Đk: 15 </Text>
                        <Text style={[styles.font_medium]}> Số TC đã Đk: 15 </Text>
                    </View>
                    <View>
                        <Text style={[styles.font_medium]}> Thời gian đăng ký </Text>
                        <Text style={[styles.font_medium]}> Từ: 01/04/2023  </Text>
                        <Text style={[styles.font_medium]}> Đến: 01/04/2023 </Text>
                    </View>
                </View>
                <View style={[styles.chonmon, styles.margintop]}>
                    <DropDown data={dataMonHoc}
                        object={object}
                        setObject={setObject} />
                </View>
                <View style={[styles.flex, styles.justify_content, styles.margintop]}>
                    <View style={[styles.flex, styles.alignItems]}>
                        <Checkbox.Android
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => { setChecked(!checked); }}
                        />
                        <Text>Lọc các lớp trùng lịch</Text>
                    </View>
                    <View>
                        <Button icon="calendar" mode="contained" onPress={() => console.log('Pressed')}>
                            Xem lịch học
                        </Button>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={[styles.margintop, styles.marginbottom]}>
                    <Text style={[styles.font_medium, styles.textCenter]}>Danh sách các lớp học phần có thể đăng ký</Text>
                </View>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />
                    </Table>
                </View>
            </View>
        </View>
    )
}

const styles = {
    container: {
        margin: 16
    },
    header: {

    },
    tinchi: {
        padding: 10,
        borderWidth: 1,
        borderColor: 'lightskyblue',
        borderRadius: 8
    },

    flex: {
        flexDirection: "row",
    },
    justify_content: {
        justifyContent: 'space-between'
    },
    font_medium: {
        fontWeight: 500
    },
    alignItems: {
        alignItems: "center",
    },
    margintop: {
        marginTop: 16
    },
    marginbottom: {
        marginbottom: 16
    },
    textCenter: {
        textAlign: 'center'
    },
    head: { height: 'auto', backgroundColor: '#f1f8ff' },
    text: { margin: 6, textAlign: 'center' }

}