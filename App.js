import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomePage from './src/screens/home';
import { useEffect, useState } from 'react';

import { TabNavigatior } from './src/utils/navigators';
import Notification from './src/utils/notifications';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import HomeSetting from './src/screens/home/setting';


const Stack = createNativeStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  Notification()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Setting" component={HomeSetting} />
          <Stack.Screen name="Home" component={TabNavigatior} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

