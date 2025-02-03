import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors, FontSize } from '../assets/constants';
import { Fonts } from '../assets/fonts/Fonts';
import LinearGradient from 'react-native-linear-gradient';

export const BlueButton = ({ title, onPressHandler, isDisabled, backgroundColor }) => {
  return (
    <LinearGradient
      start={{ x: 0.1, y: 1 }}
      end={{ x: 1, y: 0.5 }}
      colors={[isDisabled ? Colors.gray : Colors.gradient1, isDisabled ? Colors.gray : Colors.gradient2]}
      style={[styles.buttonContainer]}>
      <TouchableOpacity onPress={() => onPressHandler()} disabled={isDisabled}>
        <Text style={[styles.labTextContainer]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.blue,
    padding: wp(3.4),
    borderRadius: wp(3)
  },
  labTextContainer: {
    fontSize: FontSize.bigText,
    fontFamily: Fonts.BOLD,
    color: Colors.white,
    textAlign: 'center'
  }
});
