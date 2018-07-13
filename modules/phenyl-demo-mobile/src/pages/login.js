// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LoginForm from "./loginForm";

type Props = {
  login: Function,
  phenylError: null | Object,
};

const LoginScreen = (props: Props) => (
  <View style={styles.viewStyle}>
    <View style={styles.f1acjc}>
      <Text style={styles.titleText}>MEMO</Text>
    </View>
    <View style={styles.errorField}>
      {props.phenylError &&
        props.phenylError.type === "Unauthorized" && (
          <Text style={styles.errorMessage}>
            メールアドレスかパスワードが間違っています
          </Text>
        )}
      {props.phenylError &&
        props.phenylError.type === "NetworkFailed" && (
          <Text style={styles.errorMessage}>接続に失敗しました。</Text>
        )}
    </View>
    <LoginForm onSubmit={props.login} />
  </View>
);
export default LoginScreen;

const styles = StyleSheet.create({
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  viewStyle: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
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
});
