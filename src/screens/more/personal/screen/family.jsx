import * as React from "react";
import { StyleSheet, Text, View, Pressable,ScrollView } from "react-native";
import { Checkbox } from "react-native-paper";
import { TextInput } from "@react-native-material/core";

export default function Family() {
  const [checked, setChecked] = React.useState(false);

  return (
    <ScrollView >
    <View>
       <View style={styles.items}>
        <View style={styles.flex}>
          <Text style={styles.label}>Họ và Tên Cha:</Text>
          <View style={styles.flex}>
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>Liên hệ chính</Text>
          </View>
        </View>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Nghề nghiệp:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Địa chỉ liên hệ:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>

      <View style={styles.markdown}></View>

      <View style={styles.items}>
        <View style={styles.flex}>
          <Text style={styles.label}>Họ và Tên Mẹ:</Text>
          <View style={styles.flex}>
            <Checkbox.Android
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text>Liên hệ chính</Text>
          </View>
        </View>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Nghề nghiệp:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Địa chỉ liên hệ:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  markdown: {
    borderBottomColor: "#d0d7de",
    borderBottomWidth: 1,
    fontSize: 1.5,
  },
  items: {
    padding: 10,
  },
  label: {
    paddingBottom: 5,
    paddingTop: 5,
  },
  inputtext: {
    // borderColor: "#ced4da",
    // border: 1,
    // borderRadius: 3,
    // backgroundColor: "#fff",
    // padding: 4,
    // fontSize: 16,
    // height: 50,
    // lineHeight: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  RadioButton: {
    backgroundColor: "red",
    borderColor: "#fff",
  },
});
