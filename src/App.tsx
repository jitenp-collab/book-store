import React, { } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigations/Navigation';
import { Provider } from 'react-redux';
import { store } from './redux/store/Store';
import { StyleSheet } from 'react-native';


const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 110,
  },
  MusicCompo: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});
