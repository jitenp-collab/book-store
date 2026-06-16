import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OTPComponent from '../components/OtpComponent';
import StatusBarBackground from '../components/StatusBarBackground';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const Otp = ({ route }: any) => {

  const number: any = route?.params?.number;
  const userData: any = route?.params?.userData;

  return (
    <>
      <StatusBarBackground />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <OTPComponent number={number} userInfo={userData} />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
