import { combineReducers } from 'redux';
import posts from './posts';
import user from './user';

const BlogReducers = combineReducers({
  posts,
  user,
});

export default BlogReducers;
