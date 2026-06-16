import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { Books } from '../const/Books';
import Icon from 'react-native-vector-icons/Ionicons';
import { primaryColor } from '../theme/Theme';
import MarkingSheet from './MarkingSheet';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomeInput from '../ReusableCOmponent/CustomeInput';

const MarkingComponent = () => {
  const refRence = useRef<any>(null);
  const sortSheet = useRef<any>(null);
  const [data, setData] = useState(Books);
  const [isSearch, setisSerch] = useState(false);
  const [searchItem, setSearchItem] = useState('');

  const searchItems = searchItem
    ? data.filter(
        item =>
          item.description.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.name.toLowerCase().includes(searchItem.toLowerCase()) ||
          item.pages.toString().includes(searchItem.toLowerCase()) ||
          item.chapters.toString().includes(searchItem.toLowerCase()) ||
          item.releaseDate.toString().includes(searchItem.toLowerCase()) ||
          item.releaseTime.toString().includes(searchItem.toLowerCase()),
      )
    : data;

  const sotrData = (text: string) => {
    const DataShort = [...Books];

    switch (text) {
      case 'BooName':
        DataShort.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case 'chapter':
        DataShort.sort((a, b) => a.chapters - b.chapters);
        break;

      case 'pages':
        DataShort.sort((a, b) => a.pages - b.pages);
        break;

      case 'time':
        DataShort.sort((a, b) => {
          const DateA = new Date(a.releaseDate);
          const DateB = new Date(b.releaseDate);
          return DateA.getTime() - DateB.getTime();
        });
        break;
      default:
        break;
    }

    setData(DataShort);
  };

  const renderIem = ({ item }: any) => {
    return (
      <View style={styles.box}>
        <View style={styles.container}>
          <View style={styles.containtBox}>
            <Text style={[styles.textLeft, styles.bookname]}>{item.name}</Text>
            <Text style={[styles.textLeft]}>{item.description}</Text>
            <Text style={[styles.textLeft, styles.chapter]}>
              Chapter {item.chapters}, page {item.pages}
            </Text>
            <Text style={[styles.textLeft, styles.date]}>
              {' '}
              {item.releaseDate} {item.releaseTime}
            </Text>
          </View>
          <Icon name={item.icon} color={primaryColor} size={30} />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View>
        <View style={styles.SearchComponent}>
          {isSearch ? (
            <TouchableOpacity
              onPress={() => {
                setisSerch(false);
                setSearchItem('');
              }}
            >
              <Icon name="close" size={27} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setisSerch(true)}>
              <Icon name="search" size={25} />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              refRence.current.open();
            }}
            style={styles.marking}
          >
            <Icon name="chevron-down" size={22} />
            <Text>All my markings (10)</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => sortSheet.current.open()}>
            <Image
              source={require('../assets/sorting.png')}
              style={styles.sortImge}
            />
          </TouchableOpacity>
        </View>
        {isSearch && (
          <View style={styles.searchBox}>
            <CustomeInput
              placeHolder="search by content, book name, writer name"
              value={searchItem}
              onChangeText={setSearchItem}
              search={true}
              inputStyle={{ marginEnd: 20 }}
            />
          </View>
        )}
      </View>
      <View
        style={{
          marginBottom: 95,
          backgroundColor: 'white',
          paddingBottom: 5,
        }}
      >
        <FlatList
          data={searchItems}
          renderItem={renderIem}
          keyExtractor={item => item.id.toLocaleString()}
        />
      </View>
      <MarkingSheet ref={refRence} />
      <RBSheet
        ref={sortSheet}
        draggable
        openDuration={200}
        height={245}
        customStyles={{
          draggableIcon: {
            width: '50%',
            marginTop: 15,
          },
        }}
      >
        <ScrollView>
          <Text style={styles.sort}>Sort by</Text>
          <TouchableOpacity
            onPress={() => {
              sotrData('time');
              sortSheet.current.close();
            }}
          >
            <Text style={styles.textCenter}>Marking Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sotrData('BooName');
              sortSheet.current.close();
            }}
          >
            <Text style={styles.textCenter}>Book name A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sotrData('chapter');
              sortSheet.current.close();
            }}
          >
            <Text style={styles.textCenter}>Chapter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sotrData('pages');
              sortSheet.current.close();
            }}
          >
            <Text style={styles.textCenter}>Pages</Text>
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
    </View>
  );
};

export default MarkingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  textLeft: {
    textAlign: 'right',
  },
  bookname: {
    fontWeight: '800',
    fontSize: 17,
    marginBottom: 10,
  },
  chapter: {
    fontWeight: '800',
    fontSize: 15,
  },
  date: {
    fontWeight: '800',
    fontSize: 13,
  },
  box: {
    borderBottomWidth: 1,
    borderBottomColor: '#aaa7a77e',
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  containtBox: {
    marginEnd: 20,
  },
  SearchComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  marking: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortImge: {
    height: 25,
    width: 25,
  },
  sort: {
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 13,
  },
  textCenter: {
    textAlign: 'center',
    borderTopWidth: 0.5,
    borderColor: '#979595',
    paddingVertical: 13,
  },

  searchBox: {
    paddingHorizontal: 15,
  },
});
