import { ADD_COMMENT, ADD_COMMENTS, DELETE_COMMENT, EDIT_COMMENT } from './CommentActions';

// Initial State
const initialState = { data: [] };

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS :
      return {
        data: action.comments,
      };

    case DELETE_COMMENT :
      return {
        data: state.data.filter(comment => comment.cuid !== action.cuid),
      };

    case EDIT_COMMENT : {
      return {
        data: state.data.map(comment => {
          if (comment.cuid === action.comment.cuid) {
            return { ...action.comment };
          }
          return comment;
        }),
      };
    }

    default:
      return state;
  }
};

/* Selectors */

// Get all comments by post cuid
export const getComments = (state, cuid) => state.comments.data.filter(comment => comment.postCuid === cuid);

// Export Reducer
export default CommentsReducer;
