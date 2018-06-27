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
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toNew();
                navigation.navigate("NewMemo");
              }}
              title="New"
            />
          ),
        };
      },
    },
    MemoView: {
      screen: MemoViewScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: store.getState().memos[
            store.getState().memos.length - store.getState().page.index - 1
          ].title,
          headerBackTitle: null,
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toEditPage();
                navigation.navigate("MemoEdit");
              }}
              title="Edit"
            />
          ),
        };
      },
    },
    MemoEdit: {
      screen: MemoEditScreen,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: (
            <TextInput
              style={styles.editMemoTitle}
              value={
                store.getState().memos[
                  store.getState().memos.length -
                    store.getState().page.index -
                    1
                ].title
              }
              onChangeText={text => {
                navigation.state.params.updateTitle(text);
              }}
            />
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
      navigationOptions: ({ navigation }) => {
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
          headerTitle: (
            <TextInput
              style={styles.editMemoTitle}
              value=""
              onChangeText={text => {
                navigation.state.params.saveTitle(text);
              }}
            />
          ),
          headerRight: (
            <Button
              onPress={() => {
                navigation.state.params.toSave;
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
    height: 25,
    width: 200,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
});
