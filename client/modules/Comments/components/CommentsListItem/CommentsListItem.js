import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentsListItem.css';

function CommentsListItem(props) {
  return (
    <div className={styles['single-post-comment']}>
      <h3 className={styles['author-name']}>{props.comment.name} <FormattedMessage id="says" /></h3>
      <p className={styles['comment-text']}>{props.comment.text}</p>
    </div>
  );
}

CommentsListItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default CommentsListItem;
