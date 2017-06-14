import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import BlogPosts from '../components/BlogPosts';

const mapStateToProps = state => ({
  posts: state.posts.items,
  isFetching: state.posts.isFetching,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => {
    dispatch(fetchPosts());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogPosts);
