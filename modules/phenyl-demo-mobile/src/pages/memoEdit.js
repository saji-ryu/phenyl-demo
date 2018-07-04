// @flow
import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";
import { updateOperation } from "../actions";
import { memosSelector } from "../selectors";

const screenSize = Dimensions.get("window");

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const memoId = navigation.getParam("memoId", null);
  return {
    memo: memosSelector(state)[memoId],
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation: navigation,
    handleUpdateButton: memoData => {
      dispatch(updateOperation(memoData, navigation));
    },
  };
};

class MemoEditScreen extends React.Component {
  componentDidMount() {
    this.inputContent = this.props.memo.content;
    this.inputTitle = this.props.memo.title;
    this.props.navigation.setParams({
      toUpdate: () => {
        this.props.handleUpdateButton({
          id: this.props.memo.id,
          title: this.inputTitle,
          content: this.inputContent,
        });
      },
    });
  }
  render() {
    return (
      <View style={styles.f1acjc}>
        <TextInput
          style={styles.editMemoTitle}
          value={this.props.memo.title}
          onChangeText={text => {
            this.inputTitle = text;
          }}
        />
        <TextInput
          multiline
          style={styles.editMemoContent}
          value={this.props.memo.content}
          onChangeText={text => {
            this.inputContent = text;
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  editMemoTitle: {
    marginBottom: 15,
    fontSize: 20,
    height: 40,
    width: screenSize.width - 20,
    borderColor: "#424242",
    borderRadius: 5,
    borderWidth: 1,
  },
  editMemoContent: {
    height: screenSize.height - 140,
    width: screenSize.width - 20,
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
)(MemoEditScreen);
