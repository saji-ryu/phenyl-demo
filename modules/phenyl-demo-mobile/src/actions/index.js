// @flow
import { actions } from "phenyl-redux";
import { memosSelector, sessionSelector } from "../selectors";

export const loginOperation = ({ email, password }) => async (
  dispatch,
  getState
) => {
  try {
    await dispatch(
      actions.assign([
        {
          $set: { error: null },
        },
      ])
    );

    await dispatch(
      actions.login({
        entityName: "user",
        credentials: { email, password },
      })
    );
    const phenylError = await getState().phenyl.error;
    if (phenylError) {
      console.log("no match user");
    } else {
      dispatch({ type: "LOGIN_SUCCESS" });
    }
  } catch (e) {
    console.log(e);
  }
};

export const logoutOperation = () => async (dispatch, getState) => {
  try {
    let session = getState().phenyl.session;
    await dispatch({ type: "PAGE_BACK" });
    await dispatch(
      actions.logout({
        sessionId: session.id,
        userId: session.userId,
        entityName: session.entityName,
      })
    );
  } catch (e) {
    console.log(e);
  }
};

export const createMemoOperation = () => async (dispatch, getState) => {
  try {
    // const memoId = memosSelector(getState()).length;
    const timeStamp = Date.now();
    const memoId =
      Math.floor(Math.random() * 10000).toString(16) + String(timeStamp);
    const memoData = {
      id: memoId,
      title: "new Title",
      content: "new Memo",
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };
    const userId = sessionSelector(getState()).userId;

    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        id: userId,
        operation: {
          $push: {
            memos: memoData,
          },
        },
      })
    );

    dispatch({ type: "MEMO_CREATED", memoId: memoId });
  } catch (e) {
    console.log(e);
  }
};

export const updateOperation = memoData => async (dispatch, getState) => {
  try {
    const memos = await memosSelector(getState());

    let memoIndex;
    memos.map((memo, index) => {
      if (memo.id === memoData.id) {
        memoIndex = index;
      }
    });

    const contentKey = "memos[" + memoIndex + "].content";
    const titleKey = "memos[" + memoIndex + "].title";
    const updateAtKey = "memos[" + memoIndex + "].updatedAt";
    const updateTime = Date.now();
    const userId = sessionSelector(getState()).userId;

    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        id: userId,
        operation: {
          $set: {
            [contentKey]: memoData.content,
            [titleKey]: memoData.title,
            [updateAtKey]: updateTime,
          },
        },
      })
    );
    dispatch({ type: "PAGE_BACK" });
  } catch (e) {
    console.log(e);
  }
};

export const deleteMemoOperation = memoId => async (dispatch, getState) => {
  // TODO:削除するオペレーションかく
  try {
    const memosBeforeDelete = memosSelector(getState());
    let deleteMemoIndex = null;
    await memosBeforeDelete.map((memo, index) => {
      if (memo.id === memoId) {
        deleteMemoIndex = index;
      }
    });
    let memosAfterDelete = memosBeforeDelete.slice();
    if (deleteMemoIndex) {
      memosAfterDelete.splice(deleteMemoIndex, 1);
    }
    const userId = sessionSelector(getState()).userId;
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        id: userId,
        operation: {
          $set: { memos: memosAfterDelete },
        },
      })
    );
    await dispatch({ type: "PAGE_BACK" });
  } catch (e) {
    console.log(e);
  }
};
