import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { seconDaryColor } from '../theme/Theme';
import CustomeInput from '../ReusableCOmponent/CustomeInput';
import { primaryColor, seconderyText } from '../theme/Theme';
import GenderBox from '../ReusableCOmponent/GenderBox';
import Datepick from './Date';
import { useDispatch } from 'react-redux';
import { Appdispatch } from '../redux/store/Store';
import { AddUser } from '../redux/actions/actiont';
import { useNavigation } from '@react-navigation/native';

const AboutComponent = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Appdispatch>();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [selectedGender, setSlelctedGender] = useState([
    'male',
    'female',
    'other',
  ]);
  const [error, seterror] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isOPen, setisOpen] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const lastnameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);

  const OpenModal = () => {
    setmodalVisible(true);
  };

  const close = () => {
    setmodalVisible(false);
  };

  //--------- adding user in AsynckStrage ---------------

  const AddUsers = () => {
    if (!firstName) {
      Alert.alert('FirstName', 'First Name is missing');
      return;
    }
    if (!lastName) {
      Alert.alert('LasName', 'Last Name is missing');
      return;
    }
    if (!email) {
      Alert.alert('Email', 'Email is missing');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Email', 'Email is not Valid');
      return;
    }
    if (!gender) {
      Alert.alert('gender', 'gender is missing');
      return;
    }
    if (!birthDate) {
      Alert.alert('birthDate', 'birthDate is missing');
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      gender,
      birthDate: birthDate?.toLocaleDateString(),
    };

    setBirthDate(null);
    setlastName('');
    setfirstName('');
    setGender('');
    setEmail('');

    dispatch(AddUser(newUser));

    navigation.replace('Catogery');
  };

  return (
    <>
      <Text style={styles.heading}>About you</Text>
      <View style={styles.container}>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quis,
          modi, animi quas iure facere
        </Text>
        <View style={styles.inputlabel}>
          <Text>First name</Text>
          <Text style={styles.cross}>*</Text>
        </View>
        <CustomeInput
          returnType="next"
          value={firstName}
          onChangeText={setfirstName}
          error={error}
          onsubmitingedit={() => lastnameRef.current?.focus()}
        />
        <View style={styles.inputlabel}>
          <Text>Last name</Text>
          <Text style={styles.cross}>*</Text>
        </View>
        <CustomeInput
          inputref={lastnameRef}
          returnType="next"
          value={lastName}
          onChangeText={setlastName}
          error={error}
          onsubmitingedit={() => emailRef.current?.focus()}
        />
        <View style={styles.inputlabel}>
          <Text>Email adress</Text>
          <Text style={styles.cross}>*</Text>
        </View>
        <CustomeInput
          returnType="done"
          inputref={emailRef}
          value={email}
          onChangeText={setEmail}
          error={error}
        />
        <TouchableOpacity onPress={() => OpenModal()}>
          <View
            style={[
              styles.inputlabel,
              { borderBottomColor: error ? 'red' : seconDaryColor },
            ]}
          >
            <Text>Gender</Text>
            <Text style={styles.cross}>*</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.textStyle}>
              {gender ? gender : 'select grnder'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setisOpen(true)}>
          <View
            style={[
              styles.inputlabel,
              { borderBottomColor: error ? 'red' : seconDaryColor },
            ]}
          >
            <Text>Birth date</Text>
            <Text style={styles.cross}>*</Text>
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.textStyle}>
              {birthDate ? birthDate.toLocaleDateString() : 'Select the Date'}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => AddUsers()} style={styles.continue}>
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>

        <GenderBox
          isvisible={modalVisible}
          close={close}
          data={selectedGender}
          setGender={setGender}
        />

        <Datepick
          isOPen={isOPen}
          setisOpen={setisOpen}
          date={birthDate || new Date()}
          setDate={setBirthDate}
        />
      </View>
    </>
  );
};

export default AboutComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  heading: {
    backgroundColor: seconDaryColor,
    textAlign: 'center',
    paddingVertical: 15,
    fontWeight: '800',
    fontSize: 16,
  },
  desc: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  inputlabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cross: {
    marginStart: 10,
    marginTop: 5,
    color: 'red',
  },
  continue: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
    fontWeight: '600',
    paddingVertical: 11,
    borderRadius: 5,
    marginTop: 20,
  },
  continueText: {
    color: seconderyText,
    fontWeight: '700',
    fontSize: 15,
  },
  inputBox: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 0,
    marginVertical: 10,
    elevation: 3,
    // borderBottomWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
  },

  textStyle: {
    textAlign: 'right',
  },
});
