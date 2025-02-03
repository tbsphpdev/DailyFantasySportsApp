import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreens/HomeScreen';
import MyMatches from '../screens/homeScreens/MyMatches';
import More from '../screens/homeScreens/More';
import Wallet from '../screens/homeScreens/Wallet';
import AddMoney from '../screens/homeScreens/AddMoney';
import AddMoneyPayment from '../screens/homeScreens/AddMoneyPayment';
import Profile from '../screens/homeScreens/Profile';
import TransactionHistory from '../screens/homeScreens/TransactionHistory';
import MatchDetails from '../screens/homeScreens/MatchDetails';
import Notification from '../screens/homeScreens/Notification';
import InviteShare from '../screens/homeScreens/InviteShare';
import MyTeams from '../screens/homeScreens/MyTeams';
import MyTeamReview from '../screens/homeScreens/MyTeamReview';
import F_MyTeamReview from '../screens/homeScreens/FootballScreen/F_MyTeamReview';
import EditProfile from '../screens/homeScreens/EditProfile';
import CaptionSelection from '../screens/homeScreens/CaptionSelection';
import CreateTeam from '../screens/homeScreens/CreateTeam';
import LeaderboardPrizeBreakup from '../screens/homeScreens/LeaderboardPrizeBreakup';
import F_LeaderBoard from '../screens/homeScreens/FootballScreen/F_LeaderBoard';
import AboutUs from '../screens/homeScreens/AboutUs';
import PrivacyPolicy from '../screens/homeScreens/PrivacyPolicy';
import TermsConditions from '../screens/homeScreens/TermsConditions';
import HowToPlay from '../screens/homeScreens/HowToPlay';
import UserSupport from '../screens/homeScreens/UserSupport';
import Contests from '../screens/homeScreens/Contests';
import MyTeamContests from '../screens/homeScreens/MyTeamContests';
import MyContests from '../screens/homeScreens/MyContests';
import WithdrawMoney from '../screens/homeScreens/WithdrawMoney';
import Switch from '../screens/homeScreens/Switch';
import FantasyPointsSystem from '../screens/homeScreens/FantasyPointsSystem';
import BottomViewStack from './BottomViewStack';
import CheckoutScreen from '../screens/homeScreens/CheckoutScreen';

const HStack = createNativeStackNavigator();

const HomeStack = () => {
  const hideTabBarRoutes = [
    'AddMoney',
    'AddMoneyPayment',
    'Profile',
    'TransactionHistory',
    'MatchDetails',
    'Notification',
    'InviteShare',
    'MyTeams',
    'MyTeamReview',
    'F_MyTeamReview',
    'EditProfile',
    'CaptionSelection',
    'CreateTeam',
    'LeaderboardPrizeBreakup',
    'F_LeaderBoard',
    'AboutUs',
    'PrivacyPolicy',
    'TermsConditions',
    'HowToPlay',
    'UserSupport',
    'Contests',
    'MyContests',
    'MyTeamContests',
    'WithdrawMoney',
    'FantasyPointsSystem',
    'Switch'
  ];
  return (
    <View style={{ flex: 1 }}>
      <HStack.Navigator initialRouteName="HomeScreen">
        <HStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <HStack.Screen name="MyMatches" component={MyMatches} options={{ headerShown: false }} />
        <HStack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
        <HStack.Screen name="More" component={More} options={{ headerShown: false }} />

        <HStack.Screen name="AddMoney" component={AddMoney} options={{ headerShown: false }} />
        <HStack.Screen name="AddMoneyPayment" component={AddMoneyPayment} options={{ headerShown: false }} />
        <HStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <HStack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }} />
        <HStack.Screen name="MatchDetails" component={MatchDetails} options={{ headerShown: false }} />
        <HStack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
        <HStack.Screen name="InviteShare" component={InviteShare} options={{ headerShown: false }} />
        <HStack.Screen name="MyTeams" component={MyTeams} options={{ headerShown: false }} />
        <HStack.Screen name="MyTeamReview" component={MyTeamReview} options={{ headerShown: false }} />
        <HStack.Screen name="F_MyTeamReview" component={F_MyTeamReview} options={{ headerShown: false }} />
        <HStack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
        <HStack.Screen name="CaptionSelection" component={CaptionSelection} options={{ headerShown: false }} />
        <HStack.Screen name="CreateTeam" component={CreateTeam} options={{ headerShown: false }} />
        <HStack.Screen name="LeaderboardPrizeBreakup" component={LeaderboardPrizeBreakup} options={{ headerShown: false }} />
        <HStack.Screen name="F_LeaderBoard" component={F_LeaderBoard} options={{ headerShown: false }} />
        <HStack.Screen name="AboutUs" component={AboutUs} options={{ headerShown: false }} />
        <HStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
        <HStack.Screen name="TermsConditions" component={TermsConditions} options={{ headerShown: false }} />
        <HStack.Screen name="HowToPlay" component={HowToPlay} options={{ headerShown: false }} />
        <HStack.Screen name="UserSupport" component={UserSupport} options={{ headerShown: false }} />
        <HStack.Screen name="Contests" component={Contests} options={{ headerShown: false }} />
        <HStack.Screen name="MyContests" component={MyContests} options={{ headerShown: false }} />
        <HStack.Screen name="MyTeamContests" component={MyTeamContests} options={{ headerShown: false }} />
        <HStack.Screen name="WithdrawMoney" component={WithdrawMoney} options={{ headerShown: false }} />
        <HStack.Screen name="FantasyPointsSystem" component={FantasyPointsSystem} options={{ headerShown: false }} />
        <HStack.Screen name="Switch" component={Switch} options={{ headerShown: false }} />
        <HStack.Screen name="CheckoutScreen" component={CheckoutScreen} options={{ headerShown: false }} />
        {/* <HStack.Screen name="BottomViewStack" component={BottomViewStack} options={{ headerShown: false }} /> */}
      </HStack.Navigator>
    </View>
  );
};

export default HomeStack;
