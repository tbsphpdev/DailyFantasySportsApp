import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/authScreen/LoginScreen';
import SplashScreen from '../screens/authScreen/SplashScreen';
import OTPVerifyScreen from '../screens/authScreen/OTPVerifyScreen';
import RegistrationScreen from '../screens/authScreen/RegistrationScreen';
import ForgotPassword from '../screens/authScreen/ForgotPassword';

const AStack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <View style={{ flex: 1 }}>
      <AStack.Navigator initialRouteName="SplashScreen">
        <AStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <AStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <AStack.Screen name="OTPVerifyScreen" component={OTPVerifyScreen} options={{ headerShown: false }} />
        <AStack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        <AStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
      </AStack.Navigator>
    </View>
  );
};

export default AuthStack;
