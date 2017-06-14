import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { green500, green700 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import BlogBar from '../containers/BlogBar';
import ShowPosts from '../containers/ShowPosts';
import AddPost from '../containers/AddPost';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: green500,
    primary2Color: green700,
  },
});

const BlogApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div>
      <BlogBar />
      <ShowPosts />
      <AddPost />
    </div>
  </MuiThemeProvider>
);

export default BlogApp;
