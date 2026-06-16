// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { loginUser } from "./Const";
// import { useDispatch } from "react-redux";
// import { Appdispatch } from "../redux/store/Store";
// import { activeUser } from "../redux/redusers/reducers";
// import { navigationref, replace } from "../navigations/Navigationref";
// import PushNotification from 'react-native-push-notification';
// import messaging from '@react-native-firebase/messaging';
// import { GoogleSignin } from "@react-native-google-signin/google-signin";


// const dispatch = useDispatch<Appdispatch>()

// //------------------- create Notification -------------------

// export const createNotificationChannel = () => {
//     PushNotification.createChannel(
//         {
//             channelId: 'default-channel',
//             channelName: 'Default Channel',
//             playSound: true,
//             soundName: 'default',
//             importance: 5,
//             vibrate: true,
//         },
//         (created: any) => console.log("created"),
//     );
// }
// //--------------- handle Notification and select auto user---------------

// export const handleNotificationNavigation = async () => {
//     const loginData = await AsyncStorage.getItem(loginUser);
//     const login = loginData ? JSON.parse(loginData) : {};
//     console.log(login.activeUser);

//     if (login.activeUser) {
//         dispatch(activeUser(login.activeUser));
//         console.log(login.activeUser);
//         setTimeout(() => {
//             safeNavigation();
//         }, 1000);
//     }
// };

// //------------------ GetRoutename-----------------------

// const getroutname = () => {
//     return navigationref.getCurrentRoute()?.name;
// };



// const safeNavigation = () => {
//     const currentRout = getroutname();
//     console.log('current route', currentRout);
//     if (currentRout !== 'Home') {
//         replace('bottomNav', {
//             screen: 'Home',
//         });
//         return;
//     }
// };

// export const userInteractionNotification = () => {
//     PushNotification.configure({
//         onNotification: function (notification: any) {
//             console.log('Notification clicked:', notification);
//             if (notification.userInteraction) {
//                 safeNavigation();
//             }
//         },
//     });
// }

// //---------- forground message settings ----------------------

// export const forGroundNotification = () => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//         console.log('Foreground message:', remoteMessage);

//         PushNotification.localNotification({
//             channelId: 'default-channel',
//             title: remoteMessage.notification?.title || 'Notification',
//             message: remoteMessage.notification?.body || 'You have a new message',
//             playSound: true,
//             soundName: 'default',
//             largeIconUrl:
//                 remoteMessage.data?.image ||
//                 remoteMessage.notification?.android?.imageUrl,
//             userInfo: {
//                 screen: 'Home',
//             },
//         });
//     });

//     return unsubscribe;
// }

// //----------------- googleSignIn configue --------------------

// export const googleSignInConfigure = () => {
//     GoogleSignin.configure({
//         webClientId:
//             '493974639354-oa1f8365ightjaerqaumccas4b7ojh79.apps.googleusercontent.com',
//     });
// }

// export const backgroundStateNotificationAppOpen = () => {
//     const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
//         if (remoteMessage) {
//             handleNotificationNavigation();
//         }
//     });
//     return unsubscribe;
// }