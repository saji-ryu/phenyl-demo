// @flow
import type {
  MemoData_Create,
  MemoData_Update,
  MemoData_Delete,
  UserData,
  ReduxAction,
  MemoData,
  pageData,
} from "./types";

//export const ADD_USER = "ADD_USER";
export const CREATE_MEMO = "CREATE_MEMO";
export const UPDATE_MEMO = "UPDATE_MEMO";
export const DELETE_MEMO = "DELETE_MEMO";

export const PAGE_TO = "PAGE_TO";
//export const SAVE = "SAVE";

// 後で考える
// export function addUser(userData: UserData) {
//   return {
//     type: ADD_USER,
//     userId: userData.userId,
//     name: userData.name,
//     password: userData.password,
//   };
// }

type MEMO = {};
export function createMemo(memoData: MemoData_Create): ReduxAction {
  let createdAt = Number(Date.now());
  return {
    type: CREATE_MEMO,
    payload: {
      memo: {
        id: memoData.id,
        createdAt: createdAt,
        updatedAt: createdAt,
        title: memoData.title,
        content: memoData.content,
      },
    },
  };
}

export function updateMemo(memoData: MemoData_Update): ReduxAction {
  let updatedAt = Number(Date.now());
  let updateData = {
    type: UPDATE_MEMO,
    payload: {
      memo: {
        id: memoData.id,
        updatedAt: updatedAt,
      },
    },
  };
  if (memoData.title) updateData.payload.memo.title = memoData.title;
  if (memoData.content) updateData.payload.memo.content = memoData.content;
  return updateData;
}

export function deleteMemo(memoData: MemoData_Delete): ReduxAction {
  return {
    type: DELETE_MEMO,
    payload: {
      memo: {
        id: memoData.id,
      },
    },
  };
}

export function pageTo(pageData: PgaeData): ReduxAction {
  return {
    type: PAGE_TO,
    payload: {
      name: pageData.name,
      index: pageData.index,
    },
  };
}
