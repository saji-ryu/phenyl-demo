// @flow
import React, { Component } from "react";
import { StyleSheet, View, TextInput, Dimensions, Button } from "react-native";
import { connect } from "react-redux";
import { pageTo, updateMemo } from "../actions";

const screenSize = Dimensions.get("window");

const selector = state => {
  return state.memos;
};
const pageSelector = state => {
  return state.page;
};

const mapStateToProps = state => {
  return {
    memos: selector(state),
    page: pageSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation: navigation,
    handleUpdateButton: pageData => {
      dispatch(pageTo(pageData));
    },
    handleSaveContent: memoData => {
      dispatch(updateMemo(memoData));
    },
  };
};

class MemoEditScreen extends React.Component {
  componentWillMount() {
    console.log(this);
    this.props.navigation.setParams({
      toUpdate: () => {
        this.props.handleUpdateButton({
          name: "MemoView",
          index: navigation.state.params.index,
        });
      },
      updateTitle: titleText => {
        this.props.handleSaveContent({
          id: this.props.page.index,
          title: titleText,
        });
      },
      //title: this.props.memo[this.props.page.index].title,
    });
  }
  render() {
    return (
      <View style={styles.f1acjc}>
        <TextInput
          multiline
          style={styles.editMemoContent}
          value={
            this.props.memos[
              this.props.memos.length - this.props.page.index - 1
            ].content
          }
          onChangeText={text => {
            this.props.handleSaveContent({
              id: this.props.page.index,
              content: text,
            });
          }}
        />
      </View>
    );
  }
}

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
