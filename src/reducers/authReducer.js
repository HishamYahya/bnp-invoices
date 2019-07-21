import { SIGN_IN, SIGN_OUT, SIGN_IN_FAILED } from '../types';

const INITIAL_STATE = {
  isSignedIn: false,
  isAdmin: false,
  user: null,
  err: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        user: action.payload.user,
        isSignedIn: true,
        isAdmin: action.payload.isAdmin,
      };
    case SIGN_OUT:
      return INITIAL_STATE;
    case SIGN_IN_FAILED:
      return { ...INITIAL_STATE, err: true };
    default:
      return state;
  }
};
