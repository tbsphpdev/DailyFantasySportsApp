import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors, IMAGES, FontSize } from '../../assets/constants';
import { HeaderWithInputText, ThemeHeader } from '../../components';
import { Fonts } from '../../assets/fonts/Fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ForgotPassword = (props) => {
  const navigation = props.navigation;
  const [mobileNo, setMobileNo] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');

  const IsValidation = () => {
    setMobileNoError('');
    setPasswordError('');
    let isBool = true;
    if (mobileNo.length === 0) {
      isBool = false;
      setMobileNoError('Please enter valid mobile no!');
    }

    return isBool;
  };

  const BackHandler = () => {
    navigation.goBack();
  };

  const loginHandler = () => {
    if (IsValidation()) {
      navigation.goBack();
    }
  };

  const signupHandler = () => {
    navigation.navigate('RegistrationScreen');
  };

  const signInHandler = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <SafeAreaProvider style={{ marginHorizontal: wp(5) }}>
        <View style={{ flex: 1 }}>
          <ThemeHeader
            title={''}
            leftImageSource={'arrow-back'}
            leftHandler={BackHandler}
            // isrighText={true} rightLable={'adkahd'}
          />
          <Text style={{ marginTop: hp(3), fontSize: FontSize.largetext, fontFamily: Fonts.BOLD, marginBottom: hp(5) }}>Forgot Password</Text>
          {/* MObile Number Container */}
          <HeaderWithInputText
            headerName={'Mobile No.'}
            placeholder={'Enter the mobile no'}
            value={mobileNo}
            onChangeText={(value) => {
              setMobileNo(value), setMobileNoError('');
            }}
            keyboardType={'phone-pad'}
            errorMSG={mobileNoError}
          />
          <View style={{ marginTop: wp(5) }} />

          <TouchableOpacity style={{ marginTop: hp(4), marginRight: wp(3) }} onPress={() => loginHandler()}>
            <Image source={IMAGES.GONEXT} style={{ width: wp(15), height: wp(15), marginTop: hp(1) }} />
          </TouchableOpacity>
        </View>

        {/* Buttom Container */}
        <View style={[{ flexDirection: 'row' }]}>
          <TouchableOpacity onPress={() => signupHandler()}>
            <Text style={[styles.buttomContainer]}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => signInHandler()}>
            <Text style={[styles.buttomContainer, { marginLeft: wp(5) }]}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaProvider>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  inputText: {
    marginTop: hp(0.5),
    color: Colors.textBlack,
    fontSize: FontSize.bigText,
    fontFamily: Fonts.REGULAR,
    paddingVertical: 3
  },
  errorText: {
    color: Colors.red,
    fontFamily: Fonts.REGULAR,
    lineHeight: hp(2.5),
    textAlign: 'center'
  },
  inputTextContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  buttomContainer: {
    fontSize: FontSize.mediumText,
    marginBottom: hp(10),
    color: Colors.blue,
    fontFamily: Fonts.BOLD
  }
});
