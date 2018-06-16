//@flow
import { combineReducers } from "redux";
import { CREATE_MEMO, UPDATE_MEMO, DELETE_MEMO } from "./actions";
import type { ReduxAction } from "./types";

// function userSignIn(state: Object = {}, action: ReduxAction) {
//   switch (action.type) {
//     case ADD_USER:
//       return;
//     default:
//       return state;
//   }
// }

function memos(state = [], action) {
  switch (action.type) {
    case CREATE_MEMO:
      return [...state, action.payload.memo];
    case UPDATE_MEMO:
      return state.map(memo => {
        if (memo.id === action.payload.memo.id) {
          return Object.assign({}, memo, action.payload.memo);
        }
        return memo;
      });
    case DELETE_MEMO:
    default:
      return state.map(memo => {
        if (memo.id === action.payload.memo.id) {
          return null;
        }
        return memo;
      });
  }
}

const memoApp = combineReducers({
  memos,
});
export default memoApp;
