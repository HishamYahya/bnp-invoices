import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { TextField, Box, Button } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';

export default class LoginPage extends Component {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    window.addEventListener('keypress', event => {
      if (event.keyCode === 13) this.onSubmit();
    });
  }

  onSubmit = () => {
    console.log(this.state);
  };

  render() {
    return (
      <div className="container">
        <Box className="form">
          <img src={require('../images/logo.jpeg')} alt="logo" />
          <Box>
            <TextField
              id="outlined-full-width"
              label="Email"
              fullWidth
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Name"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" size="large" onClick={this.onSubmit}>
              Login
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}
