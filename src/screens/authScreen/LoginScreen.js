import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, IMAGES, FontSize } from '../../assets/constants';
import { HeaderWithInputText, ThemeHeader } from '../../components';
import { Fonts } from '../../assets/fonts/Fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../../screens/authScreen/Redux/actions';
import LoaderProgress from '../../components/LoaderProgress';
import Util from '../../utils/Util';
import { BlueButton } from '../../components';
import NetInfo from '@react-native-community/netinfo';

const LoginScreen = (props) => {
  const navigation = props.navigation;
  const [isLoader, setIsLoader] = useState(false);

  const [mobileNo, setMobileNo] = useState('');
  // const [password, setPassword] = useState('');
  // const [hidePassword, setHidePassword] = useState(true);

  const [mobileNoError, setMobileNoError] = useState('');
  // const [passwordError, setPasswordError] = useState('');

  const IsValidation = () => {
    setMobileNoError('');
    // setPasswordError('');
    let isBool = true;
    if (mobileNo.length === 0) {
      isBool = false;
      setMobileNoError('Please enter valid mobile no!');
    }
    // if (password.length === 0) {
    //   isBool = false;
    //   setPasswordError('Please enter password!');
    // }
    return isBool;
  };

  const BackHandler = () => {
    navigation.goBack();
  };

  const loginHandler = () => {
    if (IsValidation()) {
      Keyboard.dismiss();
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          loginAPICall();
        } else {
          Util.errorToast('Please check your internet connection.');
        }
      });

      // navigation.goBack();
    }
  };
  const signupHandler = () => {
    navigation.navigate('RegistrationScreen');
  };
  const forgotPasswordHandler = () => {
    navigation.navigate('ForgotPassword');
  };

  const loginAPICall = () => {
    if (IsValidation()) {
      setIsLoader(true);
      let payload = {
        mobile: `+91${mobileNo}`
      };
      props.login({
        payload,
        callback: (res) => {
          setIsLoader(false);
          console.log('Login Res:::::::', res);
          if (res?.status === 200) {
            navigation.navigate('OTPVerifyScreen', { token: res?.data?.token, mobile: mobileNo });
            setMobileNo('');
          } else {
            console.log('Login Error :::::>>>', res);
            Util.errorToast(res?.msg);
          }
        }
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <SafeAreaProvider>
        <LoaderProgress loading={isLoader} />
        <View style={{ flex: 1 }}>
          <ThemeHeader title={'Login'} isTrophy={false} leftImageSource={'arrow-back'} leftHandler={BackHandler} />
          <Image source={IMAGES.LOGO_MAIN} style={{ resizeMode: 'contain', width: wp(30), height: wp(30), marginTop: wp(10), alignSelf: 'center' }} />
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

          {/* Password Container */}
          {/* <HeaderWithInputText
            headerName={'Password'}
            placeholder={'Enter the password'}
            value={password}
            onChangeText={(value) => {
              setPassword(value), setPasswordError('');
            }}
            keyboardType={'email-address'}
            errorMSG={passwordError}
            isPasswordField={true}
            hidePassword={hidePassword}
            hidePasswordHandler={() => {
              setHidePassword(!hidePassword);
            }}
          /> */}
          {/* <TouchableOpacity style={{ marginTop: hp(4), marginRight: wp(3) }} onPress={() => loginHandler()}>
            <Image source={IMAGES.GONEXT} style={{ width: wp(15), height: wp(15), marginTop: hp(1) }} />
          </TouchableOpacity> */}
          <View style={{ marginTop: wp(5), marginHorizontal: wp(5) }}>
            <BlueButton title={'Login'} onPressHandler={loginHandler} />
          </View>
          <View style={{ marginTop: wp(5), marginHorizontal: wp(5), flexDirection: 'row' }}>
            <Text style={[styles.buttomContainer, { color: Colors.gray }]}>Don't have a account? </Text>
            <TouchableOpacity onPress={() => signupHandler()}>
              <Text style={[styles.buttomContainer]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaProvider>
    </View>
  );
};

// export default LoginScreen;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ login }, dispatch);
};

export default connect(null, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  title: {
    color: Colors.textBlack,
    marginTop: hp(3),
    fontSize: FontSize.largetext,
    fontFamily: Fonts.BOLD,
    marginBottom: hp(5)
  },
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
