import * as React from "react";
import { StyleSheet, Text, View, Pressable, } from "react-native";
import { TextInput } from "@react-native-material/core";
import { RadioButton } from "react-native-paper";

export default function Infor() {
    const [value, setValue] = React.useState("0");
    const [text, onChangeText] = React.useState('Nguyễn Khánh Em');
    return (
        <View>
            <View style={styles.items}>
                <Text style={styles.label}>Họ và tên:</Text>
                <View>
                    <TextInput style={styles.inputtext} placeholder="Nhập họ và tên!"
                    onChangeText={onChangeText}
                    value={text} />
                </View>
            </View>
            <View style={styles.items}>
                <Text style={styles.label}>Giới tính:</Text>
                <View>
                    <RadioButton.Group
                        onValueChange={(newValue) => setValue(newValue)}
                        value={value}
                        buttonColor="red"
                        color="red"
                    >
                        <View style={styles.flex}>
                            <View style={styles.flex}>
                                <RadioButton.Android value="0" />
                                <Text>Nam</Text>
                            </View>
                            <View style={styles.flex}>
                                <RadioButton.Android value="1" />
                                <Text>Nữ</Text>
                            </View>
                        </View>
                    </RadioButton.Group>
                </View>
            </View>
            <View style={styles.items}>
                <Text style={styles.label}>CCCD:</Text>
                <View>
                    <TextInput style={styles.inputtext} />
                </View>
            </View>
            <View style={styles.items}>
                <Text style={styles.label}>Ngày:</Text>
                <View>
                    <Pressable >
                        <TextInput style={styles.inputtext} />
                    </Pressable>
                </View>
            </View>
            <View style={styles.items}>
                <Text style={styles.label}>Hộ khẩu thường trú:</Text>
                <View>
                    <TextInput style={styles.inputtext} />
                </View>
            </View>
            <View style={styles.items}>
                <Text style={styles.label}>Dân tộc:</Text>
                <View>
                    <TextInput style={styles.inputtext} />
                </View>
            </View>
            <View style={styles.items}>
                <Text style={styles.label}>Tôn giáo:</Text>
                <View>
                    <TextInput style={styles.inputtext} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    items: {
        padding: 10,
    },
    label: {
        paddingBottom: 5,
        paddingTop: 5,
    },
    inputtext: {
        // borderColor: "#ced4da",
        // border: 1,
        // borderRadius: 3,
        // backgroundColor: "#fff",
        // padding: 4,
        // fontSize: 16,
        // height: 50,
        // lineHeight: 20,
    },
    flex: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    RadioButton: {
        backgroundColor: "red",
        borderColor: "#fff",
    },
});