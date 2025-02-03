import { ConstantType } from './constants';

const AUTHENTICATION_STATE = {
  userSignInData: null,
  errorSignInData: null
};

export const AuthRed = (state = AUTHENTICATION_STATE, action) => {
  switch (action.type) {
    //user program session Get
    case ConstantType.SAVE_LOGIN_DATA:
      return {
        ...state,
        userSignInData: action.payload
      };
    case ConstantType.ERROR_LOGIN:
      return {
        ...state,
        errorSignInData: action.payload
      };

    default:
      return state;
  }
};
