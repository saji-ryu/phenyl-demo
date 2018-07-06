// @flow
// 以下を使ってApp.jsをこっちに持ってくる
import React from "react";
import { Provider } from "react-redux";
import createRootNavigator from "./createRootNavigator";
import createStore from "./store";
import NavigationService from "../../NavigationService";

const store = createStore();
const RootStack = createRootNavigator(store);
const App = () => (
  <Provider store={store}>
    <RootStack
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  </Provider>
);

export default App;
