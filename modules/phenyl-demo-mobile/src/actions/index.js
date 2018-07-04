// @flow
import { actions } from "phenyl-redux";
import { memosSelector } from "../selectors";

export const loginOperation = ({ email, password }, navigation) => async (
  dispatch,
  getState
) => {
  try {
    console.log("before error null");
    await dispatch(
      actions.assign([
        {
          $set: { error: null },
        },
      ])
    );
    console.log("before user login");
    await dispatch(
      actions.login({
        entityName: "user",
        credentials: { email, password },
      })
    );
    console.log("before set operationMemo");
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            operatingMemo: {
              content: null,
              title: null,
              id: null,
            },
          },
        },
      })
    );
    console.log("before page chnge");
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            page: {
              name: "Home",
              id: null,
            },
          },
        },
      })
    );
    navigation.navigate("Home");
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
    navigation.navigate("Login");
  } catch (e) {
    console.log(e);
  }
};

export const createMemoOperation = (memoData, navigation) => async (
  dispatch,
  getState
) => {
  // let phenylId = getState().phenyl.session.id;
  // console.log(phenylId);
  try {
    // dispatch(startSubmit());
    memoData.createdAt = Date.now();
    memoData.updatedAt = Date.now();
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

    const memoId = memosSelector(getState()).length - 1;
    navigation.navigate("MemoEdit", { memoId });
  } catch (e) {
    console.log(e);
  }
};

export const updateOperation = (memoData, navigation) => async (
  dispatch,
  getState
) => {
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
    navigation.goBack();
  } catch (e) {
    console.log(e);
  }
};
