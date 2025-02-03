import React, { useContext, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { MoreMenu } from '../../utils/JSONData';
import { MenuCard, ThemeHeader } from '../../components';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext } from '../../hook/AuthContext';
import TwoButtonDialog from '../../components/TwoButtonDialog';
import { useFocusEffect } from '@react-navigation/native';

const More = (props) => {
  const navigation = props.navigation;
  const { signOut } = useContext(AuthContext);
  const [isLogOut, setIsLogOut] = useState(false);
  const refSortBySheet = useRef();
  useFocusEffect(React.useCallback(() => {}, []));

  const yseHandler = () => {
    // setIsLogOut(!isLogOut);
    refSortBySheet.current.close();
    setTimeout(() => {
      signOut();
    }, 200);
  };

  const noHandler = () => {
    // setIsLogOut(!isLogOut);
    refSortBySheet.current.close();
  };

  const onPressHandler = (index) => {
    // if (index === 0) {
    //   navigation.navigate('Notification');
    // } else if (index === 1) {
    //   navigation.navigate('Wallet');
    // } else if (index === 2) {
    //   navigation.navigate('AboutUs');
    // } else if (index === 3) {
    //   navigation.navigate('HowToPlay');
    // } else if (index === 4) {
    //   navigation.navigate('FantasyPointsSystem');
    // } else if (index === 5) {
    //   navigation.navigate('TermsConditions');
    // } else if (index === 6) {
    //   navigation.navigate('Profile');
    //   // navigation.navigate('UserSupport');
    // } else if (index === 7) {
    //   navigation.navigate('PrivacyPolicy');
    // } else if (index === 8) {
    //   navigation.navigate('UserSupport');
    // } else if (index === 9) {
    //   refSortBySheet.current.open();
    // } else {
    //   //
    // }
    if (index === 0) {
      navigation.navigate('Profile');
    } else if (index === 1) {
      navigation.navigate('Wallet');
    } else if (index === 2) {
      navigation.navigate('Notification');
    } else if (index === 3) {
      navigation.navigate('AboutUs');
    } else if (index === 4) {
      navigation.navigate('HowToPlay');
    } else if (index === 5) {
      navigation.navigate('FantasyPointsSystem');
    } else if (index === 6) {
      navigation.navigate('TermsConditions');
      // navigation.navigate('UserSupport');
    } else if (index === 7) {
      navigation.navigate('PrivacyPolicy');
    } else if (index === 8) {
      navigation.navigate('UserSupport');
    } else if (index === 9) {
      refSortBySheet.current.open();
    } else {
      //
    }
  };

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <ThemeHeader title={'Fantasy Sports'} isTrophy={true} />
      {MoreMenu &&
        MoreMenu.map((item, index) => {
          return <MenuCard key={index} item={item} onPressHandler={() => onPressHandler(index)} isBorderHide={MoreMenu?.length - 1 === index ? true : false} />;
        })}
      <TwoButtonDialog state={refSortBySheet} yseHandler={() => yseHandler()} noHandler={() => noHandler()} description={'Are you sure you want to logout?'} title={'Logout'} />
    </SafeAreaProvider>
  );
};

export default More;

const styles = StyleSheet.create({});
