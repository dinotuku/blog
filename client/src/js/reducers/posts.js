import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_ERROR,
  ADD_REPLY_REQUEST,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_ERROR,
} from '../actions';

const post = (state, action) => {
  switch (action.type) {
    case ADD_POST_SUCCESS:
      return action;
    case ADD_REPLY_SUCCESS:
      if (state !== undefined) {
        if (state.idx !== action.replyTo) {
          return state;
        }
        return Object.assign({}, state, {
          replys: [...state.replys, action.idx],
        });
      }
      return action;
    default:
      return state;
  }
};

const posts = (state = {
  isFetching: false,
  isError: false,
  items: [],
}, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case GET_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items,
      });
    case GET_POSTS_ERROR:
      return Object.assign({}, state, {
        isError: true,
      });
    case ADD_POST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case ADD_POST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items,
          post(undefined, action),
        ],
      });
    case ADD_POST_ERROR:
      return Object.assign({}, state, {
        isError: true,
      });
    case ADD_REPLY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case ADD_REPLY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [
          ...state.items.map(p => post(p, action)),
          post(undefined, action),
        ],
      });
    case ADD_REPLY_ERROR:
      return Object.assign({}, state, {
        isError: true,
      });
    default:
      return state;
  }
};

export default posts;
