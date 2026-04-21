// /**
//  * @format
//  */

import { AppRegistry, LogBox } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';
import messaging from '@react-native-firebase/messaging'
import 'react-native-reanimated';

console.log('[index.js] Starting app initialization...');

const Redux = () => {
    console.log('[Redux Provider] Rendering');
    return (
        <Provider store={store}>
            <App/>
            
        </Provider>
    )
}

//this could be disasterous to comment, check before uncommenting may result in unresponsive errors
// Register background handler (runs silently)
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('[Firebase] Background message received');
// });

console.log('[index.js] Registering component:', appName);
AppRegistry.registerComponent(appName, () => Redux);


// import { View, Text } from 'react-native';
// AppRegistry.registerComponent(appName, () => () => (
//   <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     <Text>TappedN is Loading...</Text>
//   </View>
// ));

