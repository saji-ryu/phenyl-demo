// @flow
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import LoginScreen from "./src/pages/login";
import HomeScreen from "./src/pages/home";
import MemoViewScreen from "./src/pages/memoView";
import MemoEditScreen from "./src/pages/memoEdit";
import NewMemoScreen from "./src/pages/newMemo";

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    MemoView: {
      screen: MemoViewScreen,
    },
    MemoEdit: {
      screen: MemoEditScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    NewMemo: {
      screen: NewMemoScreen,
    },
  },
  {
    initialRouteName: "Login",
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
