import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Components
import CommentsList from '../../../Comments/components/CommentsList';

// Import Style
import styles from '../../components/PostListItem/PostListItem.css';

// Import Actions
import { fetchPost } from '../../PostActions';
import { addCommentRequest, fetchComments } from '../../../Comments/CommentActions';

// Import Selectors
import { getPost } from '../../PostReducer';
import { getComments } from '../../../Comments/CommentReducer';
import { toggleAddComment } from '../../../App/AppActions';
import { getShowAddComment } from '../../../App/AppReducer';
import CommentAddWidget from '../../../Comments/components/CommentAddWidget/CommentAddWidget';

class PostDetailPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.params.cuid));
  }

  toggleAddCommentSection = () => {
    this.props.dispatch(toggleAddComment());
  };

  handleAddComment = (name, text) => {
    this.props.dispatch(toggleAddComment());
    this.props.dispatch(addCommentRequest(this.props.params.cuid, { name, text }));
  };

  render() {
    return (
      <div>
        <Helmet title={this.props.post.title} />
        <div className={`${styles['single-post']} ${styles['post-detail']}`}>
          <h3 className={styles['post-title']}>{this.props.post.title}</h3>
          <p className={styles['author-name']}><FormattedMessage id="by" /> {this.props.post.name}</p>
          <p className={styles['post-desc']}>{this.props.post.content}</p>
        </div>
        <hr className={styles.divider} />
        <CommentAddWidget addComment={this.handleAddComment} showAddComment={this.props.showAddComment} />
        <CommentsList
          toggleAddComment={this.toggleAddCommentSection}
          comments={this.props.comments}
        />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
PostDetailPage.need = [params => {
  return fetchPost(params.cuid);
},
params => {
  return fetchComments(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    showAddComment: getShowAddComment(state),
    post: getPost(state, props.params.cuid),
    comments: getComments(state, props.params.cuid),
  };
}

PostDetailPage.propTypes = {
  showAddComment: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
  })).isRequired,
  params: PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PostDetailPage);
