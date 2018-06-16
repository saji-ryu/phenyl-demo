// @flow
import { actions } from "phenyl-redux";

import type { ThunkAction } from "phenyl-demo-interfaces";

const getLoggedInUserEntity = state => {
  return {};
};
const getLoggedInUserVersionId = state => {
  return "xxx";
};
export const login = ({
  email,
  password,
}: {
  email: string,
  password: string,
}): ThunkAction => async (dispatch, getState) => {
  /** async以降の関数をそのままreturnするという意味? */
  try {
    // phenylのエラーをリセットする
    // action.assign をstoreに投げてる？
    dispatch(
      actions.assign([
        {
          $set: { error: null },
        },
      ])
    );
    // action.loginをstoreに投げてる
    await dispatch(
      actions.login({
        entityName: "user",
        credentials: { email, password },
      })
    );
    //getStateでstoreのStateをとり、それをgetLoggedInUser・・・でフィルタ（今はそのまま流してる）
    const user = getLoggedInUserEntity(getState());
    const versionId = getLoggedInUserVersionId(getState());
    console.log({ user, versionId });
    //actions.followを投げる
    await dispatch(actions.follow("user", user, versionId));
  } catch (e) {
    console.error(e);
  }
};
