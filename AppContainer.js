import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';
import { useEffect, useState } from 'react';
import { TabNavigatior } from './src/utils/navigators';
import Notification from './src/utils/notifications';
import HomeSetting from './src/screens/home/setting';
import { AuthServices } from './src/services/auth.service';
import { Screens } from './src/common/constant';




const Stack = createNativeStackNavigator();

export default function AppContainer() {
  Notification()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Screens.Login} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={Screens.Login} component={LoginPage} />
        <Stack.Screen name={Screens.Setting} component={HomeSetting} />
        <Stack.Screen name={Screens.Home} component={TabNavigatior} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



