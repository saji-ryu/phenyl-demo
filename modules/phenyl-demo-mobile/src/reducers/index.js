//@flow
import { combineReducers } from "redux";
import { CREATE_MEMO, UPDATE_MEMO, DELETE_MEMO } from "../actions/index";
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
const initMemoState: MemoData = [
  {
    id: 1,
    createdAt: 0,
    updatedAt: 11111,
    title: "test1",
    content: "This page is No1",
  },
  {
    id: 2,
    createdAt: 1,
    updatedAt: 12111,
    title: "test2",
    content: "This page is No2",
  },
  {
    id: 3,
    createdAt: 2,
    updatedAt: 14441,
    title: "test3",
    content: "This page is No3",
  },
  {
    id: 4,
    createdAt: 4,
    updatedAt: 331311,
    title: "test4",
    content: "This page is No4",
  },
];

function memos(state = initMemoState, action) {
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

const memoApp = combineReducers({
  memos,
});
export default memoApp;
