const combineReducers = require("redux").combineReducers;
const createStore = require("redux").createStore;

/*
 * action types
 */

const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

/*
 * other constants
 */

const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

/*
 * action creators
 */

function addTodo(text) {
  return { type: ADD_TODO, text };
}

function toggleTodo(index) {
  return { type: TOGGLE_TODO, index };
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter };
}

//reducers
const { SHOW_ALL } = VisibilityFilters;

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false,
        },
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed,
          });
        }
        return todo;
      });
    default:
      return state;
  }
}

//各stateのreducerを束ねる
const todoApp = combineReducers({
  visibilityFilter,
  todos,
});

const store = createStore(todoApp);

//dispatchのテスト
console.log(store.getState());

const unsubscribe = store.subscribe(() => {
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
