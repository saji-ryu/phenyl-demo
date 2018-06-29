// @flow
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { connect } from "react-redux";
import { pageTo } from "../actions";
import { actions } from "phenyl-redux";

const memoSelector = state => {
  return state.phenyl.entities.user.hoge.origin.memos;
  // let memos = state.phenyl.entities.user.hoge.origin.memos;
  // return memos;
};
const pageSelector = state => {
  return state.phenyl.entities.user.hoge.origin.page;
};

const mapStateToProps = state => {
  return {
    memos: memoSelector(state),
    page: pageSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation: navigation,
    handleEditButton: pageData => {
      dispatch(pageToOperation(pageData));
    },
  };
};

const pageToOperation = pageData => async (dispatch, getState) => {
  let phenylId = getState().phenyl.session.id;
  try {
    //dispatch(startSubmit());
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            page: pageData,
          },
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

class MemoViewScreen extends React.Component {
  componentWillMount() {
    console.log(this.props.page.id);
    console.log(this.props.memos);
    this.props.navigation.setParams({
      toEditPage: () => {
        this.props.handleEditButton({
          name: "MemoEdit",
          id: this.props.page.id,
        });
      },
      title: "あとで治す",
    });
  }
  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 20 }}>
          {
            this.props.memos[this.props.memos.length - this.props.page.id - 1]
              .content
          }
        </Text>
      </View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoViewScreen);
