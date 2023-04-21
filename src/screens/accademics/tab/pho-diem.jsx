import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, } from "react-native";

//
import ItemPhoDiem from './screen/item-pho-diem'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';



export default function PhoDiem() {
  const data = [
    { quarter: 'Yếu', earnings: 23, color: '#C0C0C0' },
    { quarter: 'TB', earnings: 16, color: '#C0C0C0' },
    { quarter: 'Khá', earnings: 42, color: '#C0C0C0' },
    { quarter: 'Giỏi', earnings: 19, color: '#C0C0C0' },
    { quarter: 'Xuất sắc', earnings: 19, color: '#C0C0C0' },
  ];
  return (
    <View style={styles.container}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryBar
          style={{
            data: {
              fill: 'gold'
            },
          }}
          labels={({ datum }) => `${datum.earnings}`}
          data={data}
          x="quarter"
          y="earnings"
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});


