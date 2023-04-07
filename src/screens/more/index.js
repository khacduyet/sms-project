import { Image, SafeAreaView, Text, View, TouchableOpacity, Switch, ImageBackground, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutSubmit } from "../../redux/actions/loginAction";
import { BASE_URL, Screens } from "../../common/constant";

export default function HomeMore() {
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
    const dispatch = useDispatch();

    const handleLogout = () => {
        let alert = Alert.alert("Thông báo", "Bạn có chắc chắn muốn đăng xuất tài khoản?", [
            {
                text: "Hủy",
                onPress: () => {
                    console.log("Người dùng đã hủy thao tác");
                },
            },
            {
                text: "Đồng ý",
                onPress: () => {
                    dispatch(logoutSubmit())
                }
            }
        ])

    }

    return <View style={[bodys.container]}>
        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]}>
                <View style={[bodys.wrapperLeft]}>
                    <FontAwesome5 name="user-circle" size={35} color="#1e20e7" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>{Screens.Personal}</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="#494949" />
                </View>
            </TouchableOpacity>
        </View>

        <View style={[bodys.wrapper]}>
            <TouchableOpacity style={[bodys.buttonComponent]} onPress={() => {
                nav.push(Screens.Setting)
            }}>
                <View style={[bodys.wrapperLeft]}>
                    <Feather name="settings" size={35} color="#1e20e7" />
                </View>
                <View style={[bodys.wrapperMiddle]}>
                    <Text style={[bodys.wrapperText]}>{Screens.Setting}</Text>
                </View>
                <View style={[bodys.wrapperRight]}>
                    <MaterialIcons name="keyboard-arrow-right" size={35} color="#494949" />
                </View>
            </TouchableOpacity>
        </View>



        <View style={[bodys.wrapper, { marginTop: 40 }]} >
            <TouchableOpacity style={[bodys.buttonComponent, bodys.buttonComponentLogout]} onPress={handleLogout}>

                <View style={[bodys.wrapperMiddleLogout]}>
                    <MaterialCommunityIcons name="logout" size={35} color="red" />
                    <Text style={[bodys.wrapperText, bodys.wrapperTextLogout]}>Đăng xuất</Text>
                </View>
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
    buttonComponentLogout: {
        backgroundColor: '#fcdede'
    },
    wrapperLeft: {
        flex: 1,
        alignItems: "flex-end",
    },
    wrapperMiddle: {
        flex: 4
    },
    wrapperMiddleLogout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapperText: {
        fontSize: 16,
        fontWeight: 500,
        paddingLeft: 20
    },
    wrapperTextLogout: {
        color: 'red',
        paddingLeft: 5
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