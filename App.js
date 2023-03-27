import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';

const Stack = createNativeStackNavigator();



function HomeScreen() {
  return <View style={{ width: "100%", height: "100%" }}>
    <StatusBar backgroundColor="#61dafb" />
    <View style={{ flexDirection: "row" }}>

      <View style={{ flex: 1, backgroundColor: "red", height: 200 }}></View>
      <View style={{ flex: 1, backgroundColor: "green", height: 200 }}></View>
      <View style={{ flex: 1, backgroundColor: "blue", height: 200 }}></View>
    </View>
  </View>
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

