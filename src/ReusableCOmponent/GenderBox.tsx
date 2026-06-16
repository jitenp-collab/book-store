import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';

const GenderBox = ({ isvisible, close, data, setGender }: any) => {
  const selectedgender = (item: string) => {
    setGender(item);
    close();
  };

  return (
    <Modal transparent visible={isvisible} animationType="fade">
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.title}>Select Gender</Text>

              {data.map((d: string, index: number) => (
                <TouchableOpacity
                onPress={()=>selectedgender(d)}
                 key={index} 
                 style={styles.item}>
                  <Text style={styles.itemText}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default GenderBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000070',
    paddingHorizontal: 20,
  },

  box: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 18,

    elevation: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },

  item: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 12,
  },

  itemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
});
