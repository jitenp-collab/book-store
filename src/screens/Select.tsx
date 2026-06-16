import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SelectComponent from '../components/SelectComponent';
import StatusBarBackground from '../components/StatusBarBackground';

const Select = () => {
  return (
    <>
      <StatusBarBackground />
      <SafeAreaProvider>
        <SafeAreaView>
          <SelectComponent />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default Select;

const styles = StyleSheet.create({});
