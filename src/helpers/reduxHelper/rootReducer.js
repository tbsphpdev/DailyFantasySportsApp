import { combineReducers } from 'redux';
import { AuthRed } from '../../screens/authScreen/Redux/reducers';
import { HomeRed } from '../../screens/homeScreens/Redux/reducers';
import PLAYER_SLICE from '../PlayerRedux/PlayerSlice';
import F_PLAYER_SLICE from '../PlayerRedux/F_PlayerSlice';

const rootReducer = combineReducers({
  AuthReducer: AuthRed,
  HomeReducer: HomeRed,
  player: PLAYER_SLICE,
  f_player: F_PLAYER_SLICE
});

export default rootReducer;
