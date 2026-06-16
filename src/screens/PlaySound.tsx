import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatusBarBackground from '../components/StatusBarBackground';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import PlaySoundComponent from '../components/PlaySoundComponent';

const PlaySound = () => {
  return (
    <>
      <StatusBarBackground />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <PlaySoundComponent />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default PlaySound;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
