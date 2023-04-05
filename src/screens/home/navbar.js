import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function HomeNavBar({ currentUser }) {
    const navigate = useNavigation()
    return <View style={[styles.container]}>
        <View style={[styles.bell]}>
            <TouchableOpacity style={[styles.button, styles.buttonBadge]}>
                <MaterialCommunityIcons name="bell-badge-outline" size={40} color="black" style={{}} />
                <Text style={[styles.buttonTextBadge]}>2</Text>
            </TouchableOpacity>
        </View>
        <View style={[styles.user]}>
            <TouchableOpacity style={[styles.button, styles.buttonUser]} onPress={() => {
                navigate.navigate("Setting")
            }}>
                <FontAwesome5 name="user-circle" size={35} color="black" />
                <Text style={[styles.buttonText]}>{currentUser && currentUser.TenNhanVien}</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = {
    container: {
        width: "100%",
        height: 50,
        backgroundColor: "#cfe2ff",
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center'
    },
    bell: {
        flex: 1,
        height: 50,
        marginLeft: 10,
    },
    buttonBadge: {
        position: 'relative'
    },
    buttonTextBadge: {
        fontSize: 10,
        color: 'red',
        fontWeight: 600,
        position: 'absolute',
        top: 8,
        left: 26
    },
    user: {
        flex: 1,
        alignItems: "flex-end"
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
        fontWeight: 600,
    }
}