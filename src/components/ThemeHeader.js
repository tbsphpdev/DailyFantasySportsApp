import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Colors, FontSize, IMAGES } from '../assets/constants';
import { Fonts } from '../assets/fonts/Fonts';
import LinearGradient from 'react-native-linear-gradient';

export const ThemeHeader = ({ isLeftImage, leftImageSource, title, isRightImage, rightImageSource, isrighText, rightLable, leftHandler, rightHandler, isTrophy }) => {
  return (
    <LinearGradient start={{ x: 0.1, y: 1 }} end={{ x: 1, y: 0.5 }} colors={[Colors.gradient1, Colors.gradient2]} style={[styles.gradientContainer]}>
      <View style={[styles.mainContainer]}>
        <TouchableOpacity style={{ justifyContent: 'center' }} onPress={leftHandler}>
          {isLeftImage ? (
            <Image source={leftImageSource} style={[styles.imageContainer, { borderRadius: 20, alignSelf: 'center', justifyContent: 'center' }]} />
          ) : (
            <Ionicon name={leftImageSource} size={wp(7)} color={Colors.white} style={{ alignSelf: 'center' }} />
          )}
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginEnd: wp(3) }}>
          {isTrophy ? <Image source={IMAGES.WHITETROPHY} style={[{ width: wp(5), height: wp(5), resizeMode: 'contain', marginTop: wp(1), marginRight: wp(3) }]} /> : null}
          <Text style={[styles.titleContainer]}>{title}</Text>
        </View>
        <View style={{ alignItems: 'flex-end', justifyContent: 'center', alignItems: 'center' }}>
          {/* <TouchableOpacity onPress={rightHandler}> */}
          {isrighText ? <Text style={[styles.rightLableContainer]}>{rightLable}</Text> : null}
          {isRightImage ? (
            <Image source={rightImageSource} style={[styles.imageContainer]} />
          ) : (
            <Ionicon name={rightImageSource} size={wp(6)} color={Colors.white} onPress={rightHandler} />
          )}
          {/* </TouchableOpacity> */}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    paddingTop: Platform.OS === 'ios' ? hp(4) : hp(1),
    paddingHorizontal: wp(3),
    width: '100%'
  },
  mainContainer: {
    flexDirection: 'row',
    paddingVertical: wp(3)
  },
  titleContainer: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: FontSize.bigText,
    fontFamily: Fonts.BOLD
  },
  rightLableContainer: {
    flex: 1,
    fontSize: FontSize.normalText,
    marginTop: 9,
    color: Colors.white,
    textAlign: 'center',
    fontFamily: Fonts.BOLD
  },
  imageContainer: {
    width: wp(8),
    height: wp(8),
    resizeMode: 'contain'
  }
});
