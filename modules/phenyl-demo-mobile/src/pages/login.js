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

const screenSize = Dimensions.get("window");

type Props = {
  login: Function,
  phenylError: null | Object,
};

export default class LoginScreen extends React.Component<Props> {
  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.f1acjc}>
          <Text style={styles.titleText}>MEMO</Text>
        </View>
        <View style={styles.f1jc}>
          <Text style={styles.contentText}>UserName</Text>
          <TextInput
            style={[
              styles.loginTextInput,
              !!this.props.phenylError && styles.errorInput,
            ]}
            value="hoge@example.com" // FIXME:パーシスト入れたら消す
            autoCapitalize="none"
            onChangeText={text => {
              this.userName = text;
            }}
          />
        </View>
        <View style={styles.f1jc}>
          <Text style={styles.contentText}>PassWord</Text>
          <TextInput
            style={[
              styles.loginTextInput,
              !!this.props.phenylError && styles.errorInput,
            ]}
            value="hogehoge" // FIXME:パーシスト入れたら消す
            autoCapitalize="none"
            onChangeText={text => {
              this.password = text;
            }}
          />
        </View>
        <View style={styles.f1acjc}>
          <Button
            onPress={() => {
              this.props.login({
                email: this.userName,
                password: this.password,
              });
            }}
            title="Login"
          />
        </View>
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
  titleText: { fontSize: 40 },
  contentText: { fontSize: 30, marginBottom: 10 },
};
