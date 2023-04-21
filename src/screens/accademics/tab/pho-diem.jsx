import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable,TouchableOpacity } from "react-native";

//
import ItemPhoDiem from './screen/item-pho-diem'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import DropDown from '../share-componet/DropDown/DropDown'
import { useState } from 'react';
import { useEffect } from 'react';

const listNam = [
  { label: '2022-2023', value: '1' },
  { label: '2023-2024', value: '2' },
];
const listKy = [
  { label: 'Kỳ I', value: 'I' },
  { label: 'Kỳ II', value: 'II' },
];

export default function PhoDiem() {
  const data = [
    { quarter: 'Yếu', earnings: 23, color: '#C0C0C0' },
    { quarter: 'TB', earnings: 16, color: '#C0C0C0' },
    { quarter: 'Khá', earnings: 42, color: '#C0C0C0' },
    { quarter: 'Giỏi', earnings: 19, color: '#C0C0C0' },
    { quarter: 'Xuất sắc', earnings: 19, color: '#C0C0C0' },
  ];
  const [object, setObject] = useState({
    Nam: null,
    Ky: listKy[0].value
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.dropdown}>
          <View style={styles.flex}>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.left}>
                <DropDown data={listNam} object={object} setObject={setObject} header={'Nam'} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.justify_content_between}>
              <View style={styles.right}>
                <DropDown data={listKy} object={object} setObject={setObject} header={'Ky'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryBar
            style={{
              data: {
                fill: ({ datum }) => datum.earnings > 30 ? "gold" : "#0000FF",
              },
            }}
            labels={({ datum }) => `${datum.earnings}`}
            data={data}
            x="quarter"
            y="earnings"
          />
        </VictoryChart>
        <View>
          <Text style={styles.title_diem}>  Điểm trung bình tích lũy</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: "#f5fcff"
  // },
  container: {
    margin: 16,
  },
  header: {
  },
  flex: {
    flexDirection: 'row',
  },
  justify_content_between: {
    flex: 1,
  },
  dropdown: {
    marginBottom: 16
  },
  left: {
    marginRight: 8
  },
  right: {
    marginLeft: 8
  },
  content: {
    marginTop: 16,
    marginBottom: 16
  },
  marginBottom_16: {
    marginBottom: 16
  },
  title_diem: {
    textAlign: 'center',
    fontWeight: 'bold'
  }
});


