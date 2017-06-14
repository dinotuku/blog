import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import BlogReducers from './js/reducers';
import BlogApp from './js/components/BlogApp';
import './index.css';

const store = createStore(
  BlogReducers,
  applyMiddleware(
    thunkMiddleware,
    createLogger,
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <BlogApp />
  </Provider>,
  document.getElementById('root'),
);
