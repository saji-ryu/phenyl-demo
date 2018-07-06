// @flow
import React from "react";
import { createStackNavigator } from "react-navigation";
import { Text, Button } from "react-native";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import phenylReducer, { createMiddleware } from "phenyl-redux/jsnext";
import PhenylHttpClient from "phenyl-http-client/jsnext";

import LoginScreen from "./src/pages/login.container";
import HomeScreen from "./src/pages/home.container";
import MemoViewScreen from "./src/pages/memoView.container";
import MemoEditScreen from "./src/pages/memoEdit.container";
import { createMemoOperation, logoutOperation } from "./src/actions";
import { memosSelector } from "./src/selectors";

import NavigationService from "./NavigationService";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "UserName",
          // headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                store.dispatch(createMemoOperation());
              }}
              title="New"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                store.dispatch(logoutOperation());
              }}
              title="Logout"
            />
          ),
        };
      },
    },
    MemoView: {
      screen: MemoViewScreen,
      // TODO: idをparamsからとってきて、memoに突っ込む
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: () => (
            <Text>
              {
                memosSelector(store.getState())[
                  navigation.getParam("memoId", null)
                ].title
              }
            </Text>
          ),
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                // TODO:まだnavigation依存してる
                store.dispatch({
                  type: "MEMO_EDIT_SELECTED",
                  memoId: navigation.getParam("memoId", null),
                });
              }}
              title="Edit"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                store.dispatch({ type: "PAGE_BACK" });
              }}
              title="Home"
            />
          ),
        };
      },
    },
    MemoEdit: {
      screen: MemoEditScreen,
      navigationOptions: ({ navigation }) => {
        return {
          // TODO: newの時は変えたいので本当はparamsで渡すのを描画すべき
          headerTitle: "Edit",
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toUpdate();
              }}
              title="Save"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                store.dispatch({ type: "PAGE_BACK" });
              }}
              title="Back"
            />
          ),
        };
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: () => {
        return {
          headerTitle: "Login",
        };
      },
    },
  },
  {
    initialRouteName: "Login",
  }
);

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
const store = createStore(reducers, enhancer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}
