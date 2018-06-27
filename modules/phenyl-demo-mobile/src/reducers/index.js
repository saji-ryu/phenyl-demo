//@flow
import { combineReducers } from "redux";
import {
  CREATE_MEMO,
  UPDATE_MEMO,
  DELETE_MEMO,
  PAGE_TO,
} from "../actions/index";
import type { MemoData } from "../types";
import type { ReduxAction } from "../types";

// function userSignIn(state: Object = {}, action: ReduxAction) {
//   switch (action.type) {
//     case ADD_USER:
//       return;
//     default:
//       return state;
//   }
// }
const initMemoState = [
  {
    id: 0,
    createdAt: 0,
    updatedAt: 11111,
    title: "Hello",
    content: "This is tutorial page",
  },
];

function memos(state = initMemoState, action) {
  console.log(action);
  switch (action.type) {
    case CREATE_MEMO:
      return [action.payload.memo, ...state];
    case UPDATE_MEMO:
      return state.map(memo => {
        if (memo.id === action.payload.memo.id) {
          return Object.assign({}, memo, action.payload.memo);
        }
        return memo;
      });
    case DELETE_MEMO:
      return state.map(memo => {
        if (memo.id === action.payload.memo.id) {
          return null;
        }
        return memo;
      });
    default:
      return state;
  }
}

const initPageState = {
  name: "Login",
  index: 1,
};

function page(state = initPageState, action) {
  switch (action.type) {
    case PAGE_TO:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

// const memoApp = combineReducers({
//   memos,
//   page,
// });
export { memos, page };
