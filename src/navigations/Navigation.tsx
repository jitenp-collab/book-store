import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Otp from '../screens/Otp';
import About from '../screens/About';
import catogeries from '../screens/Catogeries';
import SplashScreen from '../screens/SplashScreen';
import SignUp from '../screens/SignUp';
import Select from '../screens/Select';
import AddUser from '../screens/AddUser';
import BottomNavigation from './BottomNavigation';
import PlaySound from '../screens/PlaySound';
import Profile from '../screens/Profile';
import { navigationref } from './Navigationref';
import { replace } from './Navigationref';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Appdispatch, StoreState } from '../redux/store/Store';
import { activeUser } from '../redux/redusers/reducers';
import { loginUser, recieveMessage } from '../const/Const';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { socket } from '../redux/Services/messageApi';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch<Appdispatch>();

  const getroutname = () => {
    return navigationref.getCurrentRoute()?.name;
  };

  const safeNavigation = () => {
    const currentRout = getroutname();
    if (currentRout !== 'Home') {
      replace('bottomNav', {
        screen: 'Home',
      });
      return;
    }
  };

  // const messageNavigation = () => {
  //   const currentRout = getroutname();
  //   if (currentRout !== 'Library') {
  //     replace('bottomNav', {
  //       screen: 'Library',
  //       params: {},
  //     });
  //     // navigationref.navigate('Library');
  //     return;
  //   }
  // };

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel',
        channelName: 'Default Channel',
        playSound: true,
        soundName: 'default',
        importance: 5,
        vibrate: true,
      },
      (created: any) => console.log(),
    );
  }, []);

  useEffect(() => {
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('Notification clicked:', notification?.foreground);

        const screen = notification?.data?.screen;

        if (notification.userInteraction) {
          if (screen === 'Home') {
            safeNavigation();
          } else if (screen === 'Library') {
            const currentRout = getroutname();
            if (currentRout !== 'Library') {
              replace('bottomNav', {
                screen: 'Library',
                params: {
                  sender: notification?.data?.sender,
                  text: notification?.data?.text,
                },
              });
              // navigationref.navigate('Library');
              return;
            }
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message:', remoteMessage);

      PushNotification.localNotification({
        channelId: 'default-channel',
        title: remoteMessage.notification?.title || 'Notification',
        message: remoteMessage.notification?.body || 'You have a new message',
        playSound: true,
        soundName: 'default',
        largeIconUrl:
          remoteMessage.data?.image ||
          remoteMessage.notification?.android?.imageUrl,
        userInfo: {
          screen: 'Home',
        },
      });
    });
    return unsubscribe;
  }, []);

  const handleNotificationNavigation = async () => {
    const loginData = await AsyncStorage.getItem(loginUser);
    const login = loginData ? JSON.parse(loginData) : {};
    // console.log(login.activeUser);

    if (login.activeUser) {
      dispatch(activeUser(login.activeUser));
      // console.log(login.activeUser);
      setTimeout(() => {
        safeNavigation();
      }, 1000);
    }
  };

  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        handleNotificationNavigation();
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '493974639354-oa1f8365ightjaerqaumccas4b7ojh79.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    const handler = (data: any) => {
      const route = navigationref.getCurrentRoute()?.name;
      if (route === 'Library') return;
      PushNotification.localNotification({
        channelId: 'default-channel',
        title: data.sender,
        message: data.text,
        userInfo: {
          screen: 'Library',
          sender: data.sender,
          text: data.text,
        },
      });
    };
    socket.on(recieveMessage, handler);
    // console.log('Notification comes');

    return () => {
      socket.off(recieveMessage, handler);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationref}>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Catogery" component={catogeries} />
        <Stack.Screen name="Select" component={Select} />
        <Stack.Screen name="AddUser" component={AddUser} />
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="bottomNav" component={BottomNavigation} />
        <Stack.Screen name="PlaySound" component={PlaySound} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
