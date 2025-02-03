import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Colors, FontSize, IMAGES } from '../assets/constants';
import { Fonts } from '../assets/fonts/Fonts';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const NoDataFound = ({ msg }) => {
  return (
    <View style={{ flex: 1, marginTop: wp(20), alignContent: 'center', alignSelf: 'center' }}>
      <Image source={IMAGES.PLAYERS} style={{ alignSelf: 'center', width: wp(25), height: wp(25), resizeMode: 'contain' }} />
      <Text style={[styles.titleContainer, { flex: 1, marginTop: wp(5) }]}>No Data Founds</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    color: Colors.textBlack,
    fontSize: FontSize.bigText,
    fontFamily: Fonts.BOLD
  }
});
