import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import HeaderBack from "../../../common/header";
import { Screens, TextButton } from "../../../common/constant";
import { Button, ToastMessage } from "../../../common/components";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { AuthServices } from "../../../services/auth.service";
import Toast from 'react-native-root-toast';
import { useDispatch } from "react-redux";
import { logoutSubmit } from "../../../redux/actions/loginAction";

export default function ChangePassword() {
    const [isShow, setIsShow] = useState(true)
    const [formValue, setFormValue] = useState({
        passwordOld: '',
        password: '',
        repassword: ''
    })
    const [isValids, setIsValids] = useState({
        passwordOld: true,
        password: true,
        repassword: true
    })
    const [invalid, setInvalid] = useState('')
    const dispatch = useDispatch();


    const setForm = (value, prop) => {
        if (value !== undefined) {
            setFormValue({
                ...formValue,
                [prop]: value
            })
        }
    }

    const ListData = [
        {
            label: "Mật khẩu hiện tại:",
            placeholder: "Nhập mật khẩu hiện tại",
            invalid: invalid,
            value: formValue,
            setValue: setForm,
            prop: `passwordOld`,
            isShow: isShow,
            isValids: isValids,
            setIsShow
        },
        {
            label: "Mật khẩu mới:",
            placeholder: "Nhập mật khẩu mới",
            invalid: invalid,
            value: formValue,
            setValue: setForm,
            prop: `password`,
            isShow: isShow,
            isValids: isValids
        },
        {
            label: "Nhập lại mật khẩu mới:",
            placeholder: "Nhập lại mật khẩu mới",
            invalid: invalid,
            value: formValue,
            setValue: setForm,
            prop: `repassword`,
            isShow: isShow,
            isValids: isValids
        },

    ]

    const handleChangePassword = async () => {
        try {
            // Check mật khẩu mới khớp nhau không?
            if (formValue.password != formValue.repassword) {
                setIsValids({
                    ...isValids,
                    password: false,
                    repassword: false,
                })
                setInvalid("Mật khẩu không khớp!")
                return;
            }
            // Gọi api đổi mk
            let res = await AuthServices.changePassword({
                OldPassword: formValue.passwordOld,
                NewPassword: formValue.password
            })
            if (res) {
                if (res.Error === 0) {
                    setIsValids({
                        passwordOld: false,
                        password: true,
                        repassword: true,
                    })
                    setInvalid(res.Detail)
                    return;
                }
                // Thành công => thông báo
                ToastMessage("Thay đổi mật khẩu thành công!")
                dispatch(logoutSubmit())
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return <SafeAreaView style={[styles.container]}>
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <HeaderBack header={Screens.ChangePassword} />
            <View style={[styles.wrapper]}>
                {ListData.map((x, index) => {
                    return <FormItem {...x} key={index} />
                })}
                <View style={styles.buttonWrap}>
                    <Button text={TextButton.Accept} onPress={handleChangePassword} />
                </View>
            </View>
        </KeyboardAvoidingView>

    </SafeAreaView>
}

const FormItem = ({ value, setValue, prop, label, isShow, placeholder, setIsShow, isValids, invalid }) => {
    return <View style={[styles.formItem]}>
        <View style={[styles.labelWrap]}>
            <Text style={[styles.label]}>{label}</Text>
            {setIsShow &&
                <TouchableOpacity style={[styles.showPassButton]} onPress={() => setIsShow(!isShow)}>
                    <Text style={[styles.showPassText]}>HIỆN</Text>
                </TouchableOpacity>}
        </View>
        <View style={[styles.inputWrap]}>
            <TextInput style={[styles.input]} value={value[prop]} onChangeText={e => setValue(e, prop)} placeholder={placeholder} secureTextEntry={isShow} />
            {!isValids[prop] && <View style={[styles.inputValid]}><Text style={[styles.inputValidText]}>{invalid}</Text></View>}
        </View>
    </View>
}

const styles = {
    container: {
        width: '100%',
        height: '100%',
    },
    wrapper: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    formItem: {
        width: '90%',
        // height: 100,
        marginBottom: 20,
    },
    showPassButton: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    showPassText: {

    },
    labelWrap: {

    },
    label: {
        fontSize: 18
    },
    inputWrap: {

    },
    input: {
        borderWidth: 1,
        width: '100%',
        height: 40,
        borderRadius: 10,
        padding: 10
    },
    inputValid: {

    },
    inputValidText: {
        color: 'red'
    },
    buttonWrap: {
        width: '100%',
        flex: 3
    }
}