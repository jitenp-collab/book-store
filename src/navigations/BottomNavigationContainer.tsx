import { StyleSheet, Text, TouchableOpacity, View,  } from 'react-native';
import React, {  } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { primaryColor, seconDaryColor } from '../theme/Theme';
import StatusBarBackground from '../components/StatusBarBackground';
import Header from '../components/Header';
import Notification from '../components/Notification';

const BottomNavigationContainer = ({ state, navigation }: any) => {
  const Tabs = [
    {
      name: 'Favorites',
      route: 'Favorites',
      activeIcon: 'heart',
      inActiveIcon: 'heart-outline',
    },
    {
      name: 'Store',
      route: 'Store',
      activeIcon: 'storefront',
      inActiveIcon: 'storefront-outline',
    },
    {
      name: 'Home',
      route: 'Home',
      activeIcon: 'home',
      inActiveIcon: 'home-outline',
    },
    {
      name: 'Library',
      route: 'Library',
      activeIcon: 'library',
      inActiveIcon: 'library-outline',
    },

    {
      name: 'Marking',
      route: 'Mark',
      activeIcon: 'bookmark',
      inActiveIcon: 'bookmark-outline',
    },
  ];

 

  return (
    <>
      <StatusBarBackground />
      <View style={styles.container}>
        
        <Header />
        <View style={styles.Tabs}>
          {Tabs.map((t: any, i: number) => {
            const isActive = state.routes[state.index].name === t.route;

            return (
              <TouchableOpacity
                key={i}
                activeOpacity={0.8}
                onPress={() => navigation.navigate(t.route)}
                style={styles.tabBox}
              >
                <View
                  style={[
                    styles.iconContainer,
                    isActive && styles.activeContainer,
                  ]}
                >
                  <Icon
                    name={isActive ? t.activeIcon : t.inActiveIcon}
                    size={isActive ? 40 : 24}
                    color={isActive ? primaryColor : seconDaryColor}
                  />
                  {isActive && (
                    <Text
                      style={[
                        styles.tabText,
                        {
                          color: isActive ? primaryColor : '#0c0c0c',
                        },
                      ]}
                    >
                      {t.name}
                    </Text>
                  )}

                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: isActive ? 60 : 50,
                      width: isActive ? 100 : 50,
                      borderBottomRightRadius: 100,
                      borderBottomLeftRadius: 100,
                      position: 'absolute',
                      bottom: isActive ? -6 : -4,
                      zIndex: -1,
                    }}
                  ></View>
                </View>
                {!isActive && (
                  <Text
                    style={[
                      styles.tabText,
                      {
                        color: isActive ? primaryColor : '#0c0c0c',
                        position: 'relative',
                        bottom: 25,
                      },
                    ]}
                  >
                    {t.name}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </>
  );
};

export default BottomNavigationContainer;

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  Tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    paddingVertical: 10,
    // borderTopWidth: 1,
    // borderTopColor: '#afabab',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingHorizontal: 15,
    marginTop: 50,
    height: 70,
  },

  tabBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    position: 'relative',
    top: -30,
    backgroundColor: primaryColor,
  },

  activeContainer: {
    backgroundColor: seconDaryColor,
    borderRadius: 50,
    height: 90,
    width: 90,
    position: 'relative',
    top: -25,
  },

  tabText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
