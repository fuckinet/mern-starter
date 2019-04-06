import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentAddWidget.css';

export class CommentAddWidget extends Component {
  addComment = () => {
    const nameRef = this.refs.name;
    const textRef = this.refs.text;
    if (nameRef.value && textRef.value) {
      this.props.addComment(nameRef.value, textRef.value);
      nameRef.value = textRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddComment ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="addNewComment" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <textarea placeholder={this.props.intl.messages.commentText} className={styles['form-field']} ref="text" />
          <a className={styles['comment-submit-button']} href="#" onClick={this.addComment}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

CommentAddWidget.propTypes = {
  addComment: PropTypes.func.isRequired,
  showAddComment: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(CommentAddWidget);
