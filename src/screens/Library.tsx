import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import WebSocketDemo from '../components/WebSocketDemo';

const Library = ({ route }: any) => {
  useEffect(() => {
    console.log(route?.params);
  }, []);

  return (
    <View style={styles.container}>
      <WebSocketDemo notificationData={route?.params} />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
