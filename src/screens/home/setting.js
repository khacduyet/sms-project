import { Image, SafeAreaView, Text, View, TouchableOpacity, Switch } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutSubmit } from "../../redux/actions/loginAction";

export default function HomeSetting() {
    const currentUser = useSelector((state) => state.currentUser);
    return <SafeAreaView style={[styles.container]}>
        <View style={[styles.wrapper]}>
            <View style={[styles.navTop]}>
                <View style={[styles.navLeft]}>
                    <TouchableOpacity>
                        <View style={[styles.navLeftContent]}>
                            <Image style={[styles.avatar]} source={require('../../resources/loadingtrans.gif')} resizeMode='stretch' />
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={[styles.navRight]}>
                    <Text style={[styles.navText, styles.navTextName]}>{currentUser && currentUser.TenNhanVien}</Text>
                    <Text style={[styles.navText]}>MSV: {currentUser && currentUser.MaNhanVien}</Text>
                    <Text style={[styles.navText]}>Lớp: </Text>
                    <Text style={[styles.navText]}>Khóa: </Text>
                </View>
            </View>
            <View style={[styles.menuBody]}>
                <BodySetting />
            </View>
        </View>
    </SafeAreaView>
}

function BodySetting() {
    const nav = useNavigation();
    const [fingerPrint, setFingerPrint] = useState(false);
    const dispatch = useDispatch();

    const handleFingerPrint = async () => {
        let fp = !fingerPrint
        setFingerPrint(fp);
        await AsyncStorage.setItem(
            'fingerPrint',
            `${fp}`
        );
    }

    const getFinger = async () => {
        let func = await AsyncStorage.getItem('fingerPrint')
        if (func) {
            let bool = func === "true"
            setFingerPrint(bool)
        }
    }

    useEffect(() => {
        getFinger()
    }, [])


    return <View style={[bodys.container]}>
        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <FontAwesome5 name="user-circle" size={35} color="black" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Thông tin cá nhân</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="black" />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <Feather name="settings" size={35} color="black" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Cài đặt</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="black" />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <MaterialIcons name="fingerprint" size={35} color="black" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Đăng nhập vân tay</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <Switch
                        style={[bodys.switch]}
                        onValueChange={handleFingerPrint}
                        value={fingerPrint}
                    />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <AntDesign name="lock" size={35} color="black" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Đổi mật khẩu</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="black" />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]} >
            <TouchableOpacity style={[bodys.buttonComponent]} onPress={() => {
                dispatch(logoutSubmit());
                nav.navigate("Login")
            }}>
                <View style={[bodys.wrapperLeft]}>
                    <Feather name="log-out" size={35} color="black" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Đăng xuất</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                </View>
            </TouchableOpacity>
        </View>


        <View style={[bodys.buttonWrap]}>
            <TouchableOpacity style={[bodys.button]}
                onPress={() => {
                    nav.navigate("Home")
                }}
            >
                <Text style={[bodys.buttonText, { color: "#fff" }]}>Quay lại</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    wrapper: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
    },
    navTop: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#243ffa',
        paddingTop: 30
    },
    navLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navLeftContent: {
        backgroundColor: "#fff",
        width: 125,
        height: 125,
        borderRadius: 125 / 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        width: 150,
        height: 100
    },
    navRight: {
        flex: 2,
        marginLeft: 10
    },
    navText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 600,
        paddingTop: 5
    },
    navTextName: {
        fontSize: 30
    },
    menuBody: {
        flex: 4
    }
}

const bodys = {
    container: {
        width: "100%",
        height: "100%",
        flexDirection: 'column',
        marginTop: 40
    },
    wrapper: {
        with: "100%",
        height: 50,
        borderBottomWidth: 1,
        marginTop: 5
    },
    buttonComponent: {
        with: "100%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
    },
    wrapperLeft: {
        flex: 1,
        alignItems: "flex-end",
    },
    wrapperMiddle: {
        flex: 4
    },
    wrapperText: {
        fontSize: 24,
        fontWeight: 500,
        paddingLeft: 20
    },
    wrapperRight: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    buttonWrap: {
        width: "100%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    button: {
        width: "90%",
        borderRadius: 5,
        height: "100%",
        backgroundColor: "blue",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    buttonText: {
        fontSize: 18,
    }
}