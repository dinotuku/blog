let nextPostIdx = 0;

export const LOG_IN = 'LOG_IN';

export const LOG_OUT = 'LOG_OUT';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';

export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';

export const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';

export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';

export const ADD_POST_ERROR = 'ADD_POST_ERROR';

export const ADD_POST = 'ADD_POST';

export const ADD_REPLY_REQUEST = 'ADD_REPLY_REQUEST';

export const ADD_REPLY_SUCCESS = 'ADD_REPLY_SUCCESS';

export const ADD_REPLY_ERROR = 'ADD_REPLY_ERROR';

export const ADD_REPLY = 'ADD_REPLY';

export const logIn = user => ({
  type: LOG_IN,
  user,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const getPostsRequest = () => ({
  type: GET_POSTS_REQUEST,
});

export const getPostsSuccess = json => ({
  type: GET_POSTS_SUCCESS,
  items: json,
  recievedAt: Date.now(),
});

export const getPostsError = err => ({
  type: GET_POSTS_ERROR,
  errorMessage: err,
});

export const fetchPosts = () => (
  (dispatch) => {
    dispatch(getPostsRequest());
    return fetch('api/getPosts')
      .then(res => res.json())
      .then((json) => {
        nextPostIdx += (json.length - 1);
        json.map((post) => {
          const tmp = post;
          if (post.replys !== null) tmp.replys = post.replys.split(',').map(Number);
          else tmp.replys = undefined;
          if (post.replyTo === null) tmp.replyTo = undefined;
          return tmp;
        });
        return dispatch(getPostsSuccess(json));
      })
      .catch(err => dispatch(getPostsError(err)));
  }
);

export const addPostRequest = () => ({
  type: ADD_POST_REQUEST,
});

export const addPostSuccess = (user, content, time, replys) => {
  nextPostIdx += 1;
  return {
    type: ADD_POST_SUCCESS,
    idx: nextPostIdx,
    user,
    content,
    time,
    replys,
  };
};

export const addPostError = err => ({
  type: ADD_POST_ERROR,
  errorMessage: err,
});

export const fetchAddPost = (user, content, time, replys) => (
  (dispatch) => {
    dispatch(addPostRequest());
    return fetch('api/addPost', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        idx: nextPostIdx + 1,
        user,
        content,
        time,
        replys,
      }),
    })
      .then(() => dispatch(addPostSuccess(user, content, time, replys)))
      .catch(err => dispatch(addPostError(err)));
  }
);

export const addReplyRequest = () => ({
  type: ADD_REPLY_REQUEST,
});

export const addReplySuccess = (user, content, time, replyTo) => {
  nextPostIdx += 1;
  return {
    type: ADD_REPLY_SUCCESS,
    idx: nextPostIdx,
    user,
    content,
    time,
    replyTo,
  };
};

export const addReplyError = err => ({
  type: ADD_REPLY_ERROR,
  errorMessage: err,
});

export const fetchAddReply = (user, content, time, replyTo) => (
  (dispatch) => {
    dispatch(addReplyRequest());
    return fetch('../api/addReply', {
      method: 'post',
      headers: {
        Accept: 'appication/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        idx: nextPostIdx + 1,
        user,
        content,
        time,
        replyTo,
      }),
    })
      .then(() => dispatch(addReplySuccess(user, content, time, replyTo)))
      .catch(err => dispatch(addReplyError(err)));
  }
);
