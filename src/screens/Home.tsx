import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';

import Poster from '../components/Poster';
import BookData from '../components/BookData';
import MusiCompo from '../components/MusiCompo';
import TopTenBooks from '../components/TopTenBooks';

const Home = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.MusicCompo}>
          <MusiCompo />
        </View>
        <ScrollView>
          <Poster />
          <BookData />
          <TopTenBooks />
        </ScrollView>
      </View>
    </>
  );
};

export default Home;

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

  notificationBox: {
    position: 'absolute',
    top: -20,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999,
    elevation: 10,
  },

  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  body: {
    fontSize: 12,
    color: '#555',
  },
});
