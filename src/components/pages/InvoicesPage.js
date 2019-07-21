import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Fab, Box, Paper, Card, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { fetchInvoices } from '../../actions';
import InvoiceList from '../InvoiceList';
import history from '../../history';

class InvoicesPage extends Component {
  state = { expanded: false };

  componentWillMount() {
    const { fetchInvoices } = this.props;
    fetchInvoices();
  }

  onFabClick = () => {
    history.push('/invoices/new');
  };

  render() {
    return (
      <Box>
        <Fab
          style={{ position: 'absolute', right: '5%', bottom: '5%' }}
          onClick={this.onFabClick}
        >
          <AddIcon />
        </Fab>
        <Paper>
          <Button
            variant="contained"
            onClick={() =>
              this.setState(prevState => ({ expanded: !prevState.expanded }))
            }
          >
            {this.state.expanded ? 'Collapse' : 'Expand'}
          </Button>
        </Paper>
        <InvoiceList expandAll={this.state.expanded} />
      </Box>
    );
  }
}

const mapStateToProps = state => ({ invoices: state.invoices });

InvoicesPage.propTypes = {
  fetchInvoices: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  { fetchInvoices },
)(InvoicesPage);
