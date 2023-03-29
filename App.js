import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomePage from './src/screens/home';
import { createContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PersonalPage from './src/screens/settings';
import AcademicPage from './src/screens/accademics';
import AttendancePage from './src/screens/attendances';
import SchedulePage from './src/screens/schedules';
import { BlurView } from 'expo-blur';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const ContextApp = createContext();

export function TabNavigatior() {
  return <Tab.Navigator initialRouteName="HomeIndex" screenOptions={{
    headerShown: false,
    tabBarBackground: () => (
      <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
    ),
    tabBarActiveTintColor: '#e91e63',
    tabBarActiveBackgroundColor: '#C7D3E6'
  }} >
    <Tab.Screen name="Schedula" component={SchedulePage}
      options={{
        tabBarLabel: "Thời khóa biểu",
        tabBarIcon: () => {
          return <Image source={require("./src/resources/icons/calendar.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
        }
      }}
    />
    <Tab.Screen name="Attendance" component={AttendancePage}
      options={{
        tabBarLabel: "Điểm danh",
        tabBarIcon: () => {
          return <Image source={require("./src/resources/icons/personal-tick.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
        }
      }}
    />
    <Tab.Screen name="HomeIndex" component={HomePage} options={{
      // tabBarBadge: 3,
      tabBarLabel: "Home",
      tabBarIcon: () => {
        return <Image source={require("./src/resources/icons/home.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
      },

      tabBarIconStyle: {
        width: 50,
        height: 50
      }
    }} />
    <Tab.Screen name="Academic" component={AcademicPage}
      options={{
        tabBarLabel: "KQHT",
        tabBarIcon: () => {
          return <Image source={require("./src/resources/icons/book.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
        }
      }}
    />
    <Tab.Screen name="Personal" component={PersonalPage}
      options={{
        tabBarLabel: "Cá nhân",
        tabBarIcon: () => {
          return <Image source={require("./src/resources/icons/personal.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
        }
      }}
    />
  </Tab.Navigator>
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={TabNavigatior} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

