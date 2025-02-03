import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, IMAGES, FontSize } from '../../assets/constants';
import { HeaderWithInputText, ThemeHeader, BlueButton } from '../../components';
import { Fonts } from '../../assets/fonts/Fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from '@react-native-community/datetimepicker';
import moment from 'moment';
import Ionicon from 'react-native-vector-icons/Ionicons';
import LoaderProgress from '../../components/LoaderProgress';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registration } from '../../screens/authScreen/Redux/actions';
import Util from '../../utils/Util';
import NetInfo from '@react-native-community/netinfo';

const RegistrationScreen = (props) => {
  const navigation = props.navigation;
  const [isLoader, setIsLoader] = useState(false);
  const [fName, setFName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dob, setDOB] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 18)));
  const [gender, setGender] = useState('m');
  const [mobileNo, setMobileNo] = useState('');
  // const [email, setEmail] = useState('gaurang.tank@techcronus.com');
  // const [password, setPassword] = useState('12345');
  // const [hidePassword, setHidePassword] = useState(true);
  // const [confirmPassword, setConfirmPassword] = useState('12345');
  // const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [referralCode, setReferralCode] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [fNameError, setFNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [mobileNoError, setMobileNoError] = useState('');
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  // const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const BackHandler = () => {
    navigation.goBack();
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDOB(currentDate);
    setShowDatePicker(false);
  };

  const clearData = () => {
    setFName('');
    setLastName('');
    setUserName('');
    setGender('m');
    setMobileNo('');
  };

  const IsValidation = () => {
    setFNameError('');
    setLastNameError('');
    setUserNameError('');
    setMobileNoError('');
    // setEmailError('');
    // setConfirmPasswordError('');
    // setPasswordError('');
    let isBool = true;
    if (fName.length === 0) {
      isBool = false;
      setFNameError('Please enter valid first name!');
    }
    if (lastName.length === 0) {
      isBool = false;
      setLastNameError('Please enter valid last name!');
    }
    if (userName.length === 0) {
      isBool = false;
      setUserNameError('Please enter valid user name!');
    }
    // if (email.length === 0) {
    //   isBool = false;
    //   setEmailError('Please enter valid email!');
    // }
    if (mobileNo.length === 0) {
      isBool = false;
      setMobileNoError('Please enter valid mobile no!');
    }
    // if (password.length === 0) {
    //   isBool = false;
    //   setPasswordError('Please enter password!');
    // }
    // if (confirmPassword.length === 0) {
    //   isBool = false;
    //   setConfirmPasswordError('Please enter password!');
    // } else if (password != confirmPassword) {
    //   isBool = false;
    //   setConfirmPasswordError('Confirm password does not match!');
    // }

    return isBool;
  };

  const creatAccountHandler = () => {
    if (IsValidation()) {
      NetInfo.fetch().then((state) => {
        if (state.isConnected) {
          registrationAPICall();
        } else {
          Util.errorToast('Please check your internet connection.');
        }
      });
      // navigation.navigate('OTPVerifyScreen');
    }
  };

  const signInHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const registrationAPICall = () => {
    if (IsValidation()) {
      setIsLoader(true);
      let payload = {
        firstName: fName,
        lastName: lastName,
        userName: userName,
        dob: moment(dob, 'DD-MM-YYYY').format('YYYY-MM-DD'),
        mobile: '+91' + mobileNo,
        gender: gender,
        referalCode: referralCode
      };
      props.registration({
        payload,
        callback: (res) => {
          setIsLoader(false);
          console.log('Registration Res:::::::', res);
          if (res?.status === 200) {
            navigation.navigate('OTPVerifyScreen', { token: res?.data?.token, mobile: mobileNo });
            clearData();
          } else {
            console.log('Login Error :::::>>>', res?.msg);
            Util.errorToast(res?.msg);
          }
        }
      });
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <View style={{ flex: 1 }}>
        <LoaderProgress loading={isLoader} />

        <ThemeHeader title={'Create an account'} isTrophy={false} leftImageSource={'arrow-back'} leftHandler={BackHandler} />
        <KeyboardAwareScrollView>
          <View>
            <Image source={IMAGES.LOGO_MAIN} style={{ resizeMode: 'contain', width: wp(30), height: wp(30), marginTop: wp(10), alignSelf: 'center' }} />
            {/* First Name Container */}
            <HeaderWithInputText
              headerName={'First Name'}
              placeholder={'Enter the first name'}
              value={fName}
              onChangeText={(value) => {
                setFName(value), setFNameError('');
              }}
              errorMSG={fNameError}
              isEditable={true}
            />
            {/* Last Name Container */}
            <HeaderWithInputText
              headerName={'Last Name'}
              placeholder={'Enter the last name'}
              value={lastName}
              onChangeText={(value) => {
                setLastName(value), setLastNameError('');
              }}
              errorMSG={lastNameError}
              isEditable={true}
            />
            {/* User Name Container */}
            <HeaderWithInputText
              headerName={'User Name'}
              placeholder={'Enter an user name'}
              value={userName}
              onChangeText={(value) => {
                setUserName(value), setUserNameError('');
              }}
              errorMSG={userNameError}
              isEditable={true}
            />
            {/* DOB Container */}
            <HeaderWithInputText
              headerName={'Date of birth'}
              placeholder={'Select the date of birth'}
              value={moment(dob, 'DD-MM-YYYY').format('DD MMM YYYY')}
              onChangeText={(value) => {
                // setMobileNo(value);
              }}
              keyboardType={'phone-pad'}
              errorMSG={''}
              isEditable={false}
              isImageRes={'calendar'}
              hidePasswordHandler={() => {
                setShowDatePicker(!showDatePicker);
              }}
            />
            {showDatePicker && <DateTimePickerModal value={dob} onChange={onChange} maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} />}

            {/* Gender Container */}
            <View style={[{ marginTop: wp(5), marginHorizontal: wp(5) }]}>
              <Text style={{ color: Colors.gray, fontSize: FontSize.mediumText, fontFamily: Fonts.MEDIUM }}>Gender</Text>
              <View style={[{ flexDirection: 'row', paddingTop: wp(3) }]}>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} onPress={() => setGender('m')}>
                  <Ionicon name={gender === 'm' ? 'radio-button-on' : 'radio-button-off-sharp'} size={25} color={Colors.blue} />
                  <Text style={[{ marginLeft: wp(2), color: Colors.textBlack, fontSize: FontSize.bigText, fontFamily: Fonts.REGULAR }]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }} onPress={() => setGender('f')}>
                  <Ionicon name={gender === 'f' ? 'radio-button-on' : 'radio-button-off-sharp'} size={25} color={Colors.blue} />
                  <Text style={[{ marginLeft: wp(2), color: Colors.textBlack, fontSize: FontSize.bigText, fontFamily: Fonts.REGULAR }]}>Female</Text>
                </TouchableOpacity>
              </View>
            </View>

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
              isEditable={true}
            />
            {/* Email Container */}
            {/* <HeaderWithInputText
            headerName={'Email Address'}
            placeholder={'Enter the email address'}
            value={email}
            onChangeText={(value) => {
              setEmail(value), setEmailError('');
            }}
            keyboardType={'email-address'}
            errorMSG={emailError}
          /> */}
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
            {/* Confirm Password Container */}
            {/* <HeaderWithInputText
            headerName={'Confirm Password'}
            placeholder={'Enter the confirm password'}
            value={confirmPassword}
            onChangeText={(value) => {
              setConfirmPassword(value), setConfirmPasswordError('');
            }}
            keyboardType={'email-address'}
            errorMSG={confirmpasswordError}
            isPasswordField={true}
            hidePassword={hideConfirmPassword}
            hidePasswordHandler={() => {
              setHideConfirmPassword(!hideConfirmPassword);
            }}
          /> */}
            {/* Referral code Container */}
            <HeaderWithInputText
              headerName={'Referral Code'}
              placeholder={'Enter the referral code'}
              value={referralCode}
              onChangeText={(value) => {
                setReferralCode(value);
              }}
              isEditable={true}
            />

            <View style={{ marginTop: wp(5), marginHorizontal: wp(5) }}>
              <BlueButton title={'Register'} onPressHandler={creatAccountHandler} />
            </View>
            <View style={{ marginTop: wp(5), marginHorizontal: wp(5), flexDirection: 'row' }}>
              <Text style={[styles.buttomContainer, { color: Colors.gray }]}>Already Have an Account? </Text>
              <TouchableOpacity onPress={() => signInHandler()}>
                <Text style={[styles.buttomContainer]}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ registration }, dispatch);
};

export default connect(null, mapDispatchToProps)(RegistrationScreen);

// export default RegistrationScreen;

const styles = StyleSheet.create({
  title: {
    color: Colors.textBlack,
    marginTop: hp(3),
    fontSize: FontSize.largetext,
    fontFamily: Fonts.BOLD
  },
  inputText: {
    marginTop: hp(1),
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
  rightLableContainer: {
    fontSize: FontSize.mediumText,
    marginBottom: hp(10),
    color: Colors.blue,
    fontFamily: Fonts.BOLD
  },
  buttomContainer: {
    fontSize: FontSize.mediumText,
    marginBottom: hp(3),
    color: Colors.blue,
    fontFamily: Fonts.BOLD
  }
});
