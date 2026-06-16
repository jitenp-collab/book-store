import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddUserComponent from '../components/AddUserComponent';
import StatusBarBackground from '../components/StatusBarBackground';
import { seconDaryColor } from '../theme/Theme';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AddUser = () => {
  return (
    <>
      <StatusBarBackground color={seconDaryColor} />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AddUserComponent />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
