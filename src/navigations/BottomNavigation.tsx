import { StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Library from '../screens/Library';
import Favorites from '../screens/Favorites';
import Marking from '../screens/Marking';
import BottomNavigationContainer from './BottomNavigationContainer';
import Store from '../screens/Store';

const BottomNavigation = ({ route }: any) => {
  const Tab = createBottomTabNavigator();


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPosition: 'top',
        headerShown: false,
      }}
      tabBar={props => <BottomNavigationContainer {...props} />}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Library" component={Library} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Mark" component={Marking} />
      <Tab.Screen name="Store" component={Store} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
