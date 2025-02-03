import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, StatusBar, Animated, Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Colors, IMAGES, FontSize } from '../../assets/constants';
import { BlueButton } from '../../components';
import { Fonts } from '../../assets/fonts/Fonts';

const SplashScreen = (props) => {
  const navigation = props.navigation;
  const translateY = useRef(new Animated.Value(0)).current;
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    // Animate the logo to the top after 3 seconds
    Animated.timing(translateY, {
      toValue: -hp(30), // Adjust this value as needed
      duration: 2000, // Adjust the duration as needed
      easing: Easing.sin,
      useNativeDriver: false
    }).start(() => {
      setAnimationCompleted(true); // Animation is complete
    });
  }, []);

  const signInHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const googleHandler = () => {
    // navigation.navigate('LoginScreen');
    navigation.navigate('OTPVerifyScreen');
  };

  const facebookHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const newUserHandler = () => {
    navigation.navigate('RegistrationScreen');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'light-content'} />
        <ImageBackground style={{ flex: 1 }} resizeMode="cover" source={IMAGES.BACKGROUND}>
          <Animated.View style={{ transform: [{ translateY }] }}>
            <Image source={IMAGES.LOGO_MAIN} style={{ resizeMode: 'contain', width: wp(60), height: wp(60), marginTop: hp(40), alignSelf: 'center' }} />
          </Animated.View>
          <View style={{ flex: 1 }} />
          <View style={{ marginHorizontal: wp(5), marginBottom: wp(5) }}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
            {/* Google Button Container */}
            {/* <TouchableOpacity style={[styles.buttonContainer, { marginRight: wp(2) }]} onPress={() => googleHandler()}>
                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                  <Image source={IMAGES.GOOGLELOGO} style={[styles.buttonImageContainer]} />
                  <Text style={[styles.labText, { marginLeft: 15, marginTop: 2 }]}>Google</Text>
                </View>
              </TouchableOpacity> */}
            {/* Facebook Button Container */}
            {/* <TouchableOpacity style={[styles.buttonContainer, { marginLeft: wp(2) }]} onPress={() => facebookHandler()}>
                <View style={{ alignContent: 'center', flexDirection: 'row' }}>
                  <Image source={IMAGES.FACEBOOKLOGO} style={[styles.buttonImageContainer, { width: wp(4), height: wp(5) }]} />
                  <Text style={[styles.labText, { marginLeft: 15, marginTop: 2 }]}>Facebook</Text>
                </View>
              </TouchableOpacity> */}
            {/* </View> */}
            {/* <Text style={[styles.labText, { color: Colors.white, marginVertical: wp(5), fontSize: FontSize.bigText, alignSelf: 'center' }]}>or</Text> */}
            {/* Sign in Button Container */}
            {animationCompleted && (
              <>
                <BlueButton title={'Sign in using Mobile'} onPressHandler={signInHandler} />
                {/* New User? Container */}
                <View style={{ marginTop: wp(5) }}>
                  <Text style={[styles.labText, { color: Colors.white, fontSize: FontSize.mediumText, alignSelf: 'center' }]}>
                    New User?{' '}
                    <Text
                      onPress={() => newUserHandler()}
                      style={[styles.labText, { color: Colors.blue, marginVertical: wp(5), fontSize: FontSize.mediumText, alignSelf: 'center' }]}>
                      Create an account
                    </Text>
                  </Text>
                </View>
              </>
            )}
          </View>
        </ImageBackground>
      </SafeAreaProvider>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: wp(4),
    flex: 1,
    borderRadius: 5
  },
  buttonImageContainer: {
    resizeMode: 'stretch',
    width: wp(5),
    height: wp(5),
    alignSelf: 'center'
  },
  labText: {
    fontSize: FontSize.mediumText,
    fontFamily: Fonts.BOLD,
    color: Colors.textBlack
  }
});
