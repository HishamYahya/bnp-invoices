import firebase from 'firebase';
import { SIGN_IN } from '../types';

export const signIn = (email, password) => async dispatch => {
  const response = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);

  //TODO: admin list in database

  const isAdmin =
    response.user.uid === 'YKUBEbSTfgPR0Jwd1N6n29CAG3b2' ? true : false;
  console.log(isAdmin);
  dispatch({
    type: SIGN_IN,
    payload: { uid: response.user.uid, isAdmin: isAdmin },
  });
};
