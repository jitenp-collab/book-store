import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MarkingComponent from '../components/MarkingComponent';

const Marking = () => {
  return (
    // <SafeAreaProvider>
      // <SafeAreaView style={styles.container}>
        <MarkingComponent />
      // </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default Marking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
