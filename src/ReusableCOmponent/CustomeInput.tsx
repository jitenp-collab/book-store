import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { seconDaryColor } from '../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomeInput = ({
  value,
  onChangeText,
  placeHolder,
  error = false,
  keyboardNUm,
  containerStyle,
  inputStyle,
  variant = 'default',
  search = false,
  returnType,
  onsubmitingedit,
  inputref,
  width,
}: any) => {
  const [isFocus, setisFocus] = useState(false);

  const isCustom = variant === 'custom';

  return (
    <View
      style={[
        styles.inputBox,
        {
          borderBottomColor: isCustom
            ? 'black'
            : error
            ? 'red'
            : isFocus
            ? `${seconDaryColor}`
            : '#fff',
          borderBottomWidth: isCustom ? 1 : styles.inputBox.borderBottomWidth,
          elevation: isCustom ? 0 : 3,
          borderRadius: isCustom ? 0 : 5,
          backgroundColor: isCustom ? 'none' : 'white',
          width: width,
        },
        containerStyle,
      ]}
    >
      <TextInput
        value={value}
        ref={inputref}
        onChangeText={onChangeText}
        placeholder={placeHolder}
        onFocus={() => setisFocus(true)}
        onBlur={() => setisFocus(false)}
        returnKeyType={returnType}
        keyboardType={keyboardNUm ? 'numeric' : 'default'}
        style={[styles.textStyle, inputStyle]}
        onSubmitEditing={onsubmitingedit}
      />
      {search && (
        <View style={styles.IconPosition}>
          <Icon name="search" size={25} />
        </View>
      )}
    </View>
  );
};

export default CustomeInput;

const styles = StyleSheet.create({
  inputBox: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    marginVertical: 10,
    elevation: 3,
    borderBottomWidth: 1,
    borderRadius: 5,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
  },

  textStyle: {
    textAlign: 'right',
  },
  IconPosition: {
    position: 'absolute',
    right: 5,
    top: 8,
    marginStart: 10,
  },
});
