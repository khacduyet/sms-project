import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import HeaderBack from "../../../common/header";
import { Colors, Regexs, Screens, TextButton } from "../../../common/constant";
import { Button, ToastMessage } from "../../../common/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { AuthServices } from "../../../services/auth.service";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import { logoutSubmit } from "../../../redux/actions/loginAction";
import { TextInput } from "@react-native-material/core";
import { _stl } from "../../../common/common";

export default function ChangePassword() {
  const [isShow, setIsShow] = useState(true);
  const [formValue, setFormValue] = useState({
    passwordOld: "",
    password: "",
    repassword: "",
  });
  const [isValids, setIsValids] = useState({
    passwordOld: true,
    password: true,
    repassword: true,
  });
  const [invalid, setInvalid] = useState("");
  const dispatch = useDispatch();

  const setForm = (value, prop) => {
    if (value !== undefined) {
      setFormValue({
        ...formValue,
        [prop]: value,
      });
    }
  };

  const checkIsNull = useMemo(() => {
    if (formValue.passwordOld && formValue.password && formValue.repassword) {
      return false;
    }
    return true;
  }, [formValue]);

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
      setIsShow,
    },
    {
      label: "Mật khẩu mới:",
      placeholder: "Nhập mật khẩu mới",
      invalid: invalid,
      value: formValue,
      setValue: setForm,
      prop: `password`,
      isShow: isShow,
      isValids: isValids,
    },
    {
      label: "Nhập lại mật khẩu mới:",
      placeholder: "Nhập lại mật khẩu mới",
      invalid: invalid,
      value: formValue,
      setValue: setForm,
      prop: `repassword`,
      isShow: isShow,
      isValids: isValids,
    },
  ];

  const handleChangePassword = async () => {
    try {
      if (!formValue.password) {
        setIsValids({
          passwordOld: true,
          password: false,
          repassword: true,
        });
        setInvalid("Chưa nhập mật khẩu hiện tại!");
        return;
      }

      // Gọi api đổi mk
      let res = await AuthServices.changePassword({
        OldPassword: formValue.passwordOld,
        NewPassword: formValue.password,
      });
      if (res) {
        if (res.Error !== 4) {
          setIsValids({
            passwordOld: false,
            password: true,
            repassword: true,
          });
          setInvalid(res.Detail);
          return;
        }

        const found = formValue.password.match(Regexs.password);
        if (!found) {
          setIsValids({
            passwordOld: true,
            password: false,
            repassword: true,
          });
          setInvalid("Chưa đúng định dạng!");
          return;
        }
        // Check mật khẩu mới khớp nhau không?
        if (formValue.password != formValue.repassword) {
          setIsValids({
            passwordOld: true,
            password: true,
            repassword: false,
          });
          setInvalid("Mật khẩu không khớp!");
          return;
        }
        setIsValids({
          passwordOld: true,
          password: true,
          repassword: true,
        });
        // Thành công => thông báo
        ToastMessage("Thay đổi mật khẩu thành công!");
        dispatch(logoutSubmit());
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <SafeAreaView style={[styles.container, _stl._container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HeaderBack header={Screens.ChangePassword} />
        <View style={[styles.wrapper]}>
          {ListData.map((x, index) => {
            return <FormItem {...x} key={index} />;
          })}
          <Text style={[styles.formItem, { color: "#8E8D8D" }]}>
            Lưu ý: Mật khẩu phải có tối thiểu 9 ký tự bao gồm cả chữ và số
          </Text>
          <View style={styles.buttonWrap}>
            <Button
              text={TextButton.Accept}
              onPress={handleChangePassword}
              disabled={checkIsNull}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const FormItem = ({
  value,
  setValue,
  prop,
  label,
  isShow,
  placeholder,
  setIsShow,
  isValids,
  invalid,
}) => {
  return (
    <View style={[styles.formItem]}>
      <View style={[styles.labelWrap]}>
        {/* <Text style={[styles.label]}>{label}</Text> */}
        {setIsShow && (
          <TouchableOpacity
            style={[styles.showPassButton]}
            onPress={() => setIsShow(!isShow)}
          >
            <Text
              style={[
                styles.showPassText,
                {
                  color: isShow ? "#000" : "blue",
                },
              ]}
            >
              {isShow ? `HIỆN` : `ẨN`}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={[styles.inputWrap]}>
        <TextInput
          color={Colors.Primary}
          style={[styles.input]}
          value={value[prop]}
          onChangeText={(e) => setValue(e, prop)}
          // placeholder={placeholder}
          secureTextEntry={isShow}
          label={placeholder}
          variant="standard"
        />
        {!isValids[prop] && (
          <View style={[styles.inputValid]}>
            <Text style={[styles.inputValidText]}>{invalid}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  formItem: {
    width: "90%",
    // height: 100,
    marginBottom: 20,
  },
  showPassButton: {
    position: "absolute",
    right: 10,
    top: 0,
    zIndex: 2,
  },
  showPassText: {
    textDecorationLine: "underline",
  },
  labelWrap: {},
  label: {
    fontSize: 18,
  },
  inputWrap: {
    marginTop: 20,
  },
  input: {
    // borderWidth: 1,
    width: "100%",
    height: 40,
    borderRadius: 10,
    // padding: 10,
    // marginTop: 20,
  },
  inputValid: {
    marginTop: 15,
  },
  inputValidText: {
    color: "red",
  },
  buttonWrap: {
    marginTop: 20,
    width: "100%",
    flex: 3,
  },
};
