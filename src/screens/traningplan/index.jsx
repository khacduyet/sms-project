import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBack from "../../common/header";
import { Screens } from "../../common/constant";
import { Checkbox, DataTable } from "react-native-paper";
import { faker } from "@faker-js/faker";
import { ModalMonHoc } from "../../common/modal";
import { useState } from "react";

const sizeWidthColumn = {
  TT: 0.7,
  Ma: 1.5,
  Ten: 4,
  HK: 1,
  TC: 1,
  TG: 1.4,
  HT: 1.1,
};

export default function TrainingPlanPage() {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState(``);
  const [item, setItem] = useState(null);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <HeaderBack header={Screens.TrainingPlan} />
        <View style={[styles.wrapper]}>
          <View style={[s.header]}>
            <Text style={[s.text]}>Kế hoạch đào tạo: 22/25CĐ-Han 67</Text>
          </View>
        </View>
        <View>
          <DataTable>
            <DataTable.Header style={[tbl.header]}>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.TT }]}
              >
                TT
              </DataTable.Title>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.Ma }]}
                numberOfLines={2}
              >
                Mã học phần
              </DataTable.Title>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.Ten }]}
                numberOfLines={2}
              >
                Tên học phần
              </DataTable.Title>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.HK }]}
                numberOfLines={2}
              >
                Học kỳ
              </DataTable.Title>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.TC }]}
                numberOfLines={2}
              >
                Tín chỉ
              </DataTable.Title>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.TG }]}
                numberOfLines={3}
              >
                Thời gian (giờ)
              </DataTable.Title>
              <DataTable.Title
                style={[tbl.title, { flex: sizeWidthColumn.HT }]}
                numberOfLines={2}
              >
                Hoàn thành
              </DataTable.Title>
            </DataTable.Header>
            <FlatList
              data={[...Array(20)]}
              renderItem={(item) => (
                <DataTable.Row
                  style={[tbl.row]}
                  onPress={(e) => {
                    setTitle(`MH01 - Pháp luật`);
                    setItem(item);
                    setVisible(true);
                  }}
                >
                  <DataTable.Cell
                    style={[
                      tbl.cell,
                      { justifyContent: "center", flex: sizeWidthColumn.TT },
                    ]}
                  >
                    {item.index + 1}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      tbl.cell,
                      { justifyContent: "center", flex: sizeWidthColumn.Ma },
                    ]}
                  >
                    {faker.random.locale()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[tbl.cell, { flex: sizeWidthColumn.Ten }]}
                  >
                    {faker.name.firstName()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      tbl.cell,
                      { justifyContent: "center", flex: sizeWidthColumn.HK },
                    ]}
                  >
                    {faker.helpers.arrayElement(["I", "II", "V", "IV", "III"])}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[tbl.cell, { flex: sizeWidthColumn.TC }]}
                    numeric
                  >
                    {faker.datatype.number()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[tbl.cell, { flex: sizeWidthColumn.TG }]}
                    numeric
                  >
                    {faker.datatype.number()}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={[
                      tbl.cell,
                      { justifyContent: "center", flex: sizeWidthColumn.HT },
                    ]}
                    numeric
                  >
                    <Checkbox.Android value={true} status={"checked"} />
                  </DataTable.Cell>
                </DataTable.Row>
              )}
              ListFooterComponent={<View style={{ height: 200 }}></View>}
            />
          </DataTable>
        </View>
      </KeyboardAvoidingView>
      <ModalMonHoc
        isVisible={visible}
        onClose={onClose}
        children={<ItemModal item={item} />}
        title={title}
      />
    </SafeAreaView>
  );
}

const ItemModal = ({ item }) => {
  return (
    <View style={[i.container]}>
      <View style={[i.wrap]}>
        <Text>Tổng thời gian của môn học </Text>
        <Text>Trong đó </Text>
        <Text>Điểm tổng kết môn </Text>
      </View>
      <View style={[i.wrap, { flex: 4 }]}>
        <Text>: 100 giờ </Text>

        <Text>: LT: 50; TH: 48; KT: 2 </Text>
        <Text>: 7.5 </Text>
      </View>
    </View>
  );
};

const i = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
  },
  wrap: {
    flex: 5,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
  },
});

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    margin: 16,
  },
});

const tbl = StyleSheet.create({
  header: {},
  title: {
    borderWidth: 0.2,
    backgroundColor: "#cfe2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {},
  cell: {
    borderWidth: 0.2,
  },
});

const s = StyleSheet.create({
  header: {
    width: "100%",
  },
  text: {
    fontSize: 16,
  },
});
