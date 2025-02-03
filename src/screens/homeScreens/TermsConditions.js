import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../assets/constants';
import { ThemeHeader } from '../../components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { termsConditions } from './Redux/actions';

import LoaderProgress from '../../components/LoaderProgress';
import LocalStorage from '../../utils/LocalStorage';
import { AUTHTOKEN } from '../../helpers/ApiRoutes';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import Util from '../../utils/Util';

const TermsConditions = (route) => {
  const navigation = route.navigation;
  const [isLoader, setIsLoader] = useState(false);
  const [authToken, setAuthToken] = useState('');

  const [termsConditionsData, setTermsConditionsData] = useState('');

  useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        LocalStorage.getValue(AUTHTOKEN).then((data) => {
          if (data) {
            setAuthToken(data);
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
    route.termsConditions({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        if (res?.status === 200) {
          setTermsConditionsData('<html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body>' + res?.data?.content + '</body></html>');
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
          <ThemeHeader title={'Terms & Conditions'} leftImageSource={'arrow-back'} leftHandler={BackHandler} />
          <WebView source={{ html: termsConditionsData }} style={{ flex: 1, margin: wp(5) }} />
        </View>
      </SafeAreaProvider>
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ termsConditions }, dispatch);
};

export default connect(null, mapDispatchToProps)(TermsConditions);

const styles = StyleSheet.create({});
