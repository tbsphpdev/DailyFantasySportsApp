import React from 'react';
import { StyleSheet, View, Image, Modal } from 'react-native';
import { IMAGES } from '../assets/constants';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const LoaderProgress = (props) => {
  const { loading, ...attributes } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {
        // console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        {/* <Image style={styles.activityIndicatorWrapper} source={IMAGES.LOADER} /> */}
        <LottieView source={require('../assets/constants/lottieLoader3.json')} autoPlay loop style={styles.activityIndicatorWrapper} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    height: wp(40),
    width: wp(40),
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default LoaderProgress;
