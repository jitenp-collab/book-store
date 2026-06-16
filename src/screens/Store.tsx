import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CalculatorComponent from '../components/Calculator';

const Store = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <CalculatorComponent />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Store;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
