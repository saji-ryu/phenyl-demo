// @flow
// storeを作る処理を分離

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import phenylReducer, { createMiddleware } from "phenyl-redux/jsnext";
import PhenylHttpClient from "phenyl-http-client/jsnext";
import NavigationService from "../../NavigationService";

const httpClient = new PhenylHttpClient({ url: "http://localhost:8888" });
const reducers = combineReducers({
  phenyl: phenylReducer,
});
const mapActionToNavParams = action => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return ["Home"];
    case "MEMO_TITLE_SELECTED":
      return ["MemoView", { memoId: action.memoId }];
    // editの場合memoIdを取ってくる時にnavigtionに依存している
    case "MEMO_EDIT_SELECTED":
      return ["MemoEdit", { memoId: action.memoId }];
    case "MEMO_CREATED":
      return ["MemoEdit", { memoId: action.memoId }];
    case "PAGE_BACK":
      return ["Back"];
  }
  return null;
};

const navigationMiddleware = store => next => action => {
  const navParams = mapActionToNavParams(action);
  navParams &&
    navParams[0] !== "Back" &&
    NavigationService.navigate(...navParams);
  navParams && navParams[0] === "Back" && NavigationService.goBack();
  return next(action);
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    navigationMiddleware,
    createMiddleware({
      client: httpClient,
      storeKey: "phenyl",
    })
  )
);

const getStore = () => createStore(reducers, enhancer);
export default getStore;
