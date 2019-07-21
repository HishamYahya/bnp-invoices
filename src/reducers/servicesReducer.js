import { SERVICES_FETCH_SUCCESS, SIGN_OUT } from '../types';

export default (state = [], action) => {
  switch (action.type) {
    case SERVICES_FETCH_SUCCESS:
      return action.payload;

    case SIGN_OUT:
      return [];

    default:
      return state;
  }
};
