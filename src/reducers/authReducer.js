import { SIGN_IN, SIGN_OUT } from '../types';

const INITIAL_STATE = {
  isSignedIn: false,
  isAdmin: false,
  user: null,
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
    default:
      return state;
  }
};
