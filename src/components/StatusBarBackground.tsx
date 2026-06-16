import React from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StatusBarBackground = ({ color = '#7c7a7a' }) => {
  const insets = useSafeAreaInsets();

  // hello how are you jqidebdv

  return (

      <View
        style={{
          height: insets.top,
          backgroundColor: color,
        }}
      />
    // </>
  );
};

export default StatusBarBackground;
