// @flow
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import phenylReducer, { createMiddleware } from "phenyl-redux/jsnext";
import PhenylHttpClient from "phenyl-http-client/jsnext";

import LoginScreen from "./src/pages/login";
import HomeScreen from "./src/pages/home";
import MemoViewScreen from "./src/pages/memoView";
import MemoEditScreen from "./src/pages/memoEdit";
import NewMemoScreen from "./src/pages/newMemo";

import { memos, page } from "./src/reducers/index";

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          headerTitle: "UserName",
          //headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toNew();
                //navigation.navigate("NewMemo");
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
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: store.getState().phenyl.entities.user.hoge.origin
            .operatingMemo.title,
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
                navigation.state.params.toHomePage();
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
                navigation.state.params.toViewPage();
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
    NewMemo: {
      screen: NewMemoScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "新規メモ",
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toSave();
              }}
              title="Save"
            />
          ),
          headerLeft: (
            <Button
              onPress={() => {
                navigation.state.params.toHome();
              }}
              title="Back"
            />
          ),
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
  memos,
  page,
  phenyl: phenylReducer,
});
const middlewares = applyMiddleware(
  thunk,
  createMiddleware({
    client: httpClient,
    storeKey: "phenyl",
  })
);
const store = createStore(reducers, middlewares);
console.log(store.getState());
const unsubscribe = store.subscribe(() => {
  let msg = store.getState().phenyl.entities.user
    ? store.getState().phenyl.entities.user
    : store.getState().phenyl;
  console.log(msg);
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  editMemoTitle: {
    height: 25,
    width: 200,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
});
