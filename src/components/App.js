import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import firebase from 'firebase';
import LoginPage from './LoginPage';
import MainPage from './MainPage';
import AppBar from './AppBar';
import history from '../history';

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

class App extends Component {
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
      <Router history={history}>
        <Switch>
          <PrivateRoute
            path="/login"
            component={LoginPage}
            redirectTo="/"
            condition={!this.props.isSignedIn}
          />
          <PrivateRoute
            path="/"
            exact
            component={MainPage}
            condition={this.props.isSignedIn}
          />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ isSignedIn: state.auth.isSignedIn });

export default connect(mapStateToProps)(App);
