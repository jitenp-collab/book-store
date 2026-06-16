import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import RegisterHeader from './RegisterHeader';
import {
  BackgroundColor,
  optionalBgcolor,
  primaryColor,
} from '../theme/Theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { Appdispatch } from '../redux/store/Store';
import { RegisterUser } from '../redux/actions/actiont';

const OTP_LENGTH = 6;

const OTPComponent = ({ number, userInfo }: any) => {
  const navigation = useNavigation<any>();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [time, setTime] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRefs = useRef<(TextInput | null)[]>([]);
  const dispatch = useDispatch<Appdispatch>();

  useEffect(() => {
    let interval: any;

    if (isResendDisabled) {
      interval = setInterval(() => {
        setTime(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isResendDisabled]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePresKey = (e: any, index: number) => {
    if (index > 0 && e.nativeEvent.key === 'Backspace' && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOtp = () => {
    setOtp(Array(OTP_LENGTH).fill(''));
    setTime(60);
    setIsResendDisabled(true);
    inputRefs.current[0]?.focus();
  };

  const verifyOtp = async () => {
    const finalOtp = otp.join('');
    if (finalOtp.length < OTP_LENGTH || otp.includes('')) {
      setErrorMessage('Please enter complete OTP');
      return;
    }

    setErrorMessage('');
    const result = await dispatch(RegisterUser(number)).unwrap();

    // ------------- user comes from google signin ---------

    // if (userInfo) {
    //   const UserData = {
    //     firstName: userInfo.name,
    //     lastName: userInfo.familyName,
    //     email: number,
    //     gender: 'not Decided',
    //     birthDate: 'Birthday',
    //     image: userInfo.photo,
    //   };

    //   await dispatch(AddUser(UserData)).unwrap();
    //   navigation.replace('Select');
    // } else
      
      // {
      if (result[number].length === 0) {
        navigation.replace('About');
      } else {
        navigation.replace('Select');
      // }
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
          <RegisterHeader
            label="Confirm phone number"
            description=" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi,
        dolorem? "
          />
          <Text style={styles.number}>{number}</Text>
          <Text style={styles.code}>Enter your code</Text>
          <View style={styles.row}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  inputRefs.current[index] = ref;
                }}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.box}
                onKeyPress={e => handlePresKey(e, index)}
              />
            ))}
          </View>
          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity onPress={verifyOtp} style={styles.btn}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
          <Text style={styles.getthecode}>Did you get the code ?</Text>
          <TouchableOpacity style={styles.reset} onPress={resendOtp}>
            <Text style={styles.sendagain}>Send again</Text>
          </TouchableOpacity>
          <View style={styles.timerBox}>
            <Text style={styles.timer}>{time}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] })
            }
          >
            <Text style={styles.changenumber}>Change phone number</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.problem}>
              Did you face any problem? contact us
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default OTPComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    width: '14%',
    height: 60,
    marginHorizontal: 0,
    borderRadius: 5,
    backgroundColor: optionalBgcolor,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    elevation: 2,
  },
  timer: {
    textAlign: 'center',
    marginVertical: 'auto',
  },
  timerBox: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: 'white',
    position: 'relative',
    left: 316,
    bottom: 37,
  },
  btn: {
    backgroundColor: primaryColor,
    width: '100%',
    marginHorizontal: 'auto',
    borderRadius: 5,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontWeight: '700',
    marginHorizontal: 'auto',
    paddingVertical: 11,
  },
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(247, 238, 238, 0.8)',
    paddingHorizontal: 20,
  },
  number: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 30,
  },
  code: {
    textAlign: 'right',
    fontWeight: '400',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  getthecode: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 8,
    fontWeight: '600',
  },
  reset: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dededf',
    borderWidth: 1.5,
    borderColor: '#b1b1b4',
    borderRadius: 5,
    paddingVertical: 8,
  },
  sendagain: {
    fontWeight: '900',
    fontSize: 18,
  },
  changenumber: {
    color: primaryColor,
    backgroundColor: BackgroundColor,
    borderWidth: 1.5,
    borderColor: primaryColor,
    fontWeight: '900',
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 6,
    borderRadius: 5,
  },
  problem: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600',
    marginTop: 90,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
});
