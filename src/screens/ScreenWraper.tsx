// import React, { useEffect } from 'react';
// import Navigation from '../navigations/Navigation';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import { navigationref } from '../navigations/Navigationref';
// import { replace } from '../navigations/Navigationref';

// const ScreenWraper = () => {
//   const getroutname = () => {
//     return navigationref.getCurrentRoute()?.name;
//   };

//   const safeNavigation = () => {
//     const currentRout = getroutname();
//     console.log(currentRout);
//     if (currentRout !== 'Home') {
//       replace('bottomNav', {
//         screen: 'Home',
//       });
//       return;
//     }
//   };

//   useEffect(() => {
//     PushNotification.createChannel(
//       {
//         channelId: 'default-channel',
//         channelName: 'Default Channel',
//         playSound: true,
//         soundName: 'default',
//         importance: 5,
//         vibrate: true,
//       },
//       (created: any) => console.log('Channel created:', created),
//     );
//   }, []);

//   useEffect(() => {
//     PushNotification.configure({
//       onNotification: function (notification: any) {
//         console.log('Notification clicked:', notification);

//         if (notification.userInteraction) {
//           safeNavigation();
//         }
//       },

//       //   popInitialNotification: true,
//       //   requestPermissions: true,
//     });
//   }, []);

//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       console.log('Foreground message:', remoteMessage);

//       PushNotification.localNotification({
//         channelId: 'default-channel',
//         title: remoteMessage.notification?.title || 'Notification',
//         message: remoteMessage.notification?.body || 'You have a new message',

//         playSound: true,
//         soundName: 'default',

//         largeIconUrl:
//           remoteMessage.data?.image ||
//           remoteMessage.notification?.android?.imageUrl,

//         userInfo: {
//           screen: 'Home',
//         },
//       });
//     });

//     return unsubscribe;
//   }, []);

//   return <Navigation />;
// };

// export default ScreenWraper;
