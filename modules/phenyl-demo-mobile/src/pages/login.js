// @flow
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { loginOperation } from "../actions";

const screenSize = Dimensions.get("window");

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    login: mobileUser => {
      dispatch(loginOperation(mobileUser, navigation));
    },
  };
};

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.f1acjc}>
          <Text style={styles.titleText}>MEMO</Text>
        </View>
        <View style={styles.f1jc}>
          <Text style={styles.contentText}>UserName</Text>
          <TextInput
            style={styles.loginTextInput}
            value="hoge@example.com" // FIXME:パーシスト入れたら消す
            autoCapitalize="none"
            onChangeText={text => {
              this.userName = text;
              console.log(this.userName);
            }}
          />
        </View>
        <View style={styles.f1jc}>
          <Text style={styles.contentText}>PassWord</Text>
          <TextInput
            style={styles.loginTextInput}
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

const styles = StyleSheet.create({
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
  titleText: { fontSize: 40 },
  contentText: { fontSize: 30, marginBottom: 10 },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
