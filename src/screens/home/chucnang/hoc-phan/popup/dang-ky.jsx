import React from "react";
import { View, Text } from 'react-native'
import DropDown from "../../../../accademics/share-componet/DropDown/DropDown";
import { useState } from "react";
import { Button, Checkbox, DataTable } from "react-native-paper";

// import { Table, Row, Rows, TableWrapper } from 'react-native-table-component';
import { StyleSheet } from "react-native";
// import { FlatList } from "react-native";
// import { Loading } from "../../../../traningplan";

const dataMonHoc = [
    {
        label: 'Xác suất thống kê',
        value: '123'
    }
]

export default function () {
    const [object, setObject] = useState({});
    const [checked, setChecked] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    const [listMon, setLlistMon] = React.useState([
        { STT: 1, MaMonHoc: 'OPP', isHoanThanh: true },
        { STT: 2, MaMonHoc: 'OPP', isHoanThanh: false }
    ]);
    const data = [
        { Ma: 'MQ_001', DonVi: 'CTTN Hài Hòa' },
        { Ma: 'MQ_002', DonVi: 'CTTN Hài Hòa' },
    ];

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
                    <View style={styles.table_header}>
                        <View style={{ width: '15%' }}><Text style={styles.table_caption}>STT</Text></View>
                        <View style={{ width: '30%' }}><Text style={styles.table_caption}>Lớp học phần</Text></View>
                        <View style={{ width: '25%' }}><Text style={styles.table_caption}>Lịch học</Text></View>
                        <View style={{ width: '15%' }}><Text style={styles.table_caption}>Còn trống</Text></View>
                        <View style={{ width: '15%' }}><Text style={styles.table_caption}>Chi tiết</Text></View>
                    </View>
                    {
                        data.map((x, index) => {
                            return (
                                <View style={styles.table_body}>
                                    <View style={{ width: '15%' }}>
                                        <View>
                                            <Checkbox.Android
                                                status={checked ? "checked" : "unchecked"}
                                                onPress={() => {
                                                    setChecked(!checked);
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ width: '30%' }}><Text style={[styles.table_data,styles.ptop]}>{x.Ma}</Text></View>
                                    <View style={{ width: '25%' }}><Text style={[styles.table_data,styles.ptop]}>{x.DonVi}</Text></View>
                                    <View style={{ width: '15%' }}><Text style={[styles.table_data,styles.ptop]}></Text></View>
                                    <View style={{ width: '15%' }}><Text style={[styles.table_data,styles.ptop]}></Text></View>
                                </View>
                            )
                        })
                    }

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
    text: { margin: 6, textAlign: 'center' },
    table_header: {
        flexDirection: "row",
        backgroundColor: 'blue',
        padding: 10
    },
    table_body: {
        flexDirection: "row",
        padding: 10,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue'
    },
    table_caption: {
        color: '#fff',
        fontWeight: 'bold'
    },
    table_data: {
        fontSize: 11,

    },
    ptop: {
        paddingTop:10
    }

}