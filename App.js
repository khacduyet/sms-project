import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import HomePage from './src/screens/home';
import { createContext, useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export const ContextApplication = createContext()


export default function App() {
  const [loading, setLoading] = useState(true)

  const _context = {
    loading: loading,
    setLoading: setLoading
  }

  return (
    <ContextApplication.Provider value={_context}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Home" component={HomePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </ContextApplication.Provider>
  );
}

