import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors, FontSize } from '../../assets/constants';
import { ThemeHeader } from '../../components';
import { Fonts } from '../../assets/fonts/Fonts';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { aboutUsApi } from './Redux/actions';

import LoaderProgress from '../../components/LoaderProgress';
import LocalStorage from '../../utils/LocalStorage';
import { AUTHTOKEN } from '../../helpers/ApiRoutes';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Util from '../../utils/Util';

const AboutUs = (route) => {
  const navigation = route.navigation;
  const [isLoader, setIsLoader] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const [aboutUsData, setAboutUsData] = useState('');

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        LocalStorage.getValue(AUTHTOKEN).then((data) => {
          if (data) {
            // setAuthToken(data);
            aboutUsAPICall(data);
          }
        });
      } else {
        Util.errorToast('Please check your internet connection.');
      }
    });
  };

  const BackHandler = () => {
    navigation.goBack();
  };

  const aboutUsAPICall = (token) => {
    setIsLoader(true);

    let valueObject = { headers: `Bearer ${token}` };
    route.aboutUsApi({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        if (res?.status === 200) {
          setAboutUsData('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + res?.data?.content + '</body></html>');
        } else {
          console.log('aboutUsApi Error :::::>>>', res?.msg);
        }
      }
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <SafeAreaProvider>
        <LoaderProgress loading={isLoader} />
        <View style={{ flex: 1 }}>
          <ThemeHeader title={'About Us'} leftImageSource={'arrow-back'} leftHandler={BackHandler} />
          <WebView source={{ html: aboutUsData }} style={{ flex: 1, margin: wp(5), fontSize: FontSize.mediumText }} />
        </View>
      </SafeAreaProvider>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ aboutUsApi }, dispatch);
};

export default connect(null, mapDispatchToProps)(AboutUs);

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
