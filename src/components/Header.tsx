import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { BackgroundColor, primaryColor } from '../theme/Theme';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Appdispatch, StoreState } from '../redux/store/Store';
import { saveImage } from '../redux/redusers/reducers';
import { logoutUser } from '../redux/actions/actiont';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { getImageSource } from '../util/ReadIMage';

const Header = () => {
  const navigation = useNavigation<any>();
  const { presentUser, image }: any = useSelector(
    (state: StoreState) => state.globle,
  );
  const dispatch = useDispatch<Appdispatch>();


  useEffect(() => {
    if (presentUser?.profile?.image && !image) {
      dispatch(saveImage(presentUser.profile.image));
    }
  }, [presentUser]);

  // useEffect(() => {
  //   console.log(presentUser);
  // }, [presentUser]);

  const landlelogoutUser = async () => {
    await dispatch(logoutUser()).unwrap();
    await messaging().deleteToken();
    await GoogleSignin.signOut();
    await auth().signOut();
    navigation.reset({ index: 0, routes: [{ name: 'SignUp' }] });
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          landlelogoutUser();
        }}
        style={styles.Box1}
      >
        <Icon name="notifications-outline" color={primaryColor} size={28} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.Box1}>
        <Text style={styles.cansel}>Cansel Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.searchBox}>
        <Icon name="search-outline" color={primaryColor} size={28} />
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.Box2}
      >
        {image ? (
          <Image source={getImageSource(image)} style={styles.imageBox} />
        ) : (
          <Icon name="person-circle" color={primaryColor} size={35} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 15,
  },
  Box1: {
    height: 40,
    width: 40,
    backgroundColor: BackgroundColor,
    elevation: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cansel: {
    fontSize: 10,
    textAlign: 'center',
    color: primaryColor,
  },

  searchBox: {
    backgroundColor: BackgroundColor,
    elevation: 10,
    width: 215,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 3,
    height: 40,
    borderRadius: 50,
    paddingHorizontal: 5,
  },

  searchText: {
    color: primaryColor,
    marginEnd: 5,
  },
  Box2: {
    // height: 40,
    // width: 40,
    backgroundColor: BackgroundColor,
    elevation: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBox: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
});
