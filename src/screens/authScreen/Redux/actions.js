import { ConstantType } from './constants';

//USER LOGIN
export const login = (payload) => {
  return {
    type: ConstantType.LOGIN,
    payload
  };
};

export const saveLoginData = (payload) => {
  return {
    type: ConstantType.SAVE_LOGIN_DATA,
    payload
  };
};

export const errorLoginData = (payload) => {
  return {
    type: ConstantType.ERROR_LOGIN,
    payload
  };
};
//Registration LOGIN
export const registration = (payload) => {
  return {
    type: ConstantType.REGISTRATION,
    payload
  };
};

//OTP Verify LOGIN
export const otpVerify = (payload) => {
  return {
    type: ConstantType.OTP_VERIFY,
    payload
  };
};

//OTP_ResendMobile LOGIN
export const OTP_ResendMobile = (payload) => {
  return {
    type: ConstantType.OTP_ResendMobile,
    payload
  };
};
