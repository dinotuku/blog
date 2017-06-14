import { connect } from 'react-redux';
import { fetchAddReply } from '../actions';
import BlogPost from '../components/BlogPost';

const mapStateToProps = state => ({
  posts: state.posts.items,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  addReply: (user, content, replyTo) => {
    dispatch(fetchAddReply(user, content, JSON.parse(JSON.stringify(new Date())), replyTo));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogPost);
