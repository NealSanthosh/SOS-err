import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { AppStackNavigator } from './AppStackNavigator'
import Contact from '../screens/Contact';
import Home from '../screens/Home';


export const AppTabNavigator = createBottomTabNavigator({
  Home : {
    screen: Home,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Home",
    }
  },
  Contact: {
    screen: Contact,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Contact",
    }
  }
});
