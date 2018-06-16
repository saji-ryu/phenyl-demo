//@flow
import type {
  MemoData_Create,
  MemoData_Update,
  MemoData_Delete,
  UserData,
  ReduxAction,
} from "./types";

//export const ADD_USER = "ADD_USER";
export const CREATE_MEMO = "CREATE_MEMO";
export const UPDATE_MEMO = "UPDATE_MEMO";
export const DELETE_MEMO = "DELETE_MEMO";

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
        id: "id" + createdAt,
        createdAt: createdAt,
        updatedAt: createdAt,
        title: memoData.title,
        content: memoData.content,
      },
    },
  };
}
// export function UpdateMemoContent(memoId: MemoId, memoContent: MemoContent) {
//   return { type: UPDATE_MEMO_CONTENT, id: memoId, content: memoContent };
// }
export function updateMemo(memoData: MemoData_Update): ReduxAction {
  let updatedAt = Number(Date.now());
  return {
    type: UPDATE_MEMO,
    payload: {
      memo: {
        id: memoData.id,
        updatedAt: updatedAt,
        title: memoData.title,
        content: memoData.content,
      },
    },
  };
}
// export function UpdateMemoTitle(memoId: MemoId, memoTitle: MemoTitle) {
//   return { type: UPDATE_MEMO_TITLE, id: memoId, title: memoTitle };
// }
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
