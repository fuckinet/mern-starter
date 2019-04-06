import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentsListItem/CommentsListItem.css';

// Import Components
import CommentsListItem from './CommentsListItem/CommentsListItem';

function CommentsList(props) {
  return (
    <div className={styles['post-comment-list']}>
      <a className={styles['add-comment-button']} href="#" onClick={props.toggleAddComment}>
        <FormattedMessage id="addComment" />
      </a>
      {
        props.comments.map(comment => (
          <CommentsListItem
            comment={comment}
            key={comment.cuid}
            showEditComment={props.showEditComment}
            toggleEdit={() => props.toggleEditComment(comment.cuid)}
            onEdit={(name, text) => props.handleEditComment(comment.cuid, name, text)}
            onDelete={() => props.handleDeleteComment(comment.cuid)}
          />
        ))
      }
    </div>
  );
}

CommentsList.propTypes = {
  handleDeleteComment: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  toggleAddComment: PropTypes.func.isRequired,
  toggleEditComment: PropTypes.func.isRequired,
  showEditComment: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentsList;
