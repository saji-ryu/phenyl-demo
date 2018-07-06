// @flow
// createStackNavigator使う処理を分離
import React from "react";
import { createStackNavigator } from "react-navigation";
import { Text, Button } from "react-native";

import LoginScreen from "../pages/login.container";
import HomeScreen from "../pages/home.container";
import MemoViewScreen from "../pages/memoView.container";
import MemoEditScreen from "../pages/memoEdit.container";
import { createMemoOperation, logoutOperation } from "../actions";
import { memosSelector } from "../selectors";

const createRootNavigator = store => {
  return createStackNavigator(
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
};
/* createStackNavigatorつかってRootNavigator返す */
export default createRootNavigator;
