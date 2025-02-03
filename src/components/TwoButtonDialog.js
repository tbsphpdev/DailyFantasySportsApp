import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, FontSize } from '../assets/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../assets/fonts/Fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BlueButton } from './BlueButton';

const TwoButtonDialog = (props) => {
  let state = props.state;
  const yseHandler = props.yseHandler;
  let noHandler = props.noHandler;
  let title = props.title;
  let des = props.description;

  const YesButtonHandler = () => {
    yseHandler();
  };
  const NoButtonHandler = () => {
    noHandler();
  };

  return (
    <RBSheet
      ref={state}
      closeOnDragDown={false}
      closeOnPressMask={false}
      height={hp(25)}
      customStyles={{
        wrapper: { backgroundColor: 'rgba(29, 37, 45, 0.8)' },
        draggableIcon: { backgroundColor: '#000' },
        container: { borderTopLeftRadius: wp(3), borderTopRightRadius: wp(3) }
      }}>
      <View>
        <View style={[styles.titleRow]}>
          <Text style={[styles.text]}>{title}</Text>
        </View>
        <View style={[{ alignItems: 'center', paddingVertical: hp(2), backgroundColor: Colors.white }]}>
          <Text style={[styles.DateText]}>{des}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: wp(5) }}>
          <View style={{ flex: 1, marginRight: wp(2.5) }}>
            <TouchableOpacity style={[styles.buttonContainer]} onPress={() => NoButtonHandler()}>
              <Text style={[styles.labTextContainer]}>No</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, marginLeft: wp(2.5) }}>
            <BlueButton title={'Yes'} onPressHandler={() => YesButtonHandler()} />
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

export default TwoButtonDialog;

const styles = StyleSheet.create({
  titleRow: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: Colors.blue,
    paddingHorizontal: wp(10),
    paddingVertical: hp(2),
    alignItems: 'center'
  },
  text: {
    color: Colors.white,
    fontFamily: Fonts.BOLD,
    fontSize: FontSize.bigText,
    alignItems: 'center'
  },
  DateText: {
    color: Colors.textBlack,
    fontFamily: Fonts.REGULAR,
    fontSize: FontSize.bigText,
    alignItems: 'center'
  },
  buttonContainer: {
    backgroundColor: Colors.lightgray,
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
