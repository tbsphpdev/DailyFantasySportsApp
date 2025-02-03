import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, FontSize, IMAGES } from '../../assets/constants';
import { ThemeHeader } from '../../components';
import { Fonts } from '../../assets/fonts/Fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { otpVerify, OTP_ResendMobile } from '../../screens/authScreen/Redux/actions';
import { AuthContext } from '../../hook/AuthContext';

import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell, MaskSymbol, isLastFilledCell } from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;
const OTPVerifyScreen = (route) => {
  const navigation = route.navigation;
  const [isLoader, setIsLoader] = useState(false);
  const { userDetails, authToken } = useContext(AuthContext);

  const [token, setToken] = useState(route?.route?.params?.token);
  const [mobile, setMobile] = useState(route?.route?.params?.mobile);
  const [isTimer, setIsTimer] = useState(true);

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  const interval = useRef(null);
  const [time, setTime] = useState({ min: 2, sec: 0 });

  useEffect(() => {
    pauseOrResume();
  }, []);

  useEffect(() => {
    if (value.length == 4) {
      OTPVerification();
    }
  }, [value]);
  const updateTimer = () => {
    setTime((prev) => {
      let newTime = { ...prev };
      if (newTime.min === 0 && newTime.sec === 0) {
        clearInterval(interval);
        setIsTimer(false);
      } else {
        setIsTimer(true);
        if (newTime.sec === 0) {
          newTime.min -= 1;
          newTime.sec = 59;
        } else {
          newTime.sec -= 1;
        }
      }
      return newTime;
    });
  };
  const pauseOrResume = () => {
    if (!interval.current) {
      interval.current = setInterval(updateTimer, 1000);
      //console.log('interval.current1====', interval.current);
    } else {
      clearInterval(interval.current);
      interval.current = null;
    }
  };

  const changeHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const BackHandler = () => {
    navigation.goBack();
  };
  const ResendHandler = () => {
    setTime({
      min: 2,
      sec: 0
    });

    setIsLoader(true);
    let valueObject = { headers: `Bearer ${token}` };
    route.OTP_ResendMobile({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        console.log('OTP_ResendMobile:::::::', res);
        pauseOrResume();
        if (res?.status === 200) {
        } else {
          console.log('OTP_ResendMobile Error :::::>>>', res?.msg);
        }
      }
    });
  };

  const OTPVerification = () => {
    setIsLoader(true);
    let valueObject = {
      data: {
        type: 'mobile',
        otp: value
      },
      headers: `Bearer ${token}`
    };
    route.otpVerify({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        // console.log('OTPVerification:::::::', res);
        if (res?.status === 200) {
          userDetails(res?.data);
          authToken(token);
          // navigation.navigate('OTPVerification', { userData: res });
        } else {
          console.log('OTPVerification Error :::::>>>', res?.msg);
        }
      }
    });
  };

  const renderCell = ({ index, symbol, isFocused }) => {
    let textChild = null;

    if (symbol) {
      textChild = (
        <MaskSymbol maskSymbol="●" isLastFilledCell={isLastFilledCell({ index, value })}>
          {symbol}
        </MaskSymbol>
      );
    } else if (isFocused) {
      textChild = <Cursor />;
    }

    return (
      <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} onLayout={getCellOnLayoutHandler(index)}>
        {textChild}
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <SafeAreaProvider>
        <View style={{ flex: 1 }}>
          <ThemeHeader title={'Verify Mobile Number'} isTrophy={false} leftImageSource={'arrow-back'} leftHandler={BackHandler} />
          <Image source={IMAGES.LOGO_MAIN} style={{ resizeMode: 'contain', width: wp(30), height: wp(30), marginTop: wp(10), alignSelf: 'center' }} />

          {/* MObile Number Container */}
          <Text style={{ marginTop: hp(5), marginHorizontal: wp(5), color: Colors.textBlack, fontSize: FontSize.mediumText, fontFamily: Fonts.MEDIUM }}>
            We sent you a code to verify your phone{' '}
          </Text>
          <View style={[{ flexDirection: 'row', marginTop: hp(1) }]}>
            <Text style={{ color: Colors.textBlack, fontSize: FontSize.mediumText, fontFamily: Fonts.MEDIUM, marginStart: wp(5) }}>{mobile}</Text>
            <TouchableOpacity onPress={() => changeHandler()}>
              <Text style={[styles.buttomContainer, { marginLeft: wp(3) }]}>Change</Text>
            </TouchableOpacity>
          </View>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          />
        </View>
        {/* Buttom Container */}
        <View style={[{ flexDirection: 'column', marginBottom: hp(8) }]}>
          <Text style={[styles.buttomContainer, { color: Colors.gray, marginStart: wp(5) }]}>I didn't receive a code!</Text>
          {isTimer ? (
            <Text style={[styles.buttomContainer, { marginTop: wp(3), marginStart: wp(5) }]}>{`${time.min < 10 ? 0 : ''}${time.min} : ${time.sec < 10 ? 0 : ''}${time.sec}`}</Text>
          ) : (
            <TouchableOpacity onPress={() => ResendHandler()}>
              <Text style={[styles.buttomContainer, { marginTop: wp(3), marginStart: wp(5) }]}>Resend</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaProvider>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ otpVerify, OTP_ResendMobile }, dispatch);
};

export default connect(null, mapDispatchToProps)(OTPVerifyScreen);

const styles = StyleSheet.create({
  title: {
    color: Colors.textBlack,
    // backgroundColor: 'green',
    marginTop: hp(3),
    fontSize: FontSize.largetext,
    fontFamily: Fonts.BOLD,
    marginBottom: hp(3)
  },
  buttomContainer: {
    fontSize: FontSize.mediumText,
    color: Colors.blue,
    fontFamily: Fonts.BOLD
  },
  codeFieldRoot: { marginVertical: wp(10), marginHorizontal: wp(10) },
  cell: {
    width: wp(15),
    height: wp(15),
    lineHeight: 50,
    fontSize: FontSize.largetext,
    borderWidth: wp(0.4),
    backgroundColor: '#ffffff',
    borderRadius: wp(3),
    borderColor: '#aaa',
    textAlign: 'center'
  },
  focusCell: {
    borderColor: Colors.blue
  },

  codeFiledRoot: { marginVertical: wp(10), marginHorizontal: wp(10) }
});
