import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import invoiceReducer from './invoiceReducer';
import customersReducer from './customersReducer';
import servicesReducer from './servicesReducer';

export default combineReducers({
  auth: authReducer,
  invoices: invoiceReducer,
  customers: customersReducer,
  services: servicesReducer,
  form: formReducer,
});
