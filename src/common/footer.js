import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, StatusBar, Image } from 'react-native';
import { Colors, Screens } from './constant';
import { FontAwesome } from '@expo/vector-icons';

export default function ChatBotNav({ }) {
    const nav = useNavigation()
    return <>
        <TouchableOpacity style={[styles.container]} onPress={() => nav.navigate(Screens.ChatBot)}>
            {/* <Image source={require('../resources/chatbot1.png')} style={[styles.image]} /> */}
            <FontAwesome name="question-circle" size={50} color={`#fff`} />
        </TouchableOpacity>
    </>
}

const Size = 60
const styles = {
    container: {
        width: Size,
        height: Size,
        position: 'absolute',
        right: 10,
        bottom: 10,
        borderRadius: Size / 2,
        backgroundColor: Colors.Primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: Size,
        height: Size,
        borderRadius: Size / 2,

    }
}