import React from "react";
import { View, Text, ScrollView, Dimensions, FlatList } from 'react-native'
import DropDown from "../../../../accademics/share-componet/DropDown/DropDown";
import { useState } from "react";
import { Button, Dialog, Portal } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function DangKy() {
    const [object, setObject] = useState({});
    const [checked, setChecked] = useState(false);
    const [objData, setobjData] = useState({
        listDSHocPhan: [
            { TenHocPhan: "Kinh tế vĩ mô", LopHocPhan: 'KTVM2023' },
            { TenHocPhan: "Công nghệ tài chính", LopHocPhan: 'KTVM2024' },
        ]
    })
    const dataMonHoc = [
        {
            label: 'Xác suất thống kê',
            value: '123'
        }
    ]
    const [visible, setVisible] = useState(false)
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false)
        setisPlay(false)
    };
    const [isPlay, setisPlay] = useState(false)
    const showDialogXemLichHoc = () => setisPlay(true);

    const SetData = (e, idx, prop) => {
        let temp = objData.listDSHocPhan
        let _this = temp[idx]
        _this = {
            ..._this,
            [prop]: e,
        }
        temp[idx] = _this
        let data = {
            ...objData,
            listDSHocPhan: temp
        }
        setobjData(data)
    };
    const GhiLai = () => {
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
                        {/* <Checkbox.Android
                            status={checked ? "checked" : "unchecked"}
                            onPress={() => { setChecked(!checked); }}
                        /> */}
                        <Text>Lọc các lớp trùng lịch</Text>
                    </View>
                    <View>
                        <Button icon="calendar" mode="contained" onPress={() => showDialogXemLichHoc()}>
                            Xem lịch học
                        </Button>
                        <Portal>
                            <Dialog visible={isPlay} onDismiss={hideDialog}>
                                <Dialog.Title style={{ fontSize: 16 }}> Lịch học các học phần đã đăng ký</Dialog.Title>
                                <Dialog.ScrollArea style={{ height: 350 }}>
                                    <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                                        <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                                            <XemLichHoc />
                                        </View>
                                    </ScrollView>
                                </Dialog.ScrollArea>
                                <Dialog.Actions>
                                    <Button onPress={hideDialog} > Đóng </Button>
                                </Dialog.Actions>
                            </Dialog>
                        </Portal>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={[styles.margintop, styles.marginbottom]}>
                    <Text style={[styles.font_medium, styles.textCenter, styles.ptop]}>Danh sách các lớp học phần có thể đăng ký</Text>
                </View>
                <View style={[styles.ptop]}>
                    <View style={styles.table_header}>
                        <View style={{ width: '15%' }}><Text style={styles.table_caption}></Text></View>
                        <View style={{ width: '30%' }}><Text style={styles.table_caption}>Lớp học phần</Text></View>
                        <View style={{ width: '25%' }}><Text style={styles.table_caption}>Lịch học</Text></View>
                        <View style={{ width: '15%' }}><Text style={styles.table_caption}>Còn trống</Text></View>
                        <View style={{ width: '15%' }}><Text style={styles.table_caption}>Chi tiết</Text></View>
                    </View>
                    <ScrollView style={{ height: Dimensions.get("window").height / 3.8 }}>
                        {
                            objData.listDSHocPhan.map((x, idx) => {
                                return (
                                    <View style={styles.table_body}>
                                        <View style={[styles.linedata, styles.w_15]}>

                                            <Checkbox
                                                value={x?.checked}
                                                onValueChange={(e) => {
                                                    SetData(e, idx, 'checked')
                                                }}
                                                color={x?.checked ? '#4630EB' : undefined}
                                            />

                                        </View>
                                        <View style={[styles.linedata, styles.w_30]}><Text style={[styles.table_data, ]}>{x.LopHocPhan}</Text></View>
                                        <View style={[styles.linedata, styles.w_25]}><Text style={[styles.table_data, ]}></Text></View>
                                        <View style={[styles.linedata, styles.w_15]}><Text style={[styles.table_data, ]}></Text></View>
                                        <View style={[styles.linedata, styles.w_15]}>
                                            <Entypo name="eye" size={22} color="blue"
                                                onPress={() => {
                                                    showDialog()
                                                }} />
                                        </View>
                                        <Portal>
                                            <Dialog visible={visible} onDismiss={hideDialog}>
                                                <Dialog.Title>Môn Học</Dialog.Title>
                                                <Dialog.ScrollArea>
                                                    <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                                                        <View style={{ paddingTop: 16, paddingBottom: 16 }}>
                                                            <View style={[styles.flex,]}>
                                                                <Text style={styles.text_caption}>Lớp học phần:</Text>
                                                            </View>
                                                            <View style={[styles.flex, styles.margintop]}>
                                                                <Text style={styles.text_caption}>Lịch học:</Text>
                                                            </View>
                                                            <View style={[styles.flex, styles.margintop]}>
                                                                <Text style={styles.text_caption}>Giảng viên:</Text>
                                                            </View>
                                                            <View style={[styles.flex, styles.margintop]}>
                                                                <Text style={styles.text_caption}>Phòng học:</Text>
                                                            </View>
                                                            <View style={[styles.flex, styles.margintop]}>
                                                                <Text style={styles.text_caption}>Học phí:</Text>
                                                            </View>
                                                            <View style={{
                                                                borderColor: '#C6E2FF',
                                                                borderWidth: 1, marginBottom: 8, marginTop: 8
                                                            }}>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                                <View style={styles.sv}>
                                                                    <View style={[styles.flex, styles.margintop]}>
                                                                        <Text style={styles.text_caption}>Số SV tối thiểu: </Text>
                                                                        <Text>15</Text>
                                                                    </View>
                                                                    <View style={[styles.flex, styles.margintop]}>
                                                                        <Text style={styles.text_caption}>Số SV đã ĐK:</Text>
                                                                        <Text>15</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={styles.sv}>
                                                                    <View style={[styles.flex, styles.margintop]}>
                                                                        <Text style={styles.text_caption}>Số SV tối đa:</Text>
                                                                        <Text>15</Text>
                                                                    </View>
                                                                    <View style={[styles.flex, styles.margintop]}>
                                                                        <Text style={styles.text_caption}>Còn trống:</Text>
                                                                        <Text>15</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </ScrollView>
                                                </Dialog.ScrollArea>
                                                <Dialog.Actions>
                                                    <Button onPress={hideDialog} > Đóng </Button>
                                                </Dialog.Actions>
                                            </Dialog>
                                        </Portal>
                                    </View>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={styles.btn}>
                <Button icon="check" mode="contained"
                    onPress={GhiLai}
                    style={{ width: '75%' }}>
                    Xác nhận
                </Button>
            </View>
        </View>
    )
}

const XemLichHoc = () => {
    const Data = [
        {
            Thu: 2,
            Id: 0,
            listLichHoc: [
                {
                    TenHocPhan: 'Đại số tuyến tính',
                    Id: 1224,
                },
                {
                    TenHocPhan: 'Giải tích 2',
                    Id: 454,
                },
            ]
        },
        {
            Thu: 3,
            Id: 1,
            listLichHoc: [
                {
                    TenHocPhan: 'Đại số tuyến tính',
                    Id: 5554,
                },
                {
                    TenHocPhan: 'Giải tích 2',
                    Id: 45244,
                },
            ]
        },
    ]
    return (
        <FlatList
            data={Data}
            renderItem={({ item }) => {
                return (
                    <View style={lichhoc.items}>
                        <View style={lichhoc.item_title}>
                            <View style={lichhoc.flex}>
                                <Entypo name="open-book" size={24} color="black" />
                                <Text style={lichhoc.item_title_header}> Thứ {item.Thu}</Text>
                            </View>
                        </View>
                       {
                        item.listLichHoc.map(x => {
                           return(
                            <ScrollView >
                            <View style={lichhoc.item_content}>
                                    <View style={[lichhoc.flex,]}>
                                        <Text style={lichhoc.text_caption}>Tên học phần: {x.TenHocPhan}</Text>
                                    </View>
                                    <View style={[lichhoc.flex,]}>
                                        <Text style={lichhoc.text_caption}>Tín chỉ: 3</Text>
                                    </View>
                                    <View style={[lichhoc.flex,]}>
                                        <Text style={lichhoc.text_caption}>Lớp học phần:</Text>
                                    </View>
                                    <View style={[lichhoc.flex,]}>
                                        <Text style={lichhoc.text_caption}>Lịch học:</Text>
                                    </View>
                                    <View style={{
                                        borderColor: '#C6E2FF',
                                        borderWidth: 1, marginBottom: 8, marginTop: 8
                                    }}></View>
                                </View>
                        </ScrollView>
                           )
                        })
                       }
                    </View>
                )
            }}
            keyExtractor={item => item.Id}
        />
    )
}

const lichhoc = {
    items: {
        borderColor: '#C6E2FF',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 16
    },
    flex: {
        flexDirection: 'row',
    },
    item_title: {
        backgroundColor: '#C6E2FF',
        padding: 8
    },
    item_content: {
        backgroundColor: '#fff',
        padding: 8
    },
}

const styles = {
    body: {
    },
    btn: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 300
    },
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
        fontWeight: 500,
        fontSize: 13
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
    },
    table_caption: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    table_data: {
        fontSize: 11,

    },
    ptop: {
        paddingTop: 10
    },
    text_caption: {
        fontWeight: 'bold'
    },
    linedata: {
        flexDirection: "row",
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'blue',
        padding: 10
    },
    w_55: {
        width: '55%'
    },
    w_30: {
        width: '30%'
    },
    w_25: {
        width: '25%'
    },
    w_15: {
        width: '15%'
    },
}