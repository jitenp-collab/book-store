import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { BooksRank } from '../const/BookRank';
import { primaryColor, } from '../theme/Theme';
import GridImage from '../ReusableCOmponent/GridImage';

const TopTenBooks = () => {
  const randerItem = ({ item }: any) => {
    return (
      <View style={styles.cart}>
        <Text style={styles.rank}> {item.rank} </Text>
         <GridImage image={item.image} widthLoader={130} imagemaginH={0}  borderRadius={5} imageHeight={170}  />
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.trending}>Today's Trending</Text>

      <FlatList
        horizontal
        data={BooksRank}
        keyExtractor={item => item.id.toString()}
        renderItem={randerItem}
      />
    </View>
  );
};

export default TopTenBooks;

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 150,
    marginHorizontal: 5,
    borderRadius: 5,
    resizeMode: 'cover',
    // borderWidth: 2,
  },
  trending: {
    fontSize: 17,
    marginStart: 15,
    fontWeight: '700',
    // marginVertical: 20,
    marginTop: 15,
  },
  rank: {
    fontWeight: '900',
    color: primaryColor,
    position: 'absolute',
    zIndex: 1,
    fontSize: 50,
    top: -30,
    // bottom: -30,
    right: 0,
  },
  cart: {
    overflow: 'visible',
    marginVertical: 15,
  },
});
