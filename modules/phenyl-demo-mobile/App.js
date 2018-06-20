/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

import { StackNavigator } from "react-navigation";
const screenSize = Dimensions.get("window");

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: "Memo",
      headerBackTitle: null,
      headerRight: (
        <Button
          onPress={() => navigation.navigate("NewMemo")}
          title="New"
          style={{
            height: 40,
            width: screenSize.width,
            fontSize: 20,
            borderColor: "#424242",
            borderWidth: 0.5,
          }}
        />
      ),
    };
  };

  render() {
    let titles = [];
    for (let index = 0; index < 10; index++) {
      titles.push(
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("ContentView")}
          style={styles.memoTitle}
        >
          <Text style={{ margin: 10, fontSize: 25 }}>Title{index + 1}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "column" }}>{titles}</View>
        {/* {titles} */}
      </ScrollView>
    );
  }
}

class ContentViewScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: "タイトルが入る",
      headerBackTitle: "Save",
      headerRight: (
        <Button
          onPress={() => navigation.navigate("ContentEdit")}
          title="Edit"
          style={{
            height: 40,
            width: screenSize.width,
            fontSize: 20,
            borderColor: "#424242",
            borderWidth: 0.5,
          }}
        />
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 20 }}>メモの内容です</Text>
      </View>
    );
  }
}

class ContentEditScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: (
        <TextInput
          style={{
            height: 30,
            width: 200,
            fontSize: 20,
            borderColor: "#424242",
            borderRadius: 5,
            borderWidth: 0.5,
          }}
          //onChangeText={text => this.setState({ text })}
          value="編集できる"
        />
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          multiline
          style={{
            height: screenSize.height - 100,
            width: screenSize.width - 20,
            fontSize: 20,
            borderColor: "#424242",
            borderRadius: 5,
            borderWidth: 0.5,
          }}
          //onChangeText={text => this.setState({ text })}
          value="メモの内容です"
        />
      </View>
    );
  }
}

class newMemoScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: (
        <TextInput
          style={{
            height: 30,
            width: 200,
            fontSize: 20,
            borderColor: "#424242",
            borderRadius: 5,
            borderWidth: 0.5,
          }}
          //onChangeText={text => this.setState({ text })}
          value=""
        />
      ),
      headerRight: (
        <Button
          onPress={() => navigation.navigate("Home")}
          title="Save"
          style={{
            height: 40,
            width: screenSize.width,
            fontSize: 20,
            borderColor: "#424242",
            borderWidth: 0.5,
          }}
        />
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          multiline
          style={{
            height: screenSize.height - 100,
            width: screenSize.width - 20,
            fontSize: 20,
            borderColor: "#424242",
            borderRadius: 5,
            borderWidth: 0.5,
          }}
          //onChangeText={text => this.setState({ text })}
          value=""
        />
      </View>
    );
  }
}

class loginScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: "Login",
      headerBackTitle: "Logout",
    };
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          margin: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 40 }}>MEMO</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>UserName</Text>
          <TextInput
            multiline
            style={{
              height: 40,
              width: screenSize.width - 60,
              fontSize: 20,
              borderColor: "#424242",
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            //onChangeText={text => this.setState({ text })}
            value=""
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>PassWord</Text>
          <TextInput
            multiline
            style={{
              height: 40,
              width: screenSize.width - 60,
              fontSize: 20,
              borderColor: "#424242",
              borderRadius: 5,
              borderWidth: 0.5,
            }}
            value=""
          />
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            style={{
              width: 200,
              height: 40,
              fontSize: 40,
              backgroundColor: "blue",
            }}
            title="Login"
          />
        </View>
      </View>
    );
  }
}

const RootStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    ContentView: {
      screen: ContentViewScreen,
    },
    ContentEdit: {
      screen: ContentEditScreen,
    },
    Login: {
      screen: loginScreen,
    },
    NewMemo: {
      screen: newMemoScreen,
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

const styles = StyleSheet.create({
  memoTitle: {
    height: 65,
    backgroundColor: "#efefef",
    borderWidth: 0.5,
    borderColor: "#adadad",
  },
});
