import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

import { GridImageProps } from '../modals/type';

const ShimmerLoader = ({
  height,
  borderRadius,
}: {
  height: number;
  borderRadius: number;
  marginBottom?: number;
}) => {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      false,
    );
    return () => cancelAnimation(opacity);
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height,
          borderRadius,
          backgroundColor: '#c8c8c8',
          zIndex: 2,
          marginBottom: 0,
        },
        animatedStyle,
      ]}
    />
  );
};

const GridImage = ({
  image,
  isSelected = false,
  onPress,
  imageHeight = 120,
  widthLoader = '33.33%',
  selectedBorderColor = '#000',
  placeholderColor = '#e0e0e0',
  borderRadius = 8,
  imagePading = 5,
  resizeImage,
  imagemarginBottom,
  imagemaginH,
  shimmermarginbottom,
}: GridImageProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <TouchableOpacity
      style={[
        styles.item,
        {
          width: widthLoader,
          padding: imagePading,
          marginHorizontal: imagemaginH,
          marginBottom: shimmermarginbottom || 0,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.imageWrapper,
          { borderRadius: borderRadius + 2 },
          isSelected && {
            borderColor: selectedBorderColor,
            borderWidth: 2,
            borderRadius: 100,
          },
        ]}
      >
        <View
          style={[
            styles.imagePlaceholder,
            {
              height: imageHeight,
              borderRadius,
              backgroundColor: loaded ? 'transparent' : placeholderColor,
            },
          ]}
        >
          {!loaded && (
            <ShimmerLoader height={imageHeight} borderRadius={borderRadius} />
          )}

          <Image
            source={image}
            style={[
              styles.image,
              {
                height: imageHeight,
                borderRadius,
                resizeMode: resizeImage ?? 'cover',
              },
            ]}
            fadeDuration={300}
            onLoad={() => setLoaded(true)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GridImage;

const styles = StyleSheet.create({
  item: {},
  imageWrapper: {
    borderWidth: 0,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
