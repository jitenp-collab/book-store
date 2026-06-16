import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import RegisterHeader from './RegisterHeader';
import Icon from 'react-native-vector-icons/Ionicons';
import { primaryColor, seconDaryColor } from '../theme/Theme';
import { GetCurrentUser } from '../redux/actions/actiont';
import { useDispatch, useSelector } from 'react-redux';
import { Appdispatch, StoreState } from '../redux/store/Store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { activeUser } from '../redux/redusers/reducers';
import { getImageSource } from '../util/ReadIMage';
import GridImage from '../ReusableCOmponent/GridImage';

const SelectComponent = () => {
  const dispatch = useDispatch<Appdispatch>();
  const navigation = useNavigation<any>();

  const { user }: any = useSelector((state: StoreState) => state.globle);

  const mainUser: any = user?.[0];
  const otherUsers = user?.slice(1) || [];

  const totalSlots = 3;
  const filled = otherUsers.length;
  const emptySlots = totalSlots - filled;

  useFocusEffect(
    useCallback(() => {
      dispatch(GetCurrentUser());
    }, []),
  );

  return (
    <View style={styles.container}>
      <RegisterHeader
        label="who is using?"
        description="Lorem ipsum dolor sit amet...Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quae "
      />
      <View style={styles.topUser}>
        {mainUser && (
          <>
            {mainUser?.profile?.image ? (
              <>
                <View style={styles.mainUserImageContainer}>
                  <GridImage
                    image={getImageSource(mainUser.profile.image)}
                    imageHeight={100}
                    widthLoader={'100%'}
                    borderRadius={50}
                    imagePading={0}
                    onPress={() => {
                      navigation.replace('bottomNav');
                      dispatch(activeUser(mainUser));
                    }}
                  />
                </View>
                <Text style={styles.userName}>
                  {mainUser.profile.firstName}
                </Text>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => {
                    navigation.replace('bottomNav');
                    dispatch(activeUser(mainUser));
                  }}
                  style={styles.iconBox}
                >
                  <Icon name="person-outline" size={60} />
                </TouchableOpacity>

                <Text style={styles.userName}>
                  {mainUser.profile.firstName}
                </Text>
              </>
            )}
          </>
        )}
      </View>

      <View style={styles.grid}>
        {otherUsers.map((u: any, index: number) => (
          <View key={index} style={[styles.gridItem]}>
            <TouchableOpacity
              onPress={() => {
                navigation.replace('bottomNav');
                dispatch(activeUser(u));
              }}
              style={[
                styles.smallBox,
                {
                  backgroundColor: u?.profile?.image ? '' : seconDaryColor,
                },
              ]}
            >
              {u?.profile?.image ? (
                <Image
                  source={getImageSource(u.profile.image)}
                  style={styles.smallUserImage}
                />
              ) : (
                <Icon name="person-outline" size={40} />
              )}
            </TouchableOpacity>
            <Text style={styles.userNameSmall}>{u.profile.firstName}</Text>
          </View>
        ))}

        {Array.from({ length: emptySlots }).map((_, i) => (
          <View key={`empty-${i}`} style={styles.gridItem}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddUser')}
              style={styles.addIcon}
            >
              <Icon name="add-sharp" size={45} color={seconDaryColor} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};
export default SelectComponent;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  AdduserBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  rowUser: {
    alignItems: 'center',
    marginTop: 20,
  },

  topUser: {
    alignItems: 'center',
    marginTop: 20,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 30,
  },

  gridItem: {
    width: '33%',
    alignItems: 'center',
    marginVertical: 15,
  },

  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: seconDaryColor,
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  smallBox: {
    width: 75,
    height: 75,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIcon: {
    backgroundColor: primaryColor,
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  userName: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 16,
    marginTop: 5,
  },

  userNameSmall: {
    textAlign: 'center',
    fontWeight: '600',
    marginTop: 5,
  },

  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  smallUserImage: {
    width: 100,
    height: 100,
    borderRadius: 35,
  },
  mainUserImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
});
