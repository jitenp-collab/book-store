import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import StatusBarBackground from '../components/StatusBarBackground';
import SplashAnimation from '../components/SplashAnimation';

const SplashScreen = () => {
  return (
    <>
      <StatusBarBackground />
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <SplashAnimation />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
