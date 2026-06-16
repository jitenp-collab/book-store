import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatusBarBackground from '../components/StatusBarBackground';
import { seconDaryColor } from '../theme/Theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CatogeryComponent from '../components/CatogeryComponent';

const Catogeries = () => {
  return (
    <>
      <StatusBarBackground color={seconDaryColor} />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <CatogeryComponent />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default Catogeries;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
