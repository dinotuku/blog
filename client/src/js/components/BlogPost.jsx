import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scroll from 'react-scroll';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/navigation/check';
import Close from 'material-ui/svg-icons/navigation/close';
import Snackbar from 'material-ui/Snackbar';
import style from '../../css/BlogPost.css';

const Element = Scroll.Element;

class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replyContent: '',
      snackBarOpen: false,
    };
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false });
  }

  handleChange = (ev) => {
    this.setState({ replyContent: ev.target.value });
  }

  handleFocus = () => {
    this.textField.focus();
  }

  handleReplyCancel = () => {
    this.setState({ replyContent: '' });
  }

  handleKeySubmit = (ev) => {
    if ((ev.which === 13 || ev.keyCode === 13)) {
      if (ev.shiftKey) return;
      ev.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    if (this.props.user === '') this.setState({ snackBarOpen: true });
    else if (this.state.content !== '') {
      this.props.addReply(this.props.user, this.state.replyContent, this.props.posts[this.props.match.params.idx].idx);
      this.handleReplyCancel();
    }
  }

  renderReply = (replys) => {
    if (replys.length > 0) {
      return (
        <Card
          className={style.replyComment}
          expandable
        >
          {replys.map(idx => this.renderPostReply(this.props.posts[idx]))}
        </Card>
      );
    }
    return null;
  }

  renderPostReply = (item) => {
    const parsedTime = new Date(item.time);
    const time = `${parsedTime.getFullYear()}/${parsedTime.getMonth() + 1}/${parsedTime.getDate()} ${parsedTime.getHours()}:${(`0${parsedTime.getMinutes()}`).slice(-2)}`;

    return (
      <Element
        key={`${item.idx}-post-item`}
        name={`${item.idx}-post-item`}
      >
        <CardHeader
          title={item.user}
          subtitle={time}
        />
        <CardText
          className="post-reply"
        >
          { item.content.split('\n').map(it => (
            <span key={`${it}-line`}>{it}<br /></span>
          )) }
        </CardText>
      </Element>
    );
  }

  render() {
    const item = this.props.posts[this.props.match.params.idx];
    const parsedTime = new Date(item.time);
    const time = `${parsedTime.getFullYear()}/${parsedTime.getMonth() + 1}/${parsedTime.getDate()} ${parsedTime.getHours()}:${(`0${parsedTime.getMinutes()}`).slice(-2)}`;

    return (
      <div>
        <Card
          initiallyExpanded
          zDepth={2}
        >
          <CardHeader
            title={item.user}
            subtitle={time}
            actAsExpander
            showExpandableButton
          />
          <CardText
            className="comment-content"
            expandable
          >
            {item.content.split('\n').map(line => (
              <span key={`${line}-line`}>{line}<br /></span>
            ))}
          </CardText>
          <CardActions expandable>
            <FlatButton
              label="Reply"
              onTouchTap={this.handleFocus}
            />
          </CardActions>
          { this.renderReply(item.replys) }
          <Card expandable>
            <CardText>
              <TextField
                className={style.inputBar}
                hintText={`Reply to ${this.props.user}`}
                value={this.state.replyContent}
                onChange={this.handleChange}
                onKeyPress={this.handleKeySubmit}
                multiLine
                ref={(input) => { this.textField = input; }}
              />
              <span className="Comment-input-button-wrapper">
                <IconButton
                  className="Comment-input-button"
                  onTouchTap={this.handleReplyCancel}
                >
                  <Close className="Comment-input-button-svg" />
                </IconButton>
                <IconButton
                  className="Comment-input-button"
                  onTouchTap={this.handleSubmit}
                >
                  <Check className="Comment-input-button-svg" />
                </IconButton>
              </span>
            </CardText>
          </Card>
        </Card>
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

BlogPost.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    idx: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    time: PropTypes.string.isRequired,
    replys: PropTypes.arrayOf(PropTypes.number),
    replyTo: PropTypes.number,
  }).isRequired).isRequired,
  user: PropTypes.string.isRequired,
  addReply: PropTypes.func.isRequired,
};

BlogPost.defaultProps = {
  replys: [],
};

export default BlogPost;
