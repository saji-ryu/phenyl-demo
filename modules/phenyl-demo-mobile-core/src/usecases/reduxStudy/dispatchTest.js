import { createMemo, updateMemo, deleteMemo } from "./actions";

import { store } from "./store";

console.log(store.getState());

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(
  createMemo({ title: "firstmemo", content: "This is first memo!" })
);
// Stop listening to state updates
unsubscribe();
