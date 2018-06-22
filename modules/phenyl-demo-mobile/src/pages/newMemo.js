// @flow
import React, { Component } from "react";
import { StyleSheet, View, Button, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

const screenSize = Dimensions.get("window");

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

const NewMemoScreen = props => {
  // this.props.navigation.state.setParam({
  //   onSaveClick: this.props.onSaveClick,
  // });
  return (
    <View style={styles.f1acjc}>
      <TextInput
        multiline
        style={styles.editMemoContent}
        //onChangeText={text => this.setState({ text })}
        value=""
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
)(NewMemoScreen);
