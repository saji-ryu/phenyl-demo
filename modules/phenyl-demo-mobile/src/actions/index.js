// @flow
import { actions } from "phenyl-redux";
import { memosSelector } from "../selectors";
// import navigationService from "../../NavigationService";

export const loginOperation = ({ email, password }, navigation) => async (
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
    dispatch({ type: "LOGIN_SUCCESS" });
    // navigationService.navigate({ routeName: "Home" });
  } catch (e) {
    console.log(e);
  }
};

export const logoutOperation = navigation => async (dispatch, getState) => {
  try {
    let session = getState().phenyl.session;
    await dispatch(
      actions.logout({
        sessionId: session.id,
        userId: session.userId,
        entityName: session.entityName,
      })
    );
    dispatch({ type: "PAGE_BACK" });
  } catch (e) {
    console.log(e);
  }
};

export const createMemoOperation = () => async (dispatch, getState) => {
  // let phenylId = getState().phenyl.session.id;
  // console.log(phenylId);
  try {
    // dispatch(startSubmit());
    const memoId = memosSelector(getState()).length;
    const timeStamp = Date.now();
    const memoData = {
      id: memoId,
      title: "new Title",
      content: "new Memo",
      createdAt: timeStamp,
      updatedAt: timeStamp,
    };

    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
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
    let memos = await memosSelector(getState());

    let memoIndex;
    memos.map((memo, index) => {
      if (memo.id === memoData.id) {
        memoIndex = index;
      }
    });

    let contentKey = "memos[" + memoIndex + "].content";
    let titleKey = "memos[" + memoIndex + "].title";
    let updateAtKey = "memos[" + memoIndex + "].updatedAt";
    let updateTime = Date.now();

    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
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
