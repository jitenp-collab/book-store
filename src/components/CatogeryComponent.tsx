import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { primaryColor, seconDaryColor } from '../theme/Theme';
import { bookCategories } from '../const/BooksCatogery';
import { useNavigation } from '@react-navigation/native';

const CatogeryComponent = () => {
  const navigation = useNavigation<any>();

  const [selected, setSelected] = useState<any[]>([]);

  const toggleSelect = (item: any) => {
    const exists = selected.find(i => i.id === item.id);

    if (exists) {
      setSelected(selected.filter(i => i.id !== item.id));
    } else {
      setSelected([...selected, item]);
    }
  };

  const isSelected = (item: any) => selected.find(i => i.id === item.id);

  const handleContinue = () => {
    if (selected.length === 0) {
      Alert.alert('Please select at least one category');
      return;
    }

    navigation.replace('Select');
  };

  const renderItem = ({ item }: any) => {
    const active = isSelected(item);

    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item)}
        style={[
          styles.card,
          {
            borderColor: active ? primaryColor : '#ddd',
          },
        ]}
      >
        <ImageBackground
          source={item.image}
          style={styles.imageBg}
          imageStyle={{ borderRadius: 12 }}
        >
          <View style={styles.overlay}>
            <Text style={styles.text}>{item.name}</Text>

            {active && <Text style={styles.tick}>✔</Text>}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Text style={styles.heading}>Last step</Text>
      <View style={styles.container}>
        <Text style={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quis,
          modi, animi quas iure facere
        </Text>

        <FlatList
          data={bookCategories}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={styles.row}
        />
      </View>

      <View style={styles.continueBox}>
        <TouchableOpacity
          onPress={() => handleContinue()}
          style={styles.continue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CatogeryComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },

  heading: {
    backgroundColor: seconDaryColor,
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
    paddingVertical: 20,
  },

  desc: {
    textAlign: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    flex: 1,
    margin: 6,
    borderWidth: 3,
    borderRadius: 12,
    overflow: 'hidden',
    height: 150,
    elevation: 5,
  },

  imageBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },

  text: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },

  tick: {
    position: 'absolute',
    top: 5,
    right: 5,
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: 16,
  },
  continue: {
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 7,
  },
  continueText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  continueBox: {
    backgroundColor: 'white',
    paddingVertical: 50,
    elevation: 20,
    paddingHorizontal: 30,
  },
});
