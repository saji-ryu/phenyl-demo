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
import { connect } from "react-redux";
import { actions } from "phenyl-redux";

const screenSize = Dimensions.get("window");

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    login: mobileUser => {
      dispatch(loginOperation(mobileUser));
    },
    handleTitleButton: navigation,
  };
};

const loginOperation = ({ email, password }) => async (dispatch, getState) => {
  try {
    dispatch(
      actions.assign([
        {
          $set: { error: null },
        },
      ])
    );
    await dispatch(
      actions.login({
        entityName: "user",
        credentials: { email, password },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

const LoginScreen = props => {
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
          onPress={() => {
            props.login({ email: "hoge@example.com", password: "hogehoge" });
            props.navigation.navigate("Home");
          }}
          title="Login"
        />
      </View>
    </View>
  );
};

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
