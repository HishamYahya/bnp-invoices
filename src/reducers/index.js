import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';
import customersReducer from './customersReducer';

export default combineReducers({
  auth: authReducer,
  invoices: invoiceReducer,
  customers: customersReducer,
  form: formReducer,
});
