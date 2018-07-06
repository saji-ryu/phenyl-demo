// @flow
export const memosSelector = state => {
  const userId = sessionSelector(state).userId;
  return state.phenyl.entities.user[userId].origin.memos;
};
export const viewMemoSelector = state => {
  let sortedMemos;
  const userId = sessionSelector(state).userId;
  if (state.phenyl.entities.user[userId].origin.memos) {
    sortedMemos = state.phenyl.entities.user[userId].origin.memos.slice();
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

export const sessionSelector = state => {
  return state.phenyl.session;
};
