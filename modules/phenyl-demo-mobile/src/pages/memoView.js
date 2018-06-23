// @flow
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { connect } from "react-redux";
import { pageTo } from "../actions";

const memoSelector = state => {
  return state.memos;
};
const pageSelector = state => {
  return state.page;
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
      dispatch(pageTo(pageData));
    },
  };
};

class MemoViewScreen extends React.Component {
  componentWillMount() {
    console.log(this.props.page.index);
    this.props.navigation.setParams({
      toEditPage: () => {
        this.props.handleEditButton({
          name: "MemoEdit",
          index: navigation.state.params.index,
        });
      },
      title: this.props.memos[
        this.props.memos.length - this.props.page.index - 1
      ].title,
    });
  }
  render() {
    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Text style={{ fontSize: 20 }}>
          {
            this.props.memos[
              this.props.memos.length - this.props.page.index - 1
            ].content
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
