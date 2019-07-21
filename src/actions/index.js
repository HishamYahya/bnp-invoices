import firebase from 'firebase';
import {
  SIGN_IN,
  INVOICE_FETCH_SUCCESS,
  CUSTOMERS_FETCH_SUCCESS,
  SIGN_IN_FAILED,
  SERVICES_FETCH_SUCCESS,
} from '../types';
import history from '../history';

export const fetchInvoices = () => async dispatch => {
  const response = await firebase
    .firestore()
    .collection('invoices')
    .get();

  const invoices = [];
  response.docs.forEach(doc => invoices.push(doc.data()));
  invoices.forEach(inv => {
    inv.time = new Date(inv.time.seconds * 1000).toJSON();
  });

  invoices.sort((a, b) => (a.time > b.time ? -1 : 1));

  if (response) {
    dispatch({
      type: INVOICE_FETCH_SUCCESS,
      payload: invoices,
    });
  }
};

export const fetchServices = () => async dispatch => {
  const response = await firebase
    .firestore()
    .collection('services')
    .get();

  const services = [];
  response.forEach(customer => services.push(customer.data()));

  dispatch({
    type: SERVICES_FETCH_SUCCESS,
    payload: services,
  });
};

export const fetchCustomers = () => async dispatch => {
  const response = await firebase
    .firestore()
    .collection('customers')
    .get();

  const customers = [];
  response.forEach(customer => customers.push(customer.data()));

  dispatch({
    type: CUSTOMERS_FETCH_SUCCESS,
    payload: customers,
  });
};

export const fetchEverything = () => async dispatch => {
  dispatch(fetchCustomers());
  dispatch(fetchInvoices());
  dispatch(fetchServices());
};

export const createService = (
  name,
  price,
  onSuccess = () => console.log('Success'),
  onFail = () => console.log('Error'),
) => (dispatch, getState) => {
  console.log(getState().services.map(obj => obj.id));
  firebase
    .firestore()
    .collection('services')
    .add({
      name,
      price,
      id: Math.max(...getState().services.map(obj => obj.id)) + 1,
    })
    .then(() => {
      onSuccess();
      dispatch(fetchServices());
    })
    .catch(onFail);
};

export const signIn = (email, password) => async dispatch => {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      dispatch({ type: SIGN_IN_FAILED });
      console.error(err);
    });
  if (response) {
    let isAdmin = true;
    dispatch(fetchInvoices());
    dispatch(fetchCustomers());
    await firebase
      .firestore()
      .collection('users')
      .get()
      .catch(() => (isAdmin = false));
    dispatch({
      type: SIGN_IN,
      payload: { user: response.user, isAdmin },
    });
    history.push('/');
  }
};
