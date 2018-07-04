// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { memosSelector } from "../selectors";

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
    handleEditButton: () => {
      navigation.navigate("MemoEdit", {
        memoId: navigation.getParam("memoId", null),
      });
    },
  };
};

class MemoViewScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      toEditPage: () => {
        this.props.handleEditButton();
      },
    });
  }
  render() {
    return (
      <View style={styles.viewStyle}>
        <Text style={styles.connectText}>{this.props.memo.content}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    margin: 10,
  },
  connectText: {
    fontSize: 20,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoViewScreen);
