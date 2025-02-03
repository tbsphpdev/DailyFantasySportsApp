import React, { useContext } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import HomeStack from './HomeStack';

import { Colors, IMAGES, FontSize } from '../assets/constants';
import { Fonts } from '../assets/fonts/Fonts';
import { AuthContext } from '../hook/AuthContext';
import { getGlobalVariable, setGlobalVariable, getIsTabShow, setIsTabShow } from '../screens/homeScreens/GlobalVariable';

const BottomTabs = createBottomTabNavigator();

const BottomTab = () => {
  const TabViews = ({ title, images, focused }) => {
    return (
      <View style={[focused ? styles.selectedTabContainer : styles.unselectedTabContainer]}>
        <Image style={{ alignSelf: 'center', tintColor: focused ? Colors.blue : Colors.lightgray }} source={images} />
        <Text style={[styles.textStyle, { color: focused ? Colors.blue : Colors.lightgray }]}>{title}</Text>
      </View>
    );
  };

  return (
    <BottomTabs.Navigator initialRouteName="HomeScreen" tabBarOptions={{ showLabel: false }}>
      <BottomTabs.Screen
        name="HomeScreen"
        children={() => <HomeStack />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setGlobalVariable('0');
            navigation.navigate('HomeScreen', { screen: 'HomeScreen' });
          }
        })}
        options={({ route }) => {
          let tabBarVisible = true;
          const route1 = getFocusedRouteNameFromRoute(route);
          console.log('Open screen:----------------------------', route1);
          if (route1 !== undefined && route1 !== 'HomeScreen') {
            tabBarVisible = false;
          }
          console.log('Open screen:----------------------------', tabBarVisible);

          return {
            headerShown: false,
            tabBarVisible: tabBarVisible,
            tabBarStyle: tabBarVisible ? { height: Platform.OS === 'ios' ? wp(22) : wp(15) } : { display: 'none' },
            tabBarIcon: ({ focused }) => {
              if (tabBarVisible) {
                return <TabViews title="Home" images={IMAGES.HOME} focused={focused} />;
              } else {
                return null;
              }
            }
          };
        }}
      />

      <BottomTabs.Screen
        name="MyMatches"
        children={() => <HomeStack />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setGlobalVariable('0');
            navigation.navigate('MyMatches', { screen: 'MyMatches' });
          }
        })}
        options={({ route }) => {
          let tabBarVisible = true;
          const route1 = getFocusedRouteNameFromRoute(route);
          console.log('Open screen:----------------------------', route1);
          if (route1 !== undefined && route1 !== 'MyMatches') {
            tabBarVisible = false;
          }
          console.log('Open screen:----------------------------', tabBarVisible);
          return {
            headerShown: false,
            tabBarVisible: tabBarVisible,
            tabBarStyle: tabBarVisible ? { height: Platform.OS === 'ios' ? wp(22) : wp(15) } : { display: 'none' },
            tabBarIcon: ({ focused }) => {
              if (tabBarVisible) {
                return <TabViews title="My Matches" images={IMAGES.MYMATCHES} focused={focused} />;
              } else {
                return null;
              }
            }
          };
        }}
      />

      <BottomTabs.Screen
        name="More"
        children={() => <HomeStack />}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setGlobalVariable('0');
            navigation.navigate('More', { screen: 'More' });
          }
        })}
        options={({ route }) => {
          let tabBarVisible = true;
          const route1 = getFocusedRouteNameFromRoute(route);
          console.log('Open screen:----------------------------', route1);
          if (route1 !== undefined && route1 !== 'More') {
            tabBarVisible = false;
          }
          console.log('Open screen:----------------------------', tabBarVisible);
          return {
            headerShown: false,
            tabBarVisible: tabBarVisible,
            tabBarStyle: tabBarVisible ? { height: Platform.OS === 'ios' ? wp(22) : wp(15) } : { display: 'none' },
            tabBarIcon: ({ focused }) => {
              if (tabBarVisible) {
                return <TabViews title="More" images={IMAGES.MORE} focused={focused} />;
              } else {
                return null;
              }
            }
          };
        }}
      />
    </BottomTabs.Navigator>
  );
};

function TabNavigationStack(props) {
  const BottomTabStack = createNativeStackNavigator();
  return (
    <>
      <BottomTabStack.Navigator>
        <BottomTabStack.Screen name="TabScreen" options={{ headerShown: false }} component={BottomTab} />
      </BottomTabStack.Navigator>
    </>
  );
}

export default TabNavigationStack;

const styles = StyleSheet.create({
  selectedTabContainer: {
    backgroundColor: '#DDE5ED',
    borderRadius: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: wp(3),
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: wp(5)
  },
  unselectedTabContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: wp(5)
  },
  textStyle: {
    color: Colors.lightgray,
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.normalText,
    marginLeft: wp(2),
    alignContent: 'center'
  }
});
