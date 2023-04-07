import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppContainer from './AppContainer';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { StatusBar } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" backgroundColor="#243ffa" />
      <AppContainer />
    </Provider>
  );
}



