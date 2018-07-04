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

import NavigationService from "./NavigationService";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          headerTitle: "UserName",
          // headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                store.dispatch(createMemoOperation(navigation));
              }}
              title="New"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                store.dispatch(logoutOperation(navigation));
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
          headerTitle: () => <Text>あああ</Text>,
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                navigation.navigate("MemoEdit", {
                  memoId: navigation.getParam("memoId", null),
                });
              }}
              title="Edit"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                navigation.goBack();
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
                navigation.goBack();
              }}
              title="Back"
            />
          ),
        };
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => {
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
  }
  return null;
};

const navigationMiddleware = store => next => action => {
  const navParams = mapActionToNavParams(action);
  navParams && NavigationService.navigate(...navParams);
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
