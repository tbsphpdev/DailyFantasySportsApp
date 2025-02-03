import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';
import { saveLoginData, errorLoginData } from './actions';
import { ConstantType } from './constants';
import { LOGIN_API, OTP_API, OTP_RESEND_MOBILE_API, REGISTER_API } from '../../../helpers/ApiRoutes';

/* LOGIN */
function* loginData({ payload }) {
  try {
    const response = yield call(axios.post, `${LOGIN_API}`, payload.payload);
    payload.callback(response?.data);
    yield put(saveLoginData(response?.data));
  } catch (error) {
    payload.callback(error?.response);
    yield put(errorLoginData(error?.response));
  }
}

/* Registration */
function* registrationData({ payload }) {
  try {
    const response = yield call(axios.post, `${REGISTER_API}`, payload.payload);
    payload.callback(response?.data);
  } catch (error) {
    payload.callback(error?.response);
  }
}

/* OTP Verify */
function* otpVerify({ payload }) {
  try {
    console.log('URL:::', OTP_API, 'payload:::', payload?.valueObject?.data, 'Header::::', payload?.valueObject?.headers);
    const response = yield call(axios.post, `${OTP_API}`, payload?.valueObject?.data, { headers: { Authorization: payload?.valueObject?.headers } });
    payload.callback(response?.data);
  } catch (error) {
    payload.callback(error?.response);
  }
}

/* OTP Verify */
function* OTP_ResendMobile({ payload }) {
  try {
    const response = yield call(axios.get, `${OTP_RESEND_MOBILE_API}`, { headers: { Authorization: payload?.valueObject?.headers } });
    payload.callback(response?.data);
  } catch (error) {
    payload.callback(error?.response);
  }
}

export function* AuthSaga() {
  yield takeLatest(ConstantType.LOGIN, loginData);
  yield takeLatest(ConstantType.REGISTRATION, registrationData);
  yield takeLatest(ConstantType.OTP_VERIFY, otpVerify);
  yield takeLatest(ConstantType.OTP_ResendMobile, OTP_ResendMobile);
}
