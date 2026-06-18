import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { requestLocationPermission } from '../util/checkPermissions';
import { useFocusEffect } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

const Location = () => {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const getAddress = async (lat: any, lng: any) => {
    try {
      const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCVdWB7Jem4YE3mnE8Lv8RBU-UEY22Njgc`,
        {
          headers: {
            'User-Agent': 'ReactNativeApp/1.0',
            Accept: 'application/json',
          },
        },
      );

      const data = await response.json();
      console.log(data);

      const a = data.features[0].properties;

      const parts = [a.address_line1, a.address_line2].filter(Boolean);

      const fulladress = parts.join(', ');

      setAddress(fulladress);

      return address;
    } catch (error) {
      // console.log('Error:', error);
    }
  };

  const getCurrentLocation = async () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      async pos => {
        // console.log('POSITION:', pos);
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        const address = await getAddress(lat, lng);
        // console.log('FINAL ADDRESS:', address);
        setLoading(false);
      },
      error => {
        // console.log('ERROR:', error);
        if (error.code === 3) {
          Geolocation.getCurrentPosition(
            async pos => {
              // console.log('RETRY POSITION:', pos);
              let lat = pos.coords.latitude;
              let lng = pos.coords.longitude;

              const address = await getAddress(lat, lng);
              setLoading(false);

              // console.log('FINAL ADDRESS:', address);
            },

            err => {
              // console.log('RETRY ERROR:', err)
            },
            {
              enableHighAccuracy: false,
              timeout: 1500,
              maximumAge: 1500,
            },
          );
          return;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 6000,
      },
    );
  };

  const run = async () => {
    const permission = await requestLocationPermission();

    // console.log('permission:', permission);

    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      getCurrentLocation();
    } else {
      // console.log('Location permission denied');
    }
  };

  useFocusEffect(
    useCallback(() => {
      const timer = setTimeout(run, 1000);

      return () => clearTimeout(timer);
    }, []),
  );

  return (
    <View style={[styles.container, {}]}>
      <Text style={styles.locationScreen}>Location Screen</Text>

      <View style={styles.presentAdress}>
        <Text style={styles.currentAdress}>Current Adress </Text>
        {loading ? (
          <Text>Getting current location please wait...</Text>
        ) : (
          <Text style={styles.adress}>
            {address ? address : <Text>Address Not found</Text>}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  locationScreen: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  presentAdress: {
    marginTop: 20,
  },
  currentAdress: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  adress: {
    fontWeight: '500',
  },
});
