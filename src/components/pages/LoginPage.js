import '../../styles/LoginPage.css';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TextField,
  Box,
  Button,
  CssBaseline,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import { reduxForm, Field } from 'redux-form';
import { signIn } from '../../actions';

class LoginPage extends Component {
  onSubmit = formValues => {
    const { signIn } = this.props;
    if (formValues.email) {
      return signIn(formValues.email, formValues.password);
    }
    return null;
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
    const img = require('../../images/logo.jpeg');
    const { handleSubmit, pristine, submitting, invalid, auth } = this.props;
    return (
      <div className="container">
        <CssBaseline />
        <Box className="form">
          <img src={img} alt="logo" className="image" />
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
                // TODO: disable button
                // disabled={pristine || submitting || invalid}
              >
                {submitting ? '' : 'Login'}
                {submitting && <CircularProgress size={24} />}
              </Button>
              {auth.err ? (
                <Typography color="error">Sign in failed</Typography>
              ) : (
                ''
              )}
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
LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
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
