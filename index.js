/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remotMessage => {
    console.log("message", remotMessage);
    if (remotMessage?.data?.type === "SYNC" && remotMessage?.data?.action === "UPDATE_CACHE") {
        console.log("Silent notification");
    }
})

AppRegistry.registerComponent(appName, () => App);