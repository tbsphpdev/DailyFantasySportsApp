import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, FontSize } from '../assets/constants';
import { Fonts } from '../assets/fonts/Fonts';

export const Timer = ({ displayDate, displayTime }) => {
  const targetDate = new Date(displayDate ?? displayTime).getTime();
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  const [countdown, setCountdown] = useState(calculateCountdown(timeRemaining));

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeRemaining = targetDate - new Date().getTime();
      setCountdown(calculateCountdown(newTimeRemaining));

      if (newTimeRemaining <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  function calculateCountdown(timeRemaining) {
    if (timeRemaining <= 0) {
      return 'Live';
    }

    const seconds = Math.floor((timeRemaining / 1000) % 60);
    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    if (days >= 2) {
      // More than 48 hours left, show date and month
      const targetDate = new Date(displayDate ?? displayTime);
      const options = { month: 'short', day: 'numeric' };
      return targetDate.toLocaleDateString('en-US', options);
    } else if (days === 1 || (days === 0 && hours >= 24)) {
      // Between 24 and 48 hours left, show "Tomorrow"
      return 'Tomorrow';
    } else {
      // Less than 24 hours left, show remaining time in hours and minutes
      return `${hours}H ${minutes}M left`;
    }
  }

  return <Text style={[styles.lableContainer, { color: Colors.white, fontFamily: Fonts.BOLD, fontSize: FontSize.normalmedText }]}>{countdown}</Text>;
};

const styles = StyleSheet.create({
  lableContainer: {
    color: Colors.Black,
    fontSize: FontSize.mediumText,
    fontFamily: Fonts.MEDIUM
  }
});
