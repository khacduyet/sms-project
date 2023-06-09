import { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Button, ToastMessage } from "../../common/components";
import { Colors, Regexs, Screens, TextButton } from "../../common/constant";
import OTPTextInput from "react-native-otp-textinput";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import HeaderBack from "../../common/header";
import Stepper from "react-native-stepper-ui";
import {
  AuthServices,
  DanhMucAccountServices,
} from "../../services/auth.service";
import { current } from "@reduxjs/toolkit";
import { useNavigation } from "@react-navigation/native";
import {
  _stl,
  hideMaskEmailOrPhone,
  returnMessage,
  StatusCode,
  TYPE,
} from "../../common/common";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/actions/loadingAction";
import { TextInput } from "@react-native-material/core";

const SECONDS_OTP = 120;

const StepOne = ({ value, setValue, handleNext }) => {
  return (
    <View>
      <View style={styles.formWrapInput}>
        {/* <Text style={styles.formText}>Vui lòng nhập tên tài khoản</Text> */}
        <TextInput
          style={styles.formInput}
          color={Colors.Primary}
          value={value}
          onChangeText={setValue}
          // placeholder={`Tên tài khoản`}
          label="Tên tài khoản"
          variant="standard"
        />
      </View>
      <Button text={TextButton.Next} onPress={handleNext} disabled={!value} />
    </View>
  );
};

const StepTwo = ({ current, setCurrent, handleNext, user, next }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [error, setError] = useState({
    isShow: false,
    message: ``,
  });

  const handleNextStep = () => {
    if (current === TYPE.phone) {
      if (value !== user.DienThoai) {
        setError({
          isShow: true,
          message: `Số điện thoại không đúng với số đã đăng ký`,
        });
        return;
      }
    } else {
      if (value !== user.Email) {
        setError({
          isShow: true,
          message: `Email không đúng với email đã đăng ký`,
        });
        return;
      }
    }
    handleNext();
    next();
  };

  useEffect(() => {
    dispatch(setLoading(false));
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.formWrapInput]}>
          <RadioButtonGroup
            containerStyle={{ marginBottom: 0 }}
            radioStyle={{
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
            selected={current}
            onSelected={(value) => {
              setValue("");
              setCurrent(value);
            }}
            radioBackground="green"
          >
            <RadioButtonItem
              value={TYPE.email}
              label={
                <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                  Xác minh qua email đã đăng ký{" "}
                  {user?.Email && hideMaskEmailOrPhone(user.Email, TYPE.email)}
                </Text>
              }
            />
            <RadioButtonItem
              value={TYPE.phone}
              label={
                <Text style={{ marginBottom: 10, marginLeft: 10 }}>
                  Xác minh qua số điện thoại đã đăng ký{" "}
                  {user?.DienThoai &&
                    hideMaskEmailOrPhone(user.DienThoai, TYPE.phone)}
                </Text>
              }
            />
          </RadioButtonGroup>
        </View>
        <View
          style={[
            styles.formWrapInput,
            {
              // flex: 1,
            },
          ]}
        >
          <TextInput
            style={styles.formInput}
            value={value}
            color={Colors.Primary}
            onChangeText={(e) => {
              if (error.isShow) {
                setError({
                  ...error,
                  isShow: false,
                });
              }
              setValue(e);
            }}
            label={
              current === TYPE.phone
                ? `Vui lòng nhập lại SĐT đã đăng ký`
                : `Vui lòng nhập lại Email đã đăng ký`
            }
            variant="standard"
          />
          {error.isShow && (
            <Text style={{ color: "red", marginTop: 20 }}>{error.message}</Text>
          )}
        </View>
        <Button
          text={TextButton.Next}
          onPress={handleNextStep}
          disabled={value.length === 0}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const StepThree = ({ type, user, handleNextStepTwo, next }) => {
  const otpInput = useRef(null);
  // const [seconds, setSeconds] = useState(SECONDS_OTP);
  const [title, setTitle] = useState(`Mã OTP có hiệu lực trong vòng `);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(false));
  }, []);

  // useEffect(() => {
  //   if (seconds === 0) {
  //     setTitle(`Mã OTP đã hết hạn`);
  //   }
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds((seconds) => seconds - 1);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [seconds]);

  const pushOTPServer = async (otp) => {
    let _otp = "";
    otp.map((x) => {
      _otp += x;
    });
    if (_otp.length === 6) {
      let res = await DanhMucAccountServices.XacMinhOTP({
        IdUser: user.IdUser,
        OTP: parseInt(_otp),
      });
      if (res.StatusCode === 500) {
        ToastMessage(res.Message);
        clearText();
      } else {
        next();
      }
    }
  };

  const clearText = () => {
    otpInput.current.clear();
  };

  return (
    <View>
      <View style={(styles.formWrapInput, styles.centers)}>
        <Text style={[styles.formText]}>
          Mã xác minh đã được gửi đến {type === TYPE.email ? "Email" : "SĐT"}
        </Text>
        <Text style={[styles.formText]}>
          {hideMaskEmailOrPhone(
            type === TYPE.email ? user.Email : user.DienThoai,
            type
          )}
        </Text>
        <OTPTextInput
          ref={otpInput}
          inputCount={6}
          handleTextChange={() => {
            pushOTPServer(otpInput.current.state.otpText);
          }}
        />
        <Text style={[styles.formText]}>
          <Text style={{ fontWeight: 400 }}>{title}</Text>
          <Text style={styles.formTextNote}>{/* {SECONDS_OTP}s  */}2 phút</Text>
        </Text>
        <TouchableOpacity
          onPress={() => {
            handleNextStepTwo();
            setTitle(`Mã OTP có hiệu lực trong vòng `);
            ToastMessage("Đã gửi lại mã OTP");
            dispatch(setLoading(false));
          }}
        >
          <Text
            style={[styles.formText, styles.formTextNote, { color: "#223ffa" }]}
          >
            Gửi lại mã
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Button
        text={TextButton.Next}
        onPress={() => {
          console.log(
            "otp",
            otp.filter((x) => x)
          );
        }}
        disabled={otp.filter((x) => x).length !== 6}
      /> */}
    </View>
  );
};

