import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, RefreshControl } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ContextCard, ThemeHeader } from '../../components';
import { Colors, FontSize, IMAGES } from '../../assets/constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Fonts } from '../../assets/fonts/Fonts';
import { Offers, footballMatchContests } from '../../utils/JSONData';
import { AUTHTOKEN, GET_SPORTS_API, GET_UPCOMING_MATCHES_API, MY_UPCOMING_MATCHES_API, USERDETAILS, GET_PROFILE_API } from '../../helpers/ApiRoutes';
import LocalStorage from '../../utils/LocalStorage';
import LoaderProgress from '../../components/LoaderProgress';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { myUpcomingMatches, getSports, getUpcomingMatches, getProfile } from '../homeScreens/Redux/actions';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { footballMatches } from '../../utils/JSONData';
// import { GET_PROFILE_API } from '../../helpers/ApiRoutes';
import { AuthContext } from '../../hook/AuthContext';
import NetInfo from '@react-native-community/netinfo';
import Util from '../../utils/Util';

const HomeScreen = (props) => {
  const navigation = props.navigation;
  const isFocused = useIsFocused();
  const [authToken, setAuthToken] = useState('');
  const [userData, setUserData] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [leagusData, setLeagusData] = useState([]);
  const [card, setCard] = useState([]);
  const [myMatch, setMyMatch] = useState([]);
  const [showSelectionContainer, setShowSelectionContainer] = useState(true);
  const [sportsKey, setSportsKey] = useState('');
  const [sportsId, setSportsId] = useState('');
  const { userDetails } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // console.log('2');
    // console.log('qwertu1111111111111');
    // getProfileApiCall(authToken);
    handleData();
    // getUpcomingMatchesAPICall(authToken, sportsId);
    // myUpcomingMatchesApiCall(authToken, sportsId);
  }, [props?.route?.params]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log('1');
  //     console.log('qwertu1111111111111', authToken, sportsId);
  //     // handleData();
  //     getUpcomingMatchesAPICall(authToken, sportsId);
  //     myUpcomingMatchesApiCall(authToken, sportsId);
  //   }, [sportsId])
  // );

  const handleData = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        LocalStorage.getValue(AUTHTOKEN).then((data) => {
          if (data) {
            setAuthToken(data);
            getSportsAPICall(data);
            getProfileApiCall(data);
          }
        });
      } else {
        Util.errorToast('Please check your internet connection.');
      }
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      getUpcomingMatchesAPICall(authToken, sportsId);
      myUpcomingMatchesApiCall(authToken, sportsId);
      setIsRefreshing(false);
    }, 1000);
  };

  const BackHandler = () => {
    //navigation.goBack();
    // navigation.navigate('Profile');
  };
  const rightHandler = () => {
    navigation.navigate('Notification');
    //navigation.goBack();
  };

  const myMatchesHandler = () => {
    const selectedSportsID = leagusData.find((item) => item.isSelected)?._id;
    navigation.navigate('MyMatches', { selectedSportsID: selectedSportsID, hideSelectionContainer: true, onData: backData });
  };

  const backData = () => {
    console.log('123');
    getUpcomingMatchesAPICall(authToken, sportsId);
    myUpcomingMatchesApiCall(authToken, sportsId);
  };

  const matchesDetailHandler = (selectValue) => {
    // Check if sportsId is 2, then include footballMatchContests in route params
    if (selectValue?.payout === null || selectValue?.payout === '') {
      if (selectValue?.sportsId === 2) {
        navigation.navigate('MatchDetails', {
          gameData: selectValue,
          onData: backData
        });
      } else {
        navigation.navigate('MatchDetails', { gameData: selectValue, onData: backData });
      }
    } else {
      if (selectValue?.sportsId === 2) {
        navigation.navigate('MatchDetails', {
          gameData: selectValue,
          onData: backData
        });
      } else {
        navigation.navigate('MatchDetails', { gameData: selectValue, onData: backData });
      }
    }
  };

  const getSportsAPICall = (data) => {
    setIsLoader(true);
    let valueObject = {
      url: `${GET_SPORTS_API}`,
      headers: `Bearer ${data}`
    };

    props.getSports({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        // console.log('getSportsAPICall Home:::::::', res);
        if (res?.status === 200) {
          // console.log('getSportsAPICall Home data:::::::', res?.data);
          bindDataTopMenu(res?.data);
          setSportsId(res?.data[0]._id);
          getUpcomingMatchesAPICall(data, res?.data[0]._id);
          myUpcomingMatchesApiCall(data, res?.data[0]._id);
        } else {
          console.log('getSportsAPICall Home Error :::::>>>', res?.msg);
        }
      }
    });
  };

  const bindDataTopMenu = (response) => {
    let topMenuValue = response.map((data, index) => {
      if (index === 0) {
        data['isSelected'] = true;
      } else {
        data['isSelected'] = false;
      }
      return data;
    });
    setLeagusData(topMenuValue);
  };

  const selectLeagusMenu = (selectValue) => {
    // console.log('select--------------------------->', selectValue?._id);
    let tempArray = leagusData.map((data, index) => {
      if (data.sports_key === selectValue.sports_key) {
        data['isSelected'] = true;
        setSportsKey(data.sports_key); // Update the sportsKey when a different item is selected
      } else {
        data['isSelected'] = false;
      }
      return data;
    });
    setLeagusData(tempArray);
    // Handle data based on sportsKey
    if (selectValue.sports_key === 'football') {
      setSportsId(selectValue._id);
      getUpcomingMatchesAPICall(authToken, selectValue._id);
      myUpcomingMatchesApiCall(authToken, selectValue._id);
    } else if (selectValue.sports_key === 'cricket') {
      setSportsId(selectValue._id);
      getUpcomingMatchesAPICall(authToken, selectValue._id);
      myUpcomingMatchesApiCall(authToken, selectValue._id);
    }
  };

  const getUpcomingMatchesAPICall = (data, id) => {
    setIsLoader(true);
    let valueObject = {
      url: `${GET_UPCOMING_MATCHES_API}${id}`,
      headers: `Bearer ${data}`
    };
    console.log('id:::::-------------------->>>>>>>', valueObject);
    props.getUpcomingMatches({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        console.log('getUpcomingMatchesAPICall Home:::::::', res);
        if (res?.status === 200) {
          console.log('getUpcomingMatchesAPICall Home data:::::::', res?.data);
          setCard(res?.data);
        } else {
          console.log('getUpcomingMatchesAPICall Error data:::::::', res?.data);
          // Handle API error
        }
      }
    });
  };

  const myUpcomingMatchesApiCall = (data, selectedSportsId) => {
    setIsLoader(true);
    let valueObject = {
      url: `${MY_UPCOMING_MATCHES_API}${selectedSportsId}`,
      headers: `Bearer ${data}`
    };
    props.myUpcomingMatches({
      valueObject,
      callback: (res) => {
        setIsLoader(false);
        if (res?.status === 200) {
          console.log('myUpcomingMatchesApiCall Homescreen data:::::::', res);
          if (selectedSportsId === 1) {
            setMyMatch(res?.data);
          } else if (selectedSportsId === 2) {
            setMyMatch(res?.data);
          }
        } else {
          console.log('myUpcomingMatchesApiCall Homescreen Error :::::>>>', res?.msg);
          Util.errorToast(res?.msg);
          setMyMatch([]);
        }
      }
    });
  };

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: Colors.backgroundColor }}>
      <LoaderProgress loading={isLoader} />
      <View style={{ flex: 1 }}>
        <ThemeHeader
          title={'Fantasy Sports'}
          isLeftImage={true}
          isTrophy={true}
          // leftImageSource={userData?.profilepic === '' ? IMAGES.USER_PLACEHOLDER : { uri: userData?.profilepic }}
          leftHandler={BackHandler}
          rightImageSource={'notifications-outline'}
          rightHandler={rightHandler}
        />

        {/*  Top Tabbar Container */}
        <View style={[styles.topTabBarContainer]}>
          {showSelectionContainer && (
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={leagusData}
              horizontal={true}
              renderItem={({ item, index }) => (
                <TouchableOpacity onPress={() => selectLeagusMenu(item)} style={[{ marginHorizontal: wp(1) }]}>
                  <View style={{ paddingHorizontal: wp(2) }}>
                    <Ionicon
                      name={item?.sports_key === 'cricket' ? 'md-tennisball' : 'ios-football'}
                      size={wp(8)}
                      color={item?.isSelected ? Colors.blue : Colors.gray}
                      style={{ alignSelf: 'center' }}
                    />
                    <Text style={[styles.priceContainer, { color: item?.isSelected ? Colors.blue : Colors.textBlack }]}>{item?.sports_key}</Text>
                  </View>
                  <View style={[styles.tabSelectedContainer, { backgroundColor: item?.isSelected ? Colors.blue : Colors.white }]} />
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}>
          <View style={{ marginHorizontal: wp(3), marginVertical: wp(5) }}>
            {/*  My Matches Container */}
            {myMatch.length > 0 && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.lableContainer]}>My Matches</Text>
                <TouchableOpacity onPress={() => myMatchesHandler()}>
                  <Text style={[styles.lableContainer, { color: Colors.blue, fontSize: FontSize.normalText }]}>View All</Text>
                </TouchableOpacity>
              </View>
            )}
            {/* Render different UI based on sportsKey */}
            {/* // Render UI for cricket matches */}
            <FlatList
              showsHorizontalScrollIndicator={false}
              style={{ marginTop: wp(3) }}
              data={myMatch}
              horizontal={true}
              renderItem={({ item }) => <ContextCard item={item} width={45} isHorizontal={true} onPressHandler={() => matchesDetailHandler(item)} isBottom={true} />}
            />
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={Offers}
              horizontal={true}
              renderItem={({ item }) => <Image source={item.img} style={{ width: wp(70), height: wp(32), marginRight: wp(3), borderRadius: wp(3) }} />}
            />
            {/* Selecte Option Matches Container */}
            {card.length > 0 ? (
              <Text style={[styles.lableContainer, { marginTop: wp(3), marginBottom: wp(3) }]}>Select a Match</Text>
            ) : (
              <View>
                <Image source={IMAGES.PLAYERS} style={{ marginTop: wp(10), marginBottom: wp(3), alignSelf: 'center', width: wp(25), height: wp(25), resizeMode: 'contain' }} />
                <Text style={[styles.lableContainer, { marginBottom: wp(3), textAlign: 'center' }]}>No Matches Found</Text>
              </View>
            )}
            {card &&
              card.map((item, index) => {
                return <ContextCard key={index} width={5} item={item} onPressHandler={() => matchesDetailHandler(item)} isBottom={false} />;
              })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaProvider>
  );
};

// export default HomeScreen;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getSports, getUpcomingMatches, myUpcomingMatches, getProfile }, dispatch);
};

export default connect(null, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  lableContainer: {
    color: Colors.Black,
    fontSize: FontSize.mediumText,
    fontFamily: Fonts.BOLD
  },
  cardImage: {
    alignSelf: 'center',
    width: wp(7),
    height: wp(7),
    resizeMode: 'contain'
  },
  priceContainer: {
    fontFamily: Fonts.MEDIUM,
    fontSize: FontSize.mediumText,
    alignSelf: 'center',
    marginTop: wp(1)
  },
  tabSelectedContainer: {
    marginTop: wp(3),
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
    height: wp(1),
    width: '100%'
  },
  topTabBarContainer: {
    paddingLeft: wp(3),
    paddingTop: wp(3),
    backgroundColor: Colors.white
  }
});
