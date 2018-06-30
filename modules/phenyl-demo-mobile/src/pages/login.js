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
      dispatch(loginOperation(mobileUser, navigation));
    },
  };
};

const loginOperation = ({ email, password }, navigation) => async (
  dispatch,
  getState
) => {
  try {
    console.log("before error null");
    await dispatch(
      actions.assign([
        {
          $set: { error: null },
        },
      ])
    );
    console.log("before user login");
    await dispatch(
      actions.login({
        entityName: "user",
        credentials: { email, password },
      })
    );
    const session = getState().phenyl.session;
    const user = getState().phenyl.entities.user[session.userId].origin;
    const versionId = getState().phenyl.entities.user[session.userId].versionId;
    //const session = getLoggedInSession(getState());
    console.log("before follow");
    await dispatch(actions.follow("user", user, versionId));
    console.log("before set operationMemo");
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            operatingMemo: {
              content: null,
              title: null,
              id: null,
            },
          },
        },
      })
    );
    console.log("before page chnge");
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            page: {
              name: "Home",
              id: null,
            },
          },
        },
      })
    );
    navigation.navigate("Home");
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
