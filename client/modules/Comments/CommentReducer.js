import { ADD_COMMENT, ADD_COMMENTS } from './CommentActions';

// Initial State
const initialState = { data: [] };

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comments, ...state.data],
      };

    case ADD_COMMENTS :
      return {
        data: action.comments,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all comments by post cuid
export const getComments = (state, cuid) => state.comments.data.filter(comment => comment.postCuid === cuid);

// Export Reducer
export default CommentsReducer;
