import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Public from 'material-ui/svg-icons/social/public';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { logIn, logOut } from '../actions';
import style from '../../css/BlogBar.css';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logIn: (user) => { dispatch(logIn(user)); },
  logOut: () => { dispatch(logOut()); },
});

class BlogBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logInOpen: false,
      logOutOpen: false,
    };
  }

  handleLogOutOpen = () => {
    this.setState({ logOutOpen: true });
  }

  handleLogOutClose = () => {
    this.setState({ logOutOpen: false });
  }

  handleLogOut = () => {
    this.props.logOut();
    this.handleLogOutClose();
  }

  handleLogInOpen = () => {
    this.setState({ logInOpen: true });
  }

  handleLogInClose = () => {
    this.setState({ logInOpen: false });
  }

  handleLogin = (user) => {
    this.props.logIn(user);
    this.handleLogInClose();
  }

  handleKeySubmit = (ev) => {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      ev.preventDefault();
      this.handleLogin(ev.target.value);
    }
  }

  render() {
    const logInActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleLogInClose}
      />,
      <FlatButton
        label="Login"
        primary
        onTouchTap={this.handleLogin}
      />,
    ];

    const logOutActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleLogOutClose}
      />,
      <FlatButton
        label="Logout"
        primary
        onTouchTap={this.handleLogOut}
      />,
    ];

    return (
      <div>
        <AppBar
          title={this.props.user ? `Hi ${this.props.user}` : 'Blog'}
          iconElementLeft={
            <IconButton><Public /></IconButton>
          }
          iconElementRight={
            this.props.user ?
              <FlatButton label="Logout" onTouchTap={this.handleLogOutOpen} /> :
              <FlatButton label="Login" onTouchTap={this.handleLogInOpen} />
          }
          zDepth={2}
        />
        <Dialog
          title="Type your name"
          actions={logInActions}
          open={this.state.logInOpen}
          onRequestClose={this.handleLogInClose}
        >
          <TextField
            className={style.inputBar}
            hintText="My name"
            onKeyPress={this.handleKeySubmit}
            autoFocus
          />
        </Dialog>
        <Dialog
          title="Are you sure you want to logout?"
          actions={logOutActions}
          open={this.state.logOutOpen}
          onRequestClose={this.handleLogOutClose}
        />
      </div>
    );
  }
}

BlogBar.propTypes = {
  user: PropTypes.string.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogBar);
