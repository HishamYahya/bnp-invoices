import React, { Component } from 'react';
import '../styles/LoginPage.css';
import { TextField, Box, Button } from '@material-ui/core';

export default class LoginPage extends Component {
  componentDidMount() {
    window.addEventListener('keypress', event => {
      if (event.keyCode === 13) this.onSubmit();
    });
  }

  onSubmit = () => {
    console.log('submitted');
  };

  render() {
    return (
      <div className="container">
        <Box className="form">
          <img src={require('../images/logo.jpeg')} alt="logo" />
          <Box>
            <TextField
              id="outlined-full-width"
              label="Namesdf"
              fullWidth
              value="hisdf"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-name"
              label="Name"
              value="hi"
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
