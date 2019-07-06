import '../styles/LoginPage.css';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { TextField, Box, Button } from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { signIn } from '../actions';

class LoginPage extends Component {
  onSubmit = formValues => {
    if (formValues.email) {
      return this.props.signIn(formValues.email, formValues.password);
    }
  };

  renderTextField = ({
    input,
    label,
    meta: { touched, error, active },
    ...custom
  }) => {
    const isError = error && touched && !active;

    return (
      <Fragment>
        <TextField
          id="outlined-full-width"
          label={label}
          error={isError}
          fullWidth
          required
          margin="normal"
          variant="outlined"
          {...input}
          {...custom}
        />
      </Fragment>
    );
  };

  render() {
    console.log(this.props);
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    return (
      <div className="container">
        <Box className="form">
          <img src={require('../images/logo.jpeg')} alt="logo" />
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              label="Email"
              name="email"
              component={this.renderTextField}
            />
            <Field
              label="Password"
              name="password"
              component={this.renderTextField}
            />
            <Box>
              <Button
                variant="contained"
                size="large"
                onClick={this.onSubmit}
                type="submit"
                disabled={pristine || submitting || invalid}
              >
                {submitting ? 'Loading...' : 'Login'}
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.email) errors.email = 'Please enter a valid email';
  if (!formValues.password) errors.password = 'Please enter a password';
  return errors;
};

const formComponent = reduxForm({
  form: 'loginForm',
  validate,
  initialValues: {
    email: 'a@a.com',
    password: '11111111',
  },
})(LoginPage);

const mapStateToProps = state => ({ auth: state.auth });

export default connect(
  mapStateToProps,
  { signIn },
)(formComponent);
