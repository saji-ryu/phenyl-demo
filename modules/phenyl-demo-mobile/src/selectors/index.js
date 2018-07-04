// @flow
export const memosSelector = state => {
  return state.phenyl.entities.user.hoge.origin.memos;
};
export const viewMemoSelector = state => {
  let sortedMemos;
  if (state.phenyl.entities.user.hoge.origin.memos) {
    sortedMemos = state.phenyl.entities.user.hoge.origin.memos.slice();
    sortedMemos.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    sortedMemos = [];
  }
  return sortedMemos;
};
