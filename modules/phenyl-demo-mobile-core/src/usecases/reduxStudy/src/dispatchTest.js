import {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  VisibilityFilters,
} from "./src/actions";

import { store } from "./store";

console.log(store.getState());

const unsubscribe = store.subscibe(() => {
  console.log(store.getState());
});

store.dispatch(addTodo("Learn about actions"));
store.dispatch(addTodo("Learn about reducers"));
store.dispatch(addTodo("Learn about store"));
store.dispatch(toggleTodo(0));
store.dispatch(toggleTodo(1));
store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

// Stop listening to state updates
unsubscribe();