const StepFour = ({ user }) => {
  const nav = useNavigation();
  const [isShow, setIsShow] = useState(true);
  const [isMatch, setIsMatch] = useState(true);
  const [textValid, setTextValid] = useState(null);
  const [passwords, setPasswords] = useState({
    password: "",
    repassword: "",
  });
  const setForm = (value, prop) => {
    if (value !== undefined) {
      setPasswords({
        ...passwords,
        [prop]: value,
      });
    }
  };
  const handleSubmit = async () => {
    const found = passwords.password.match(Regexs.password);
    if (!found) {
      setTextValid(`Chưa đúng định dạng`);
      setIsMatch(false);
      return;
    }

    if (passwords.password != passwords.repassword) {
      setTextValid(`Mật khẩu không khớp!`);
      setIsMatch(false);
      return;
    }

    let res = await AuthServices.ResetForgotPasswordNoLogin({
      IdUser: user.IdUser,
      NewPassword: passwords.password,
    });
    if (res.Error === 4) {
      ToastMessage(returnMessage(StatusCode.UPDATE_PASSWORD));
      nav.navigate("Login");
    }
  };
  return (
    <View>
      <View style={styles.formWrapInput}>
        <View style={{ marginBottom: 10 }}>
          {/* <Text style={[styles.formText, styles.formTextLabel]}>
            Mật khẩu mới:
          </Text> */}
          <TouchableOpacity onPress={() => setIsShow(!isShow)}>
            <Text
              style={[
                styles.isShow,
                {
                  color: isShow ? "#000" : "blue",
                  textDecorationLine: "underline",
                },
              ]}
            >
              {isShow ? `HIỆN` : `ẨN`}
            </Text>
          </TouchableOpacity>
          <TextInput
            secureTextEntry={isShow}
            style={styles.formInput}
            color={Colors.Primary}
            value={passwords.password}
            onChangeText={(e) => setForm(e, `password`)}
            label="Mật khẩu mới"
            variant="standard"
          />
          {/* {!isMatch && (
            <Text style={[{ color: "red" }]}>Mật khẩu không khớp!</Text>
          )} */}
        </View>
        {/* <Text style={[styles.formText, styles.formTextLabel]}>
          Nhập lại mật khẩu mới:
        </Text> */}
        <TextInput
          secureTextEntry={isShow}
          color={Colors.Primary}
          style={styles.formInput}
          value={passwords.repassword}
          onChangeText={(e) => setForm(e, `repassword`)}
          label=" Nhập lại mật khẩu mới"
          variant="standard"
        />
        {!isMatch && <Text style={[{ color: "red" }]}>{textValid}</Text>}
        <Text style={[{ color: "#8E8D8D", marginTop: 15 }]}>
          Lưu ý: Mật khẩu phải có tối thiểu 9 ký tự bao gồm cả chữ và số
        </Text>
      </View>
      <Button
        text={TextButton.Accept}
        onPress={handleSubmit}
        disabled={!passwords.password || !passwords.repassword}
      />
    </View>
  );
};

