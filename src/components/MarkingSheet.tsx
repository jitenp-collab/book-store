import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Marking } from '../const/MarkingData';

const MarkingSheet = ({ ref }: any) => {
  return (
    <View>
      <RBSheet
        ref={ref}
        draggable
        openDuration={200}
        height={265}
        customStyles={{
          draggableIcon: {
            width: '50%',
            marginTop: 15,
          },
        }}
      >
        <Text style={styles.header}>Show markings</Text>
        <View>
          {Marking.map(m => (
            <View key={m.id} style={styles.container}>
              <TouchableOpacity
                onPress={() => {
                  ref.current.close();
                }}
                style={styles.cart}
              >
                <Text style={styles.text}>({m.number})</Text>
                <Text style={styles.text}> {m.des} </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </RBSheet>
    </View>
  );
};

export default MarkingSheet;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderColor: '#979797',
  },
  cart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  text: {
    fontWeight: '500',
  },
  header: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 15,
  },
  topBorder: {
    width: 150,
    borderBottomWidth: 5,
    borderRadius: 50,
    marginHorizontal: 'auto',
    marginTop: 15,
    borderColor: '#bebaba',
  },
});
