import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '../AppBar';

class MainPage extends Component {
  render() {
    return <div />;
  }
}

const mapStateToProps = state => ({ isAdmin: state.auth.isAdmin });

export default connect(mapStateToProps)(MainPage);
