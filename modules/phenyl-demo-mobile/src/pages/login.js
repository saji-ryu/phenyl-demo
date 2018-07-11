// @flow
import React from "react";
import {
  // StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
} from "react-native";
import LoginForm from "./loginForm";

const screenSize = Dimensions.get("window");

type Props = {
  login: Function,
  phenylError: null | Object,
};

export default class LoginScreen extends React.Component<Props> {
  handleLogin = payload => {
    this.props.login(payload);
  };
  render() {
    console.log(this.props.phenylError);
    return (
      <View style={styles.viewStyle}>
        <View style={styles.f1acjc}>
          <Text style={styles.titleText}>MEMO</Text>
        </View>
        <View style={styles.errorField}>
          {this.props.phenylError && (
            <Text style={styles.errorMessage}>
              メールアドレスかパスワードが間違っています
            </Text>
          )}
        </View>
        <LoginForm onSubmit={this.handleLogin} />
      </View>
    );
  }
}

const styles = {
  loginTextInput: {
    height: 40,
    width: screenSize.width - 60,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 1,
  },
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  f1jc: {
    flex: 1,
    justifyContent: "center",
  },
  viewStyle: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  errorInput: {
    color: "red",
  },
  errorMessage: {
    color: "red",
    fontSize: 15,
  },
  errorField: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: { fontSize: 40 },
  contentText: { fontSize: 30, marginBottom: 10 },
};
