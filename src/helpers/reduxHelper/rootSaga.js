import { all } from 'redux-saga/effects';
import { AuthSaga } from '../../screens/authScreen/Redux/sagas';
import { HomeSaga } from '../../screens/homeScreens/Redux/sagas';

export default function* rootSaga() {
  yield all([AuthSaga(), HomeSaga()]);
}
