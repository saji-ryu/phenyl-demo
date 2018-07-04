// @flow
import React from "react";
import { createStackNavigator } from "react-navigation";
import { Text, Button } from "react-native";

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import phenylReducer, { createMiddleware } from "phenyl-redux/jsnext";
import PhenylHttpClient from "phenyl-http-client/jsnext";

import LoginScreen from "./src/pages/login";
import HomeScreen from "./src/pages/home";
import MemoViewScreen from "./src/pages/memoView";
import MemoEditScreen from "./src/pages/memoEdit";

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
                navigation.state.params.toNew();
                // navigation.navigate("NewMemo");
              }}
              title="New"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                navigation.state.params.toLogout();
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
                store.getState().phenyl.entities.user.hoge.origin.operatingMemo
                  .title
              }
            </Text>
          ),
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toEditPage();
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

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
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
        <RootStack />
      </Provider>
    );
  }
}
