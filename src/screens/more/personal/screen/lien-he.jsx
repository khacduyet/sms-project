import * as React from 'react';
import {StyleSheet,Text,View, Pressable,} from "react-native";
import { TextInput } from "@react-native-material/core";

export default function LienHe() {
  return ( 
    <View>
      <View style={styles.items}>
        <Text style={styles.label}>Số điện thoại:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Email:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
      <View style={styles.items}>
        <Text style={styles.label}>Nơi ở hiện nay:</Text>
        <View>
          <TextInput style={styles.inputtext} placeholder="" />
        </View>
      </View>
     </View>
  );
}

const styles = StyleSheet.create({
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
})