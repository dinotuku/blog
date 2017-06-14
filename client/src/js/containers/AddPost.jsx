import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { fetchAddPost } from '../actions';
import style from '../../css/AddPost.css';

const mapStateToProps = state => ({
  isFetching: state.posts.isFetching,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addPost: (user, content, time) => { dispatch(fetchAddPost(user, content, time, [])); },
});

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      postOpen: false,
      content: '',
    };
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  }

  handlePostOpen = () => {
    if (this.props.user === '') this.setState({ snackBarOpen: true });
    else this.setState({ postOpen: true });
  }

  handlePostClose = () => {
    this.setState({ postOpen: false });
  }

  handleChange = (ev) => {
    this.setState({ content: ev.target.value });
  }

  handlePost = () => {
    this.props.addPost(this.props.user, this.state.content, JSON.parse(JSON.stringify(new Date())));
    this.setState({
      postOpen: false,
      content: '',
    });
  }

  handleKeySubmit = (ev) => {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      if (ev.shiftKey) return;
      ev.preventDefault();
      this.handlePost();
    }
  }

  render() {
    const postActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handlePostClose}
      />,
      <FlatButton
        label="Post"
        primary
        onTouchTap={this.handlePost}
      />,
    ];
    return (
      <div>
        <FloatingActionButton
          className={style.newPostButton}
          onTouchTap={this.handlePostOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="What's on your mind?"
          actions={postActions}
          open={this.state.postOpen}
          onRequestClose={this.handlePostClose}
        >
          <TextField
            className={style.inputBar}
            hintText="What's on your mind?"
            value={this.state.content}
            onChange={this.handleChange}
            onKeyPress={this.handleKeySubmit}
            autoFocus
            multiLine
          />
        </Dialog>
        <Snackbar
          className={style.snackBar}
          open={this.state.snackBarOpen}
          message="You need to login!"
          autoHideDuration={4000}
          onRequestClose={this.handleSnackBarClose}
        />
      </div>
    );
  }
}

AddPost.propTypes = {
  user: PropTypes.string.isRequired,
  addPost: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddPost);
