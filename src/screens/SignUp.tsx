import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StatusBarBackground from '../components/StatusBarBackground';
import Register from '../components/Register';

const SignUp = () => {
  return (
    <>
      <StatusBarBackground />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Register />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 20,
  },
});
