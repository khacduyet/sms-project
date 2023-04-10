import { useRef, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Button } from "../../common/components";
import { Screens, TextButton } from "../../common/constant";
import OTPTextInput from "react-native-otp-textinput";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import HeaderBack from "../../common/header";
import Stepper from "react-native-stepper-ui";

const TYPE = {
  phone: "phone",
  email: "email",
};

const StepOne = ({ value, setValue, handleNext }) => {
  return (
    <View>
      <View style={styles.formWrapInput}>
        <Text style={styles.formText}>Vui lòng nhập tên tài khoản</Text>
        <TextInput
          style={styles.formInput}
          value={value}
          onChangeText={setValue}
          placeholder={`Tên tài khoản`}
        />
      </View>
      <Button text={TextButton.Next} onPress={handleNext} disabled={!value} />
    </View>
  );
};

const StepTwo = ({ current, setCurrent, handleNext }) => {
  return (
    <View>
      <View style={styles.formWrapInput}>
        <RadioButtonGroup
          containerStyle={{ marginBottom: 0 }}
          radioStyle={{
            marginBottom: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
          selected={current}
          onSelected={(value) => setCurrent(value)}
          radioBackground="green"
        >
          <RadioButtonItem
            value={TYPE.email}
            label={
              <Text style={{ marginBottom: 10 }}>
                Xác minh qua email đã đăng ký
              </Text>
            }
          />
          <RadioButtonItem
            value={TYPE.phone}
            label={
              <Text style={{ marginBottom: 10 }}>
                Xác minh qua số điện thoại đã đăng ký
              </Text>
            }
          />
        </RadioButtonGroup>
      </View>
      <Button text={TextButton.Next} onPress={handleNext} />
    </View>
  );
};

const StepThree = ({ value, setValue, handleNext, type }) => {
  const otpInput = useRef(null);

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
          Mã xác minh đã được gửi đến {type === TYPE.email ? "Email" : "SĐT"}
        </Text>
        <OTPTextInput
          ref={otpInput}
          inputCount={6}
          handleTextChange={() => {
            console.log("otpInput.current", otpInput.current.state.otpText);
            let _boll = otpInput.current.state.otpText.filter((x) => !x).length;
            console.log("_boll", _boll);
          }}
        />
      </View>
      <Button
        text={TextButton.Next}
        onPress={handleNext}
        disabled={
          otpInput
            ? otpInput.current.state.otpText.filter((x) => !x).length > 0
            : false
        }
      />
    </View>
  );
};

const StepFour = ({ value, setValue, handleNext }) => {
  const [isShow, setIsShow] = useState(true);
  const [isMatch, setIsMatch] = useState(true);
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
  const handleSubmit = () => {
    if (passwords.password != passwords.repassword) {
      setIsMatch(false);
      return;
    }
    handleNext();
  };
  return (
    <View>
      <View style={styles.formWrapInput}>
        <View style={{ marginBottom: 10 }}>
          <Text style={[styles.formText, styles.formTextLabel]}>
            Mật khẩu mới:
          </Text>
          <TouchableOpacity onPress={() => setIsShow(!isShow)}>
            <Text style={[styles.isShow]}>Hiện</Text>
          </TouchableOpacity>
          <TextInput
            secureTextEntry={isShow}
            style={styles.formInput}
            value={passwords.password}
            onChangeText={(e) => setForm(e, `password`)}
            placeholder={`Mật khẩu mới`}
          />
          {!isMatch && (
            <Text style={[{ color: "red" }]}>Mật khẩu không khớp!</Text>
          )}
        </View>
        <Text style={[styles.formText, styles.formTextLabel]}>
          Nhập lại mật khẩu mới:
        </Text>
        <TextInput
          secureTextEntry={isShow}
          style={styles.formInput}
          value={passwords.repassword}
          onChangeText={(e) => setForm(e, `repassword`)}
          placeholder={`Mật khẩu mới`}
        />
        {!isMatch && (
          <Text style={[{ color: "red" }]}>Mật khẩu không khớp!</Text>
        )}
      </View>
      <Button
        text={TextButton.Accept}
        onPress={handleSubmit}
        disabled={!passwords.password || !passwords.repassword}
      />
    </View>
  );
};

export default function ForgotPassword() {
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);
  const [current, setCurrent] = useState(TYPE.phone);
  const [user, setUser] = useState({});

  const handleNext = () => {
    let _next = active + 1;
    setActive(_next);
  };

  const handleNextStepTwo = () => {
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
      handleNext={handleNextStepTwo}
    />,
    <StepThree
      current={current}
      setCurrent={setCurrent}
      type={current}
      user={user}
    />,
    <StepFour
      current={current}
      setCurrent={setCurrent}
      type={current}
      user={user}
    />,
  ];

  return (
    <>
      <SafeAreaView style={[styles.container]}>
        <HeaderBack header={Screens.ForgotPassword} />
        <View style={[styles.wrapper]}>
          <Stepper
            // showButton={false}
            active={active}
            content={content}
            onBack={() => setActive((p) => p - 1)}
            onFinish={() => alert("Finish")}
            onNext={() => setActive((p) => p + 1)}
          />
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
    marginTop: 30,
  },
  formText: {
    fontSize: 18,
    fontWeight: 600,
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
    borderWidth: 1,
    padding: 10,
  },
  isShow: {
    position: "absolute",
    top: -22,
    right: 5,
  },
});
