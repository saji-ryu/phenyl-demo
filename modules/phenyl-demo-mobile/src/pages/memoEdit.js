// @flow
import React, { Component } from "react";
import { StyleSheet, View, TextInput, Dimensions, Button } from "react-native";
import { connect } from "react-redux";

const screenSize = Dimensions.get("window");

const selector = state => {
  return state.memos;
};

const mapStateToProps = state => {
  return {
    memo: selector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    handleTitleButton: navigation,
  };
};

const MemoEditScreen = props => {
  return (
    <View style={styles.f1acjc}>
      <TextInput
        multiline
        style={styles.editMemoContent}
        value={props.memo.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  editMemoContent: {
    height: screenSize.height - 100,
    width: screenSize.width - 20,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
  },
  editMemoTitle: {
    height: 30,
    width: 200,
    fontSize: 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 0.5,
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
)(MemoEditScreen);
