import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { primaryColor, seconDaryColor } from '../theme/Theme';
import { isLogin } from '../const/Const';
import { getTockenStore } from '../redux/redusers/reducers';
import { PermissionsAndroid } from 'react-native';

import { requestPermission } from '../util/checkPermissions';

import { loginUser } from '../const/Const';
import { activeUser } from '../redux/redusers/reducers';
import { navigationref } from '../navigations/Navigationref';
import { StoreState } from '../redux/store/Store';

const { width } = Dimensions.get('window');

const SplashAnimation = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();
  const { presentUser } = useSelector((state: StoreState) => state.globle);

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);
  const leftX = useSharedValue(-width);
  const rightX = useSharedValue(width);
  const translateY = useSharedValue(30);

  const animationDone = useRef(false);
  const permissionDone = useRef(false);
  const permissionResult = useRef<string | null>(null);
  const openedFromNotification = useRef(false);
  const hasStarted = useRef(false);

  const getroutname = () => {
    return navigationref.getCurrentRoute()?.name;
  };
  const safeNavigation = () => {
    const currentRout = getroutname();
    console.log();

    if (currentRout === 'Home') {
      console.log('Already on Home → skip navigation');
      return;
    }

    navigation.navigate('bottomNav', {
      screen: 'Home',
    });
  };

  const runSplashAnimation = () => {
    const duration = 800;

    opacity.value = withTiming(1, { duration });
    translateY.value = withTiming(0, { duration });

    leftX.value = withTiming(0, { duration });
    rightX.value = withTiming(0, { duration });

    scale.value = withSpring(1, {
      damping: 18,
      stiffness: 150,
    });

    setTimeout(() => {
      animationDone.current = true;
      tryNavigate();
    }, duration);
  };

  const handleNotificationNavigation = async () => {
    const loginData = await AsyncStorage.getItem(loginUser);

    const login = loginData ? JSON.parse(loginData) : {};

    if (login.activeUser) {
      dispatch(activeUser(login.activeUser));
      console.log(login.activeUser);
      openedFromNotification.current = true;

      setTimeout(() => {
        safeNavigation();
      }, 1000);
    }
  };

  const startPermissionFlow = async () => {
    const result = await requestPermission();
    permissionResult.current = result;
    permissionDone.current = true;

    tryNavigate();
  };

  const triggetNavigation = async () => {
    if (openedFromNotification.current) {
      return;
    }

    const callUser = await AsyncStorage.getItem(isLogin);
    const read = callUser ? JSON.parse(callUser) : null;

    if (read === true) {
      navigation.replace('Select');
    } else {
      navigation.replace('SignUp');
    }
  };

  const tryNavigate = async () => {
    if (!animationDone.current || !permissionDone.current) return;
    const result = permissionResult.current;
    if (result === PermissionsAndroid.RESULTS.GRANTED) {
      try {
        const token = await messaging().getToken();
        dispatch(getTockenStore(token));
        console.log(token);
      } catch (e) {}
      await triggetNavigation();
      return;
    }
    await triggetNavigation();
  };

  const containerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const bookStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const leftTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftX.value }],
  }));

  const rightTextStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightX.value }],
  }));

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    runSplashAnimation();
    startPermissionFlow();

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          handleNotificationNavigation();
        }
      });
  }, []);

  // from background
  useEffect(() => {
    const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        handleNotificationNavigation();
      }
    });

    return unsubscribe;
  }, []);

  return (
    <Animated.View style={styles.container}>
      <Animated.View style={containerStyle}>
        <View style={styles.row}>
          <Animated.Text style={[styles.sideText, leftTextStyle]}>
            Read
          </Animated.Text>

          <Animated.Text style={[styles.logo, bookStyle]}>📚</Animated.Text>

          <Animated.Text style={[styles.sideText, rightTextStyle]}>
            Grow
          </Animated.Text>
        </View>

        <Text style={styles.title}>BookStore</Text>
        <Text style={styles.tagline}>Learn Everyday</Text>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: seconDaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 60,
    marginHorizontal: 10,
  },
  sideText: {
    fontSize: 16,
    color: primaryColor,
    fontWeight: '600',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: primaryColor,
    textAlign: 'center',
    marginTop: 10,
  },
  tagline: {
    fontSize: 14,
    color: primaryColor,
    textAlign: 'center',
    marginTop: 6,
    opacity: 0.7,
  },
});
