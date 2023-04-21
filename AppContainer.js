import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/screens/auth/login';
import { TabNavigatior } from './src/utils/navigators';
import Notification from './src/utils/notifications';
import HomeMore from './src/screens/more/index';
import { Screens } from './src/common/constant';
import Setting from './src/screens/more/setting';
import { useSelector } from 'react-redux';
import Loading from './src/screens/loading';
import ChangePassword from './src/screens/more/settings/changepass';
import ForgotPassword from './src/screens/auth/forgot';
import { NotificationPage } from './src/screens/home/navbar';
import TestSchedule from './src/screens/schedules/testSchedule';

const Stack = createNativeStackNavigator();

export default function AppContainer() {
  Notification()
  const loading = useSelector((state) => state.loading);
  return (
    <NavigationContainer>
      <StackNavigator />
      {loading.loading && <Loading />}
    </NavigationContainer>
  );
}

function StackNavigator() {
  return <Stack.Navigator initialRouteName={Screens.Login} screenOptions={{ headerShown: false }}>
    <Stack.Screen name={Screens.Login} component={LoginPage} />
    <Stack.Screen name={Screens.More} component={HomeMore} />
    <Stack.Screen name={Screens.Notification} component={NotificationPage} />
    <Stack.Screen name={Screens.Setting} component={Setting} />
    <Stack.Screen name={Screens.TestSchedule} component={TestSchedule} />
    <Stack.Screen name={Screens.ChangePassword} component={ChangePassword} />
    <Stack.Screen name={Screens.ForgotPassword} component={ForgotPassword} />
    <Stack.Screen name={Screens.Home} component={TabNavigatior} />
  </Stack.Navigator>
}



