// @flow
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { createMemoOperation, logoutOperation } from "../actions";
import { viewMemoSelector, memosSelector } from "../selectors";

const mapStateToProps = state => {
  return {
    memos: memosSelector(state),
    sortedMemos: viewMemoSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation: navigation,
    handleNewMemo: id => {
      console.log(id);
      dispatch(
        createMemoOperation(
          {
            id: id,
            title: "new Title",
            content: "new Memo",
          },
          navigation
        )
      );
    },
    handleTitleButton: memoId => {
      navigation.navigate("MemoView", { memoId });
    },
    handleLogout: () => {
      dispatch(logoutOperation(navigation));
    },
  };
};

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      toNew: () => {
        this.props.handleNewMemo(this.props.memos.length);
      },
      toLogout: () => {
        this.props.handleLogout({
          name: "Login",
          id: null,
        });
      },
    });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.viewStyle}>
          {this.props.sortedMemos.map(memo => {
            const { id, title } = memo;
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  this.props.handleTitleButton(id);
                }}
                style={styles.memoTitle}
              >
                <Text style={styles.memoTitleText}>{title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  memoTitle: {
    height: 65,
    backgroundColor: "#efefef",
    borderWidth: 0.5,
    borderColor: "#adadad",
  },
  viewStyle: {
    flex: 1,
    flexDirection: "column",
  },
  memoTitleText: {
    margin: 10,
    fontSize: 25,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
