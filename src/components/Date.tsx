import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

const Datepick = ({ isOPen, setisOpen, date, setDate }: any) => {
  return (
    <View>
      <DatePicker
        modal
        open={isOPen}
        date={date}
        mode="date"
        maximumDate={new Date()}
        onConfirm={selectedDate => {
          setDate(selectedDate),
            setTimeout(() => {
              setisOpen(false);
            }, 100);
        }}
        onCancel={() =>
          setTimeout(() => {
            setisOpen(false);
          }, 100)
        }
      />
    </View>
  );
};

export default Datepick;

const styles = StyleSheet.create({});
