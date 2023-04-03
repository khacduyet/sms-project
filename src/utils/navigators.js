import { Image, StyleSheet } from "react-native"
import PersonalPage from '../screens/settings';
import AcademicPage from '../screens/accademics';
import AttendancePage from '../screens/attendances';
import SchedulePage from '../screens/schedules';
import { BlurView } from 'expo-blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from "../screens/home";
const Tab = createBottomTabNavigator();

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
                    return <Image source={require("../resources/icons/calendar.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
                }
            }}
        />
        <Tab.Screen name="Attendance" component={AttendancePage}
            options={{
                tabBarLabel: "Điểm danh",
                tabBarIcon: () => {
                    return <Image source={require("../resources/icons/personal-tick.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
                }
            }}
        />
        <Tab.Screen name="HomeIndex" component={HomePage} options={{
            // tabBarBadge: 3,
            tabBarLabel: "Home",
            tabBarIcon: () => {
                return <Image source={require("../resources/icons/home.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
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
                    return <Image source={require("../resources/icons/book.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
                }
            }}
        />
        <Tab.Screen name="Personal" component={PersonalPage}
            options={{
                tabBarLabel: "Cá nhân",
                tabBarIcon: () => {
                    return <Image source={require("../resources/icons/personal.png")} style={{ width: 30, height: 30 }} resizeMode="stretch" />
                }
            }}
        />
    </Tab.Navigator>
}