import { createMemo, updateMemo, deleteMemo } from "./actions";
import { store } from "./store";

console.log(store.getState());
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(
  createMemo({
    id: store.getState().memos.length,
    title: "firstmemo",
    content: "This is first memo!",
  })
);
store.dispatch(
  createMemo({
    id: store.getState().memos.length,
    title: "secondmemo",
    content: "This is second memo!",
  })
);
store.dispatch(
  updateMemo({
    id: 0,
    content: "Hello World!",
  })
);
store.dispatch(
  updateMemo({
    id: 1,
    title: "2ndMemo",
  })
);
store.dispatch(
  deleteMemo({
    id: 0,
  })
);

// Stop listening to state updates
unsubscribe();
