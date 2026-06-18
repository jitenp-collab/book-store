import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { primaryColor } from '../theme/Theme';
import { useNavigation } from '@react-navigation/native';
import GridImage from '../ReusableCOmponent/GridImage';

const MusiCompo = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('PlaySound')}
      activeOpacity={0.9}
      style={[styles.container]}
    >
      <View>
        <View style={styles.bookIcon}>
          <Icon name="book-outline" color="white" size={30} />
        </View>
        <View style={styles.readBox}>
          <Icon name="chevron-back" color="white" size={18} />
          <Text style={styles.readIcon}>Read</Text>
        </View>
      </View>
      <View style={styles.box1}>
        <View>
          <Text style={[styles.text, styles.read]}>Reading now</Text>
          <Text style={[styles.text, styles.bookDetail]}>book name</Text>
          <Text style={[styles.text, styles.bookDetail]}>
            Page 65 Chapter 8
          </Text>
        </View>
        {/* <Image source={require('../assets/science.jpg')} style={styles.image} /> */}
        <GridImage
          image={require('../assets/science.jpg')}
          imageHeight={70}
          widthLoader={65}
          borderRadius={0}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MusiCompo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: primaryColor,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: 20,
    paddingBottom: 20,
    paddingTop: 10,
    width: '100%',
  },
  readBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 70,
    width: 50,
    marginStart: 10,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'right',
  },
  read: {
    color: 'white',
    fontWeight: '700',
  },
  bookDetail: {
    color: 'white',
  },
  bookIcon: {
    marginStart: 10,
    marginBottom: 5,
  },
  readIcon: {
    color: 'white',
    // marginStart: 5,
  },
});
