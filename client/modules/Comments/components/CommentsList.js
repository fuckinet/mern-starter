import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './CommentsListItem/CommentsListItem.css';

// Import Components
import CommentsListItem from './CommentsListItem/CommentsListItem';

function CommentsList(props) {
  return (
    <div className={styles['post-comment-list']}>
      {
        props.comments.map(comment => (
          <CommentsListItem
            comment={comment}
            key={comment.cuid}
          />
        ))
      }
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentsList;
