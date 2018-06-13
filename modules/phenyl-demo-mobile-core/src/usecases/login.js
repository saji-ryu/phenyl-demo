// @flow
import { actions } from "phenyl-redux";

const getLoggedInUserEntity = state => {
  return {};
};
const getLoggedInUserVersionId = state => {
  return "xxx";
};

// TODO: prettierの設定(commmaをes5)
// TODO: ここの型付け
export const login = ({
  email,
  password,
}: {
  /* awesome type */
}) => async (dispatch, getState) => {
  try {
    // phenylのエラーをリセットする
    dispatch(
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

    const user = getLoggedInUserEntity(getState());
    const versionId = getLoggedInUserVersionId(getState());
    console.log({ user, versionId });
    await dispatch(actions.follow("user", user, versionId));
  } catch (e) {
    console.error(e);
  }
};
