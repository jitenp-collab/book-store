import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AllBooksData } from '../const/BooksData';
import Icon from 'react-native-vector-icons/Ionicons';
import { seconDaryColor } from '../theme/Theme';
import GridImage from '../ReusableCOmponent/GridImage';

const BookData = () => {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.box}>
          <Icon color="clack" name="chevron-back" size={18} />
          <Text style={styles.more}>More</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.recomended}>Recommended for you</Text>
          <Icon color="clack" name="heart-outline" size={25} />
        </View>
      </View>

      <FlatList
        horizontal
        data={AllBooksData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <View style={styles.iconBox}>
                {item.icons.map((icn, index) => (
                  <View key={index} style={styles.icon}>
                    <Icon name={icn} color={seconDaryColor} size={20} />
                  </View>
                ))}
              </View>
              <GridImage image={item.image} widthLoader={130} imagemaginH={0}  borderRadius={5} imageHeight={170}  />

              <Text style={styles.offer}>{item.offer}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default BookData;

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 5,
    resizeMode: 'cover',
    // borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // marginVertical: 20,
    position: 'relative',
    zIndex: 0,
    marginTop: 20,
  },
  recomended: {
    fontWeight: '800',
    fontSize: 17,
    marginEnd: 5,
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  more: {
    fontSize: 16,
    marginStart: 5,
  },
  offer: {
    backgroundColor: 'black',
    color: seconDaryColor,
    position: 'absolute',
    right: 5,
    top: 55,
    width: 80,
    textAlign: 'center',
    borderWidth: 0.4,
    borderBottomColor: seconDaryColor,
    borderLeftColor: seconDaryColor,
    borderTopColor: seconDaryColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 13,
  },
  iconBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative',
    top: 15,
    zIndex: 5,
  },
  icon: {
    backgroundColor: 'black',
    elevation: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    borderRadius: 50,
    borderWidth: 0.4,
    borderColor: seconDaryColor,
  },
  card: {
    //  width: 110,
    //   marginHorizontal: 5,
    position: 'relative',
    zIndex: 1,
  },
});
