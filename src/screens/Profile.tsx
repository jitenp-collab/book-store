import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import StatusBarBackground from '../components/StatusBarBackground';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProfileComponents from '../components/ProfileComponents';
import { primaryColor, seconDaryColor } from '../theme/Theme';

const Profile = () => {
  return (
    <>
      <StatusBarBackground color={seconDaryColor} />
      <SafeAreaProvider style={{backgroundColor:"#fff"}} >
        <SafeAreaView style={styles.container}>
          <ProfileComponents />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
