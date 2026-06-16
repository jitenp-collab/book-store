import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { primaryColor } from '../theme/Theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const RegisterHeader = ({ label, description }: any) => {
  const translateY = useSharedValue(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-5, { duration: 1000 }),
      -1,
      true
    );
  }, [translateY]);

  const animationstyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.sideText}>Tap in</Text>

        <View style={styles.imageWrapper}>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="small" color={primaryColor} />
            </View>
          )}

          <Animated.Image
            source={require('../assets/book_logo.png')}
            style={[styles.bookImage, animationstyle]}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
          />
        </View>

        <Text style={styles.sideText}>groww</Text>
      </View>

      <Text style={styles.welcomeText}>{label}</Text>
      <Text style={styles.welcomeMesage}>{description}</Text>
    </>
  );
};

export default RegisterHeader;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  sideText: {
    fontSize: 35,
    fontWeight: '600',
    color: primaryColor,
  },

  imageWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loader: {
    position: 'absolute',
    zIndex: 10,
  },

  bookImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },

  welcomeText: {
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: 20,
    marginTop: 10,
    fontSize: 20,
  },

  welcomeMesage: {
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 16,
  },
});