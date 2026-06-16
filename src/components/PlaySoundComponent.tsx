import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { primaryColor, seconDaryColor } from '../theme/Theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';

const PlaySoundComponent = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [sound, setSound] = useState<any>(null);

  const toggleSound = () => {
    // Sound.setCategory('Playback');

    if (!sound) {
      const newSound = new Sound('sound.mp3', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Load error:', error);
          return;
        }

        newSound.play(success => {
          if (success) {
            setIsPlay(false);
            newSound.release();
            setSound(null);
          }
        });

        setIsPlay(true);
      });

      setSound(newSound);
    } else {
      if (isPlay) {
        sound.pause();
        setIsPlay(false);
      } else {
        sound.play((success: any) => {
          if (success) {
            setIsPlay(false);
            setSound(null);
            sound.release();
          }
        });

        setIsPlay(true);
      }
    }
  };

  return (
    <View style={styles.box}>
      <View style={styles.soundBox}>
        <Image style={styles.image} source={require('../assets/fiction.jpg')} />

        <Text style={styles.songName}>Enter the name Song</Text>
        <Text style={styles.bandName}>Band name</Text>

        <View style={styles.soundLine} />

        <View style={styles.playBox}>
          <TouchableOpacity>
            <Icon name="play-back" size={30} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSound}>
            <Icon name={isPlay ? 'pause' : 'play'} size={30} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Icon name="play-forward" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PlaySoundComponent;

const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primaryColor,
  },
  soundBox: {
    backgroundColor: seconDaryColor,
    padding: 15,
    borderRadius: 30,
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  songName: {
    textAlign: 'center',
    fontWeight: '700',
    marginVertical: 5,
  },
  bandName: {
    textAlign: 'center',
  },
  playBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  soundLine: {
    marginTop: 5,
    // height: 1,
    borderBottomWidth: 2,
    borderColor: '#13121285',
    borderBottomRightRadius: 20,
  },
});
