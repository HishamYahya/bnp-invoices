import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import InvoiceListItem from './InvoiceListItem';
import { fetchInvoices } from '../actions';

const InvoiceList = ({ invoices, expandAll }) => {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column' }}>
      {invoices.map(inv => (
        <InvoiceListItem invoice={inv} expandAll={expandAll} />
      ))}
    </Box>
  );
};

const mapStateToProps = state => ({ invoices: state.invoices });

InvoiceList.propTypes = {
  invoices: PropTypes.array.isRequired,
};

export default connect(
  mapStateToProps,
  { fetchInvoices },
)(InvoiceList);
