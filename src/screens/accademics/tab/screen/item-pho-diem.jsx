import * as React from 'react';
import { Dimensions } from 'react-native';
import { StyleSheet, Text, View, TextInput, Pressable, } from "react-native";
import { BarChart } from "react-native-chart-kit";

export default function ItemPhoDiem() {
  const data = {
    labels: ["Yếu", "TB", "Khá", "Giỏi", "Xuất săc"],
    datasets: [
      {
        data: [0, 45, 28, 80, 43],
        colors: [
          (opacity = 1) => `rgb(141, 153, 153), ${opacity})`,
          (opacity = 1) => `rgb(141, 153, 153), ${opacity})`,
          (opacity = 1) => `rgb(141, 153, 153), ${opacity})`,
          (opacity = 1) => `rgb(141, 153, 153), ${opacity})`,
          (opacity = 1) => `rgb(255,2,0), ${opacity})`,
        ],
        legend: ["Rainy Days"]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#fff",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 0.5,
    decimalPlaces: 0, 
    useShadowColorFromDataset: false,

    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'red',
      strokeDasharray: '0',
    },
  };
  const screenWidth = Dimensions.get("window").width - 20;

  return (
    <View style={{ padding: 10 }}>
      <Text>Phổ Điểm</Text>
      <View>
        <BarChart
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          chartConfig={chartConfig}
          verticalLabelRotation={0}
          withInnerLines={false}
          showBarTops={false}
          showValuesOnTopOfBars={true}
          flatColor={true}
          withCustomBarColorFromData={true}

          fromZero={true}
          withVerticalLabels={true}
        />
      </View>
    </View>
  );
}