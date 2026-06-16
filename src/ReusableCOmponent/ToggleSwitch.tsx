import { StyleSheet, Switch, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { primaryColor, seconDaryColor } from '../theme/Theme';

const ToggleSwitch = ({ isOne, setIsOne }: any) => {
  //   const [isOne, setIsOne] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setIsOne(!isOne)}
      style={[
        styles.back,
        { backgroundColor: isOne ? `${primaryColor}` : 'gray' },
      ]}
    >
      <View
        style={[
          styles.round,
          {
            alignSelf: isOne ? 'flex-end' : 'flex-start',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default ToggleSwitch;

const styles = StyleSheet.create({
  back: {
    width: 60,
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    padding: 2,
  },

  round: {
    width: 24,
    height: 24,
    borderRadius: 11,
    backgroundColor: 'white',
  },
});
