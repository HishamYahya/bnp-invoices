import React, { Component } from 'react';
import { connect } from 'react-redux';
import InvoiceListItem from './InvoiceListItem';
import { fetchInvoices } from '../actions';
import { Box } from '@material-ui/core';

class InvoiceList extends Component {
  render() {
    return (
      <Box style={{ display: 'flex', flexDirection: 'column' }}>
        {this.props.invoices.map(inv => (
          <InvoiceListItem invoice={inv} />
        ))}
      </Box>
    );
  }
}

const mapStateToProps = state => ({ invoices: state.invoices });

export default connect(
  mapStateToProps,
  { fetchInvoices },
)(InvoiceList);
