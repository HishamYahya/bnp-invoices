import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem, List } from '@material-ui/core';
import { fetchInvoices } from '../../actions';
import InvoiceList from '../InvoiceList';

class InvoicesPage extends Component {
  componentWillMount() {
    this.props.fetchInvoices();
  }

  renderListItem = invoice => (
    <ListItem key={invoice.id}>{invoice.employeeName}</ListItem>
  );

  render() {
    return (
      <div>
        <InvoiceList />
      </div>
    );
  }
}

const mapStateToProps = state => ({ invoices: state.invoices });

export default connect(
  mapStateToProps,
  { fetchInvoices },
)(InvoicesPage);
