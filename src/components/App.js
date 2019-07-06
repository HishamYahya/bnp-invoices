import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import firebase from 'firebase';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import AppBar from './AppBar';

const PrivateRoute = ({
  component: Component,
  condition,
  redirectTo = '/login',
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        return condition ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        );
      }}
    />
  );
};

export default class App extends Component {
  state = { authed: false };
  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDengBlfUeb4t4QSagVpQKNVNh2OOEGHZg',
      authDomain: 'bnp-invoices.firebaseapp.com',
      databaseURL: 'https://bnp-invoices.firebaseio.com',
      projectId: 'bnp-invoices',
      storageBucket: '',
      messagingSenderId: '1001420974250',
      appId: '1:1001420974250:web:2b984fd9d99b8bbb',
    };
    firebase.initializeApp(firebaseConfig);
  }

  render() {
    return (
      <BrowserRouter>
        <AppBar />
        <Switch>
          <PrivateRoute
            path="/login"
            component={LoginPage}
            redirectTo="/"
            condition
          />
          <PrivateRoute path="/" exact component={MainPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
