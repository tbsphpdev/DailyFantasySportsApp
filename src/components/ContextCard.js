import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Colors, FontSize, IMAGES } from '../assets/constants';
import { Fonts } from '../assets/fonts/Fonts';
import { remainingTime } from '../utils/CommonFunction';

import { Timer } from '../components/Timer';

export const ContextCard = React.memo(({ item, width, isHorizontal, onPressHandler, isBottom }) => {
  const windowWidth = Dimensions.get('window').width - 10;

  // console.log('item::::::---------------------->', item.status);

  // Parse the ISO date string and calculate the time remaining
  const targetDate = new Date(item.date).getTime();
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;
  const targetTime = new Date(item.date);
  const hours = targetTime.getHours();
  const minutes = targetTime.getMinutes();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const options = { day: 'numeric', month: 'short' };

  const formattedHours = hours > 12 ? hours - 12 : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

  const [countdown, setCountdown] = useState(calculateCountdown(timeRemaining));

  useEffect(() => {
    if (item.status === 1) {
      const timer = setInterval(() => {
        const newTimeRemaining = targetDate - new Date().getTime();
        setCountdown(calculateCountdown(newTimeRemaining));

        if (newTimeRemaining <= 0) {
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    } else if (item.status === 3) {
      setCountdown('Live');
    } else {
      setCountdown('Completed');
    }
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
      const targetDate = new Date(item.date ?? item.date);
      return targetDate.toLocaleDateString('en-US', options);
    } else if (days === 1 || (days === 0 && hours >= 24)) {
      // Between 24 and 48 hours left, show "Tomorrow"
      return 'Tomorrow';
    } else {
      // Less than 24 hours left, show remaining time in hours and minutes
      return `${hours}h ${minutes}m left`;
    }
  }

  return (
    <TouchableOpacity style={[styles.cardContainer, { width: isHorizontal ? windowWidth - width : null, marginRight: isHorizontal ? wp(3) : wp(0) }]} onPress={onPressHandler}>
      <View style={{ flexDirection: 'row', padding: wp(4) }}>
        {/* Left side Container */}
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image source={{ uri: item?.hometeam?.image }} style={[styles.imageContainer]} />
          <Text style={[styles.playerNameContainer]}>{item?.hometeam?.short_title}</Text>
        </View>
        {/* Center side Container */}
        <View style={{ flex: 1 }}>
          <Text style={[styles.lableContainer, { color: Colors.darkGray, textAlign: 'center', fontSize: FontSize.normalmedText }]}>{item?.league?.name}</Text>
          <View style={{ paddingHorizontal: wp(1.5), alignItems: 'center', flex: 1, marginTop: wp(2) }}>
            {item.status === 1 || item.status === 3 ? (
              <Text style={[styles.lableContainer, { color: Colors.Black, textAlign: 'center', fontSize: FontSize.normalText, fontFamily: Fonts.BOLD }]}>{formattedTime}</Text>
            ) : (
              <View>
                {/* <Text style={[styles.lableContainer, { color: Colors.Black, textAlign: 'center', fontSize: FontSize.normalText, fontFamily: Fonts.BOLD }]}>{formattedTime}</Text> */}
                <Text style={[styles.lableContainer, { color: Colors.Black, textAlign: 'center', fontSize: FontSize.normalText, fontFamily: Fonts.BOLD }]}>
                  {targetTime.toLocaleDateString('en-US', options)}
                </Text>
              </View>
            )}

            {/* <Image source={IMAGES.VERSUS} style={{ width: wp(6), height: wp(6) }} /> */}
          </View>
          <View
            style={{
              backgroundColor: item.status === 3 ? Colors.red : item.status === 2 ? Colors.green : Colors.blue,
              padding: wp(2),
              width: wp(37),
              marginBottom: wp(-4),
              alignSelf: 'center',
              borderTopLeftRadius: wp(50),
              borderTopRightRadius: wp(50)
            }}>
            <Text style={{ color: Colors.white, textAlign: 'center', fontSize: FontSize.normalText, fontFamily: Fonts.BOLD }}>{countdown}</Text>
          </View>
        </View>
        {/* Right side Container */}
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Image source={{ uri: item?.awayteam?.image }} style={[styles.imageContainer]} />
          <Text style={[styles.playerNameContainer]}>{item?.awayteam?.short_title}</Text>
        </View>
      </View>
      {isBottom ? <View style={{ height: wp(0.2), backgroundColor: Colors.gray }} /> : null}
      {isBottom ? (
        <View style={{ flexDirection: 'row', padding: wp(2), justifyContent: 'space-between' }}>
          <Text style={[styles.lableContainer, { color: Colors.Black, textAlign: 'center', fontSize: FontSize.normalmedText }]}>
            {item?.total_contest?.length} Contest{item?.total_contest?.length > 1 ? 's' : ''} Joined
          </Text>
          <Text style={[styles.lableContainer, { color: Colors.Black, textAlign: 'center', fontSize: FontSize.normalmedText }]}>
            {item?.total_team} Team{item?.total_team > 1 ? 's' : ''}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    borderRadius: wp(3),
    flexDirection: 'column',
    marginBottom: wp(3)
  },
  playerNameContainer: {
    color: Colors.textBlack,
    fontFamily: Fonts.HEAVY,
    fontSize: FontSize.mediumText,
    paddingTop: wp(2)
  },
  imageContainer: {
    width: wp(12),
    height: wp(12),
    resizeMode: 'contain'
  },
  lableContainer: {
    color: Colors.Black,
    fontSize: FontSize.mediumText,
    fontFamily: Fonts.MEDIUM
  }
});
