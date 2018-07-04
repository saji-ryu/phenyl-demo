// @flow
import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import type { Memo } from "../types";

const screenSize = Dimensions.get("window");

type Props = {
  memo: Memo,
  setNavigationParams: Function,
  handleUpdateButton: Function,
};

export default class MemoEditScreen extends React.Component<Props> {
  componentDidMount() {
    this.inputContent = this.props.memo.content;
    this.inputTitle = this.props.memo.title;
    this.props.setNavigationParams({
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
