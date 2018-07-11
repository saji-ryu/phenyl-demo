// @flow
// createStackNavigator使う処理を分離
import React from "react";
import { createStackNavigator } from "react-navigation";
import { Text, Button, StyleSheet } from "react-native";

import LoginScreen from "../pages/login.container";
import HomeScreen from "../pages/home.container";
import MemoViewScreen from "../pages/memoView.container";
import MemoEditScreen from "../pages/memoEdit.container";
import { createMemoOperation, logoutOperation } from "../actions";
import { memosSelector, sessionSelector } from "../selectors";

const createRootNavigator = store => {
  return createStackNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: () => {
          return {
            // headerTitle: "UserName",
            headerTitle: () => (
              <Text style={styles.headerTitle}>
                {sessionSelector(store.getState()).userId}のメモ
              </Text>
            ),
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
        navigationOptions: ({ navigation }) => {
          return {
            headerTitle: () => (
              <Text style={styles.headerTitle}>
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
            headerTitle: () => (
              <Text style={styles.headerTitle}>
                {navigation.getParam("pageTitle", null)}
              </Text>
            ),
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
                  // store.dispatch({ type: "PAGE_BACK" });
                  navigation.state.params.goBack();
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
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
  },
});

/* createStackNavigatorつかってRootNavigator返す */
export default createRootNavigator;
