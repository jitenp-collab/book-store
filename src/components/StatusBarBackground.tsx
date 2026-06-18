import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { navigationref } from '../navigations/Navigationref';
import { useFocusEffect } from '@react-navigation/native';
import { primaryColor, seconDaryColor } from '../theme/Theme';

const StatusBarBackground = ({ color = '#7c7a7a' }) => {
  const insets = useSafeAreaInsets();
  const [isProfile, setisProfile] = useState(false);

  const getroutname = () => {
    return navigationref.getCurrentRoute()?.name;
  };

  useFocusEffect(
    useCallback(() => {
      const currentRoute = getroutname();

      if (currentRoute === 'Profile') {
        setisProfile(true);
      }
    }, []),
  );

  return (
    <>
      {isProfile && <StatusBar backgroundColor={seconDaryColor} barStyle="default" />}
      <View
        style={{
          height: insets.top,
          backgroundColor: color,
        }}
      />
    </>
  );
};

export default StatusBarBackground;
