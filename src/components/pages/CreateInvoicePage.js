import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { ArrowBackIos } from '@material-ui/icons';
import {
  IconButton,
  TextField,
  Grid,
  makeStyles,
  Paper,
} from '@material-ui/core';
import moment from 'moment';
import history from '../../history';
import { fetchEverything } from '../../actions';
import SelectCustomerField from '../SelectCustomerField';
import { withStyles } from '@material-ui/styles';
import SelectServiceField from '../SelectServiceField';

const styles = theme => ({
  root: {
    flexShrink: 1,
  },
  TextField: {},
  Paper: {
    padding: 20,
    margin: 5,
  },
});

class CreateInvoicePage extends Component {
  state = { servicePrice: null, invoiceId: 0 };

  componentWillMount() {
    const { fetchEverything, invoices } = this.props;
    fetchEverything();
    let max = -1;
    invoices.forEach(invoice => {
      if (invoice.id > max) max = invoice.id;
    });
    this.setState({ invoiceId: max + 1 });
  }

  renderTextField = ({
    input,
    label,
    meta: { touched, error, active },
    inputProps,
  }) => {
    const isError = error && touched && !active;

    const { classes } = this.props;

    return (
      <Fragment>
        <TextField
          className={classes.TextField}
          label={label}
          error={isError}
          // required
          fullWidth
          {...input}
          {...inputProps}
        />
      </Fragment>
    );
  };

  onSubmit = formValues => {};

  onServiceSelect = servicePrice => {
    this.setState({ servicePrice });
  };

  render() {
    const {
      handleSubmit,
      classes,
      auth: { isAdmin },
    } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <IconButton onClick={() => history.push('/invoices')}>
            <ArrowBackIos />
          </IconButton>
        </div>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Grid container direction="row" wrap="wrap">
              <Grid item xs={6}>
                <Paper className={classes.Paper}>
                  <Grid container spacing={1} direction="column">
                    <Grid item xs={8}>
                      <Field
                        type="text"
                        name="invoiceId"
                        label="Invoice ID#"
                        margin="normal"
                        component={this.renderTextField}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        type="number"
                        name="5"
                        label="Price"
                        margin="normal"
                        component={this.renderTextField}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <Paper className={classes.Paper}>
                  <Grid container spacing={1} direction="column">
                    <Grid item xs={8}>
                      <Field
                        type="text"
                        name="invoiceId"
                        label="Invoice ID#"
                        margin="normal"
                        component={this.renderTextField}
                        inputProps={{
                          value: this.state.invoiceId,
                          onChange: e => this.setState({ invoiceId: e.value }),
                          fullWidth: true,
                          type: 'number',
                          min: '0',
                          disabled: isAdmin,
                        }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Field
                        type="number"
                        name="price"
                        label="Price"
                        margin="normal"
                        component={this.renderTextField}
                        inputProps={{
                          value: this.state.servicePrice,
                          onChange: e =>
                            this.setState({ servicePrice: e.value }),
                          fullWidth: true,
                          type: 'number',
                          min: '0',
                          disabled: isAdmin,
                        }}
                      />
                    </Grid>

                    <Grid item xs={8}>
                      <Field
                        type="date"
                        name="date"
                        label="Date"
                        margin="normal"
                        component={this.renderTextField}
                        inputProps={{
                          fullWidth: true,
                          disabled: isAdmin,
                          value: moment().format('MMMM Do YYYY, h:mm a'),
                          multiline: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
            <div style={{ display: 'flex' }}>
              <Field component={SelectCustomerField} name="customer" />
              <Field
                component={SelectServiceField}
                onSelect={this.onServiceSelect}
                name="service"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CreateInvoicePage.propTypes = {
  fetchEverything: PropTypes.func.isRequired,
};

const validate = formValues => {
  console.log(formValues);
  const errors = {};
  return errors;
};

const withStylesComponent = withStyles(styles)(CreateInvoicePage);

const FormComponent = reduxForm({
  form: 'createInvoiceForm',
  validate,
})(withStylesComponent);

const mapStateToProps = state => ({
  auth: state.auth,
  invoices: state.invoices,
});

export default connect(
  mapStateToProps,
  { fetchEverything },
)(FormComponent);
