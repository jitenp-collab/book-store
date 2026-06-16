import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React from 'react';
import { PosterImages } from '../const/Poster';
import Icon from 'react-native-vector-icons/Ionicons';
import GridImage from '../ReusableCOmponent/GridImage';

const { width } = Dimensions.get('window');

const Poster = () => {
  return (
    <View style={{ height: 370 }}>
      <FlatList
        data={PosterImages}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View>
              {/* <Image source={item.image} style={styles.imges} /> */}
              <GridImage
                image={item.image}
                imageHeight={370}
                widthLoader={width}
                borderRadius={0}
                imagePading={0}
                resizeImage="stretch"
              />

              <TouchableOpacity style={styles.newRealise}>
                <Text style={styles.realiseText}>{item.new}</Text>
                <Icon name={item.icon} color="white" size={20} />
              </TouchableOpacity>

              <Text style={styles.des}>{item.des}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Poster;

const styles = StyleSheet.create({
  imges: {
    width: width,
    height: 370,
    resizeMode: 'stretch',
  },

  newRealise: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    bottom: 30,
    justifyContent: 'center',
    start: 60,
  },

  realiseText: {
    color: 'white',
    textAlign: 'center',
    marginRight: 5,
  },

  des: {
    width: 200,
    backgroundColor: '#ffffffc2',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    start: 100,
    bottom: 90,
    fontWeight: '700',
    lineHeight: 20,
  },
});
