// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
} from "react-native";

const screenSize = Dimensions.get("window");

export default class LoginScreen extends React.Component {
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
        <View style={styles.f1acjc}>
          <Text style={{ fontSize: 40 }}>MEMO</Text>
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>UserName</Text>
          <TextInput multiline style={styles.loginTextInput} value="" />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>PassWord</Text>
          <TextInput multiline style={styles.loginTextInput} value="" />
        </View>
        <View style={styles.f1acjc}>
          <Button
            onPress={() => this.props.navigation.navigate("Home")}
            title="Login"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginTextInput: {
    height: 40,
    width: screenSize.width - 60,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
