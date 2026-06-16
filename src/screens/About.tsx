import { StyleSheet} from 'react-native';
import React from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import StatusBarBackground from '../components/StatusBarBackground';
import AboutComponent from '../components/AboutComponent';
import { seconDaryColor } from '../theme/Theme';

const About = () => {
  return (
    <>
      <StatusBarBackground color={seconDaryColor} />
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <AboutComponent />
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