export default function ForgotPassword({ route }) {
  const { username } = route.params;
  const [value, setValue] = useState(username);
  const [active, setActive] = useState(0);
  const [current, setCurrent] = useState(TYPE.email);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const handleNext = async () => {
    dispatch(setLoading(true));
    let res = await DanhMucAccountServices.GetUserByUserName(value);
    if (res) {
      if (!res.Data) {
        dispatch(setLoading(false));
        ToastMessage(res.Message);
        return;
      }
      setUser(res.Data);
      next();
    }
  };

  const handleNextStepTwo = async () => {
    dispatch(setLoading(true));
    if (current === TYPE.email) {
      await DanhMucAccountServices.MaOtpEmail(user.Email, user.IdUser);
    } else {
      await DanhMucAccountServices.MaOtpSMS(user.DienThoai, user.IdUser);
    }
  };

  const next = () => {
    let _next = active + 1;
    setActive(_next);
  };

  const content = [
    <StepOne
      value={value}
      setValue={setValue}
      handleNext={handleNext}
      user={user}
      setUser={setUser}
    />,
    <StepTwo
      current={current}
      setCurrent={setCurrent}
      user={user}
      handleNext={handleNextStepTwo}
      next={next}
    />,
    <StepThree
      current={current}
      setCurrent={setCurrent}
      type={current}
      user={user}
      handleNextStepTwo={handleNextStepTwo}
      next={next}
    />,
    <StepFour user={user} />,
  ];

  return (
    <>
      <SafeAreaView style={[styles.container, _stl._container]}>
        <HeaderBack header={Screens.ForgotPassword} />
        <View style={[styles.wrapper]}>
          {/* <Stepper
            showButton={false}
            active={active}
            content={content}
            onBack={() => setActive((p) => p - 1)}
            onFinish={() => alert("Finish")}
            onNext={() => setActive((p) => p + 1)}
          /> */}
          {content[active]}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    margin: 20,
  },
  formWrapInput: {
    padding: 20,
    // marginTop: 30,
    // marginBottom: 30,
  },
  formText: {
    fontSize: 18,
    fontWeight: 600,
  },
  formTextNote: {
    // color: "#223ffa",
  },
  formTextLabel: {
    fontSize: 18,
    fontWeight: 400,
  },
  centers: {
    marginTop: 30,
    fontWeight: 400,
    alignItems: "center",
    justifyContent: "center",
  },
  formInput: {
    width: "100%",
    height: 40,
    borderRadius: 10,
    marginBottom: 20,
    // borderWidth: 1,
    // padding: 10,
  },
  isShow: {
    position: "absolute",
    top: -10,
    right: 5,
  },
});
