import { INVOICE_FETCH_SUCCESS, SIGN_OUT } from '../types';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INVOICE_FETCH_SUCCESS:
      return action.payload;
    case SIGN_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
