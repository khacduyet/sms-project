import { Image, SafeAreaView, Text, View, TouchableOpacity, Switch, ImageBackground } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutSubmit } from "../../redux/actions/loginAction";
import { BASE_URL, Screens } from "../../common/constant";

export default function HomeSetting() {
    const currentUser = useSelector((state) => state.currentUser);

    const [avatar, setAvatar] = useState({
        isExternal: false,
        url: "../../resources/avatar-student.png"
    })

    const getAvatar = async () => {
        if (currentUser.LinkAnhDaiDien) {
            let url = BASE_URL + currentUser.LinkAnhDaiDien
            let obj = {
                isExternal: true,
                url: url
            }
            setAvatar(obj)
            await AsyncStorage.setItem(
                'avatarCurrent',
                url,
            );
        }
    }

    useEffect(() => {
        getAvatar()
    }, [currentUser.LinkAnhDaiDien])

    return <SafeAreaView style={[styles.container]}>
        <View style={[styles.wrapper]}>
            <View style={[styles.navTop]}>
                <ImageBackground source={require("../../resources/bg-setting-header.png")} resizeMode="stretch" style={{ height: '100%', width: '100%', flexDirection: 'row' }}>
                    <View style={[styles.navLeft]}>
                        <TouchableOpacity>
                            <View style={[styles.navLeftContent]}>
                                <Image style={[styles.avatar]} source={avatar.isExternal ? { uri: avatar.url } : require(`../../resources/avatar-student.png`)} resizeMode='stretch' />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={[styles.navRight]}>
                        <Text style={[styles.navText, styles.navTextName]}>{currentUser && currentUser.TenNhanVien}</Text>
                        <Text style={[styles.navText]}>MSV: {currentUser && currentUser.MaNhanVien}</Text>
                        <Text style={[styles.navText]}>Lớp: </Text>
                        <Text style={[styles.navText]}>Khóa: </Text>
                    </View>

                </ImageBackground>
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
                    <FontAwesome5 name="user-circle" size={35} color="#1e20e7" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Thông tin cá nhân</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="#494949" />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <Feather name="settings" size={35} color="#1e20e7" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>Cài đặt</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="#494949" />
                </View>
            </TouchableOpacity>
        </View>

        {/* <View style={[bodys.wrapper]}>
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
        </View> */}

        {/* <View style={[bodys.wrapper]}>
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
        </View> */}

        <View style={[bodys.wrapper]} >
            <TouchableOpacity style={[bodys.buttonComponent]} onPress={() => {
                dispatch(logoutSubmit());
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
                    nav.navigate(Screens.Home)
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
        flex: 2,
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
        height: 150
    },
    navRight: {
        flex: 3,
    },
    navText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 600,
        paddingTop: 5,
        paddingLeft: 10
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
        paddingTop: 30,
        backgroundColor: "#f3f3f3"
    },
    wrapper: {
        width: "100%",
        height: 50,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonComponent: {
        width: "90%",
        height: "100%",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10
    },
    wrapperLeft: {
        flex: 1,
        alignItems: "flex-end",
    },
    wrapperMiddle: {
        flex: 4
    },
    wrapperText: {
        fontSize: 20,
        fontWeight: 500,
        paddingLeft: 20
    },
    wrapperRight: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 10
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
        borderRadius: 10,
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