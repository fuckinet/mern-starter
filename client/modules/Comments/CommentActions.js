import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(cuid, comment) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments`, 'post', {
      comment: {
        name: comment.name,
        text: comment.text,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}/comments`).then(res => dispatch(addComments(res.comments)));
  };
}
