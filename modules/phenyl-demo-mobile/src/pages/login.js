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
    if (phenylError) {
      switch (phenylError.type) {
        case "NetworkFailed": {
          console.log("networkError");
          return;
        }
        case "Unauthorized": {
          console.log("unauthorized");
          return;
        }
        default:
          throw createError(phenylError);
      }
    }
    const session = getState().phenyl.session;
    const user = getState().phenyl.entities.user[session.userId].origin;
    const versionId = getState().phenyl.entities.user[session.userId].versionId;
    const phenylError = getState().phenyl.error;
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

class LoginScreen extends React.Component {
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
          <TextInput
            style={styles.loginTextInput}
            value=""
            onChangeText={text => {
              this.userName = text;
              console.log(this.userName);
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 30, marginBottom: 10 }}>PassWord</Text>
          <TextInput
            style={styles.loginTextInput}
            value=""
            onChangeText={text => {
              this.password = text;
            }}
          />
        </View>
        <View style={styles.f1acjc}>
          <Button
            onPress={() => {
              // this.props.login({ email: "hoge@example.com", password: "hogehoge" });
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
