import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

class MainPage extends Component {
  render() {
    return (
      <div>
        <Typography>{this.props.isAdmin ? 'yes' : 'no'}</Typography>
      </div>
    );
  }
}

const mapStateToProps = state => ({ isAdmin: state.auth.isAdmin });

export default connect(mapStateToProps)(MainPage);
