import { SafeAreaView, Text, View, TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Screens } from "../../common/constant";
import { StatusBar } from "expo-status-bar";
import { useMemo } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function HomeNavBar({ currentUser }) {
    const navigate = useNavigation()

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
        }
    }

    useEffect(() => {
        getAvatar()
    }, [currentUser.LinkAnhDaiDien])

    const nameStudent = useMemo(() => {
        let arr = currentUser.TenNhanVien.split(" ");
        return arr.length && arr[arr.length - 1]
    }, [currentUser.TenNhanVien])

    return <>
        <StatusBar style="light" backgroundColor="#243ffa" />
        <View style={[styles.container]}>
            <View style={[styles.user]}>
                <TouchableOpacity style={[styles.button, styles.buttonUser]} onPress={() => {
                    navigate.push(Screens.Setting)
                }}>
                    <Image style={[styles.avatar]} source={avatar.isExternal ? { uri: avatar.url } : require(`../../resources/avatar-student.png`)} resizeMode='stretch' />
                    <Text style={[styles.buttonText]}>Xin chào! <Text style={[styles.buttonText, styles.buttonTextName]}>{nameStudent}</Text></Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.bell]}>
                <TouchableOpacity style={[styles.button, styles.buttonBadge]}>
                    <SimpleLineIcons name="bell" size={25} color="black" />
                    <View style={[styles.buttonTextContainBadge]}>
                        <Text style={[styles.buttonTextBadge]}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </>
}

const styles = {
    container: {
        paddingTop: "10%",
        width: "100%",
        height: 85,
        backgroundColor: "#cfe2ff",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 15
    },
    bell: {
        flex: 1,
        height: 50,
        marginLeft: 10,
        alignItems: "flex-end",
        paddingRight: 10
    },
    buttonBadge: {
        position: 'relative'
    },
    buttonTextContainBadge: {
        backgroundColor: "red",
        width: 15,
        height: 15,
        borderRadius: 15 / 2,
        justifyContent: "center",
        alignItems: 'center',
        position: 'absolute',
        top: 8,
        left: 12,
    },
    buttonTextBadge: {
        fontSize: 10,
        color: '#fff',
        fontWeight: 600,

    },
    user: {
        flex: 2,
        alignItems: "flex-start",
        paddingLeft: 10
    },
    avatar: {
        width: 50,
        height: 50
    },
    button: {
        height: "100%",
        justifyContent: "center",
    },
    buttonUser: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 18,
        marginLeft: 10,
        marginRight: 10,
    },
    buttonTextName: {
        fontWeight: 600,
    }
}