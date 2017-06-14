import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipMove from 'react-flip-move';
import Scroll from 'react-scroll';
import { Card, CardHeader } from 'material-ui/Card';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import ShowPost from '../containers/ShowPost';

const Element = Scroll.Element;
const scroller = Scroll.scroller;

class BlogPosts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate(prevProps) {
    const allPosts = this.props.posts.filter(post => post.replys !== undefined);
    if (prevProps.posts !== this.props.posts) {
      const lastPost = allPosts[allPosts.length - 1];
      const lastPostIdx = lastPost.idx;
      scroller.scrollTo(`${lastPostIdx}-post-item`, {
        duration: 400,
        delay: 100,
        smooth: 'easeInOutQuad',
        isDynamic: true,
      });
    }
  }

  renderBlogPost = (item) => {
    const parsedTime = new Date(item.time);
    const time = `${parsedTime.getFullYear()}/${parsedTime.getMonth() + 1}/${parsedTime.getDate()} ${parsedTime.getHours()}:${(`0${parsedTime.getMinutes()}`).slice(-2)}`;

    return (
      <Element
        key={`${item.idx}-post-item`}
        name={`${item.idx}-post-item`}
      >
        <Card>
          <CardHeader
            title={<Link to={`/posts/${item.idx}`}>{item.user}</Link>}
            subtitle={time}
          />
        </Card>
      </Element>
    );
  };

  render() {
    const allPosts = this.props.posts.filter(post => post.replys !== undefined);

    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <FlipMove
                  duration={400}
                  staggerDelayBy={350}
                  easing="cubic-bezier(0.455, 0.030, 0.515, 0.955)"
                  appearAnimation="accordionVertical"
                  enterAnimation="accordionVertical"
                  leaveAnimation="accordionVertical"
                >
                  { allPosts.map(item => this.renderBlogPost(item)) }
                </FlipMove>
              )}
            />
            <Route
              path="/posts/:idx"
              component={ShowPost}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

BlogPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    idx: PropTypes.number.isRequired,
    user: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired,
    time: PropTypes.string.isRequired,
    replys: PropTypes.arrayOf(PropTypes.number),
    replyTo: PropTypes.number,
  }).isRequired).isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default BlogPosts;
