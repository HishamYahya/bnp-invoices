import firebase from 'firebase';
import { SIGN_IN, FETCH_SUCCESS, CHANGE_USER, SIGN_OUT } from '../types';
import history from '../history';

export const fetchInvoices = () => async dispatch => {
  const response = await firebase
    .firestore()
    .collection('invoices')
    .get();

  const invoices = [];
  response.docs.forEach(doc => invoices.push(doc.data()));
  invoices.forEach(
    inv => (inv.time = new Date(inv.time.seconds * 1000).toJSON()),
  );
  if (response)
    dispatch({
      type: FETCH_SUCCESS,
      payload: invoices,
    });
};

export const signIn = (email, password) => async dispatch => {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  //TODO: admin list in database

  if (response) {
    let isAdmin = true;
    dispatch(fetchInvoices());
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
