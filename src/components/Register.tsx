import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import RegisterHeader from './RegisterHeader';
import CustomeInput from '../ReusableCOmponent/CustomeInput';
import { primaryColor, seconDaryColor, seconderyText } from '../theme/Theme';
import { useDispatch, useSelector } from 'react-redux';
import { Appdispatch, StoreState } from '../redux/store/Store';
import { useNavigation } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import SIgnInWithGoogleComponent from './SIgnInWithGoogleComponent';

const Register = () => {
  const navigation = useNavigation<any>();
  const [mobileNUmber, setmobileNUmber] = useState('');
  const [typeerror, settypeError] = useState(false);
  const [message, setMessage] = useState('');
  const [isCheckone, setisCheckone] = useState(false);
  const [isChecktwo, setisChecktwo] = useState(false);
  const { error } = useSelector(
    (state: StoreState) => state.globle,
  );

  const dispatch = useDispatch<Appdispatch>();

  const checkAllowNotification = async () => {
    console.log('Login pressed');

    const value = mobileNUmber;

    if (!value) return setMessage('Mobile number required');
    if (!/^[0-9]+$/.test(value)) return setMessage('Only numbers allowed');
    if (!isCheckone || !isChecktwo) return setMessage('Accept conditions');

    try {
      if (Platform.OS === 'android' && Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );

        console.log('Permission result:', granted);
      }

      // try token but DO NOT block navigation
      let token = null;
      try {
        token = await messaging().getToken();
        console.log('FCM token:', token);
      } catch (e) {
        console.log('Token error:', e);
      }

      navigation.replace('Otp', { number: value });
    } catch (err) {
      console.log('Main error:', err);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={[styles.overlay]}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View>
            <RegisterHeader
              label="Welcome to Book store"
              description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
        dolorem? Recusandae assumenda molestiae maiores? Velit aut doloribus
        asperiores,"
            />
            <View style={styles.textColorbox}>
              <Text style={styles.enterNUmber}> Enter phone number </Text>
              <Text style={styles.require}>*</Text>
            </View>

            <CustomeInput
              value={mobileNUmber}
              placeHolder="Enter phone number here"
              onChangeText={setmobileNUmber}
              error={typeerror}
              keyboardNUm={true}
            />

            <View style={styles.conditionBox}>
              <Text style={styles.conditionText}>
                By continuing, you agree to our Terms and Conditions.
              </Text>
              <TouchableOpacity onPress={() => setisCheckone(true)}>
                <View
                  style={[
                    styles.acceptcondition,
                    { backgroundColor: isCheckone ? seconDaryColor : '#fff' },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.conditionBox}>
              <Text style={styles.conditionText}>
                Read terms before continuing.
              </Text>
              <TouchableOpacity onPress={() => setisChecktwo(true)}>
                <View
                  style={[
                    styles.acceptcondition,
                    { backgroundColor: isChecktwo ? seconDaryColor : '#fff' },
                  ]}
                />
              </TouchableOpacity>
            </View>

            {message && <Text style={styles.message}>{message}</Text>}
            {error && <Text style={styles.message}>{error}</Text>}

            <TouchableOpacity
              style={styles.loginButon}
              onPress={() => checkAllowNotification()}
            >
              <Text style={styles.login}>Login</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.or}>or</Text>
          <SIgnInWithGoogleComponent />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default Register;

const styles = StyleSheet.create({
  textColorbox: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  googleButton: {
    // height: 58,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 5,
    paddingVertical: 10,
  },
  or: {
    textAlign: 'center',
    color: primaryColor,
    fontSize: 16,
    marginVertical: 5,
    fontWeight: '800',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 12,
    letterSpacing: 0.3,
  },
  require: {
    color: 'red',
    paddingStart: 3,
    marginTop: 6,
  },
  loginButon: {
    width: '100%',
    backgroundColor: primaryColor,
    marginHorizontal: 'auto',
    borderRadius: 5,
    marginTop: 20,
  },
  login: {
    color: seconderyText,
    fontWeight: '600',
    marginHorizontal: 'auto',
    // paddingHorizontal: 158.5,
    paddingVertical: 10,
  },

  conditionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'flex-start',
  },
  enterNUmber: {
    fontWeight: '400',
    fontSize: 15,
  },
  acceptcondition: {
    height: 18,
    width: 18,
    borderWidth: 1,
    marginStart: 5,
    borderRadius: 3,
  },

  conditionText: {
    flex: 1,
    fontSize: 12,
    color: '#000000',

    fontWeight: '800',
    textAlign: 'right',
  },
  message: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '700',
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(247, 238, 238, 0.8)',
    paddingHorizontal: 20,
  },
});
