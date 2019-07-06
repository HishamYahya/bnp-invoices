import { SIGN_IN } from '../types';

const INITIAL_STATE = {
  admin: false,
  isSignedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        uid: action.payload.uid,
        isSignedIn: true,
        admin: action.payload.isAdmin,
      };
    default:
      return state;
  }
};
