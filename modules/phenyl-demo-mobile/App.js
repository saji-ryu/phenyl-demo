// @flow
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Provider, connect } from "react-redux";
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

import LoginScreen from "./src/pages/login";
import HomeScreen from "./src/pages/home";
import MemoViewScreen from "./src/pages/memoView";
import MemoEditScreen from "./src/pages/memoEdit";
import NewMemoScreen from "./src/pages/newMemo";

import { createStore } from "redux";
import memoApp from "./src/reducers/index";

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          headerTitle: "UserName",
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => navigation.navigate("NewMemo")}
              title="New"
            />
          ),
        };
      },
    },
    MemoView: {
      screen: MemoViewScreen,
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          headerTitle: "タイトルが入る",
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => navigation.navigate("MemoEdit")}
              title="Edit"
            />
          ),
        };
      },
    },
    MemoEdit: {
      screen: MemoEditScreen,
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          headerTitle: (
            <TextInput style={styles.editMemoTitle} value="編集できる" />
          ),
          headerRight: (
            <Button
              onPress={() => navigation.navigate("MemoView")}
              title="Save"
            />
          ),
        };
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation, navigationOptions }) => {
        return {
          headerTitle: "Login",
          headerBackTitle: "Logout",
        };
      },
    },
    NewMemo: {
      screen: NewMemoScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: <TextInput style={styles.editMemoTitle} value="" />,
          headerRight: (
            <Button
              onPress={() => {
                // let dispatchSaveMemo = navigation.gegetParam("onSaveClick");
                // dispatchSaveMemo({
                //   id: 1,
                //   title: "test title",
                //   content: "this is test content",
                // });
                navigation.navigate("Home");
              }}
              title="Save"
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

const store = createStore(memoApp);

console.log(store.getState());
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
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
    height: 30,
    width: 200,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
});
