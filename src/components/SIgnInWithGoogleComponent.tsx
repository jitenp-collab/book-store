import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import GooglSvg from '../assets/svgComponents/SvgCOmponents';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { Appdispatch } from '../redux/store/Store';
import { useNavigation } from '@react-navigation/native';
import { RegisterUser, AddUser } from '../redux/actions/actiont';

const SIgnInWithGoogleComponent = () => {
  const dispatch = useDispatch<Appdispatch>();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(false);

  const signUpWithGoogle = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices();

      const userInfo: any = await GoogleSignin.signIn();

      const idToken = userInfo?.data?.idToken;
      const credential = auth.GoogleAuthProvider.credential(idToken);

     const AuthUser= await auth().signInWithCredential(credential);

      await dispatch(RegisterUser(userInfo?.data?.user?.email)).unwrap();
      // console.log(userInfo);
      // console.log("auth User",AuthUser);
      
      
      const UserData: any = {
        firstName: userInfo?.data?.user?.name,
        lastName: userInfo?.data?.user?.familyName,
        email: userInfo?.data?.user?.email,
        gender: 'not Decided',
        birthDate: 'Birthday',
        image: userInfo?.data?.user?.photo,
      };

      await dispatch(AddUser(UserData)).unwrap();

      navigation.replace('Catogery');
    } catch (error) {
      console.log('Error in the catch here', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={signUpWithGoogle}
      disabled={loading}
      style={styles.googleButton}
    >
      <GooglSvg />

      <Text style={styles.googleButtonText}>
        {loading ? 'Signing in...' : 'Continue with Google'}
      </Text>

      {loading && <ActivityIndicator size="small" style={{ marginLeft: 10 }} />}
    </TouchableOpacity>
  );
};

export default SIgnInWithGoogleComponent;

const styles = StyleSheet.create({
  googleButton: {
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
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 12,
    letterSpacing: 0.3,
  },
});
