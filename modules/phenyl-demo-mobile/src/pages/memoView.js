// @flow
import React, { Component } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { connect } from "react-redux";

const selector = state => {
  return state.memos;
};

const mapStateToProps = state => {
  return {
    memos: selector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    handleTitleButton: navigation,
  };
};

const MemoViewScreen = props => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <Text style={{ fontSize: 20 }}>{props.memos[1].content}</Text>
    </View>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoViewScreen);
