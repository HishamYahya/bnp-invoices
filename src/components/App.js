import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
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
  render() {
    return (
      <BrowserRouter>
        <AppBar />
        <Switch>
          <PrivateRoute path="/login" component={LoginPage} redirectTo="/" />
          <PrivateRoute condition path="/" exact component={MainPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
