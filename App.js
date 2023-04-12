import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import AppContainer from './AppContainer';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { SafeAreaView, StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <RootSiblingParent>
      <StatusBar style="light" backgroundColor="#243ffa" />
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </RootSiblingParent>
  );
}



