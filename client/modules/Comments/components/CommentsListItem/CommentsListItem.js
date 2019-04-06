import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './CommentsListItem.css';

class CommentsListItem extends Component {
  state = {
    name: '',
    text: '',
  };

  nameOnChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  textOnChange = (event) => {
    this.setState({
      text: event.target.value,
    });
  };

  handleOnToggleEdit() {
    this.setState({
      name: this.props.comment.name,
      text: this.props.comment.text,
    });
    this.props.toggleEdit();
  }

  handleOnSubmit() {
    const nameRef = this.refs.name;
    const textRef = this.refs.text;
    if (nameRef.value && textRef.value) {
      this.name = nameRef.value;
      this.text = textRef.value;
      this.props.onEdit(nameRef.value, textRef.value);
    }
  }

  render() {
    return (
      <div className={styles['single-post-comment']}>
        <h3 className={styles['author-name']}>
          {this.props.showEditComment === this.props.comment.cuid
            ? (<input className={styles['form-field']} ref="name" value={this.state.name} onChange={this.nameOnChange} />)
            : this.props.comment.name}
          &nbsp;<FormattedMessage id="says" />
        </h3>
        <p className={styles['comment-action']}>
          {this.props.showEditComment === this.props.comment.cuid
            ? [<a href="#" onClick={() => this.handleOnSubmit()}><FormattedMessage id="submit" /></a>, ' | ']
            : null}
          <a href="#" onClick={() => this.handleOnToggleEdit()}>
            {this.props.showEditComment === this.props.comment.cuid
              ? <FormattedMessage id="cancelEditComment" />
              : <FormattedMessage id="editComment" />}
          </a>
          &nbsp;|&nbsp;
          <a href="#" onClick={this.props.onDelete}><FormattedMessage id="deleteComment" /></a>
        </p>
        <p className={styles['comment-text']}>
          {this.props.showEditComment === this.props.comment.cuid
            ? (<textarea className={styles['form-field']} ref="text" value={this.state.text} onChange={this.textOnChange} />)
            : this.props.comment.text}
        </p>
      </div>
    );
  }
}

CommentsListItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    postCuid: PropTypes.string.isRequired,
  }).isRequired,
  showEditComment: PropTypes.string.isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CommentsListItem;
