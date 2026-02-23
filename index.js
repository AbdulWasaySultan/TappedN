/**
 * @format
 */

import { AppRegistry, NativeModules, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import messaging from '@react-native-firebase/messaging'
import 'react-native-reanimated';


if (Platform.OS === 'ios') {
    console.log('DEBUG NativeModules keys:', Object.keys(NativeModules));
}

const Redux = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => Redux);
