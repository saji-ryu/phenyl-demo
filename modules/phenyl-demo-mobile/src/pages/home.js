// @flow
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { connect } from "react-redux";
import { pageTo, createMemo } from "../actions";

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
    handleNewMemo: id => {
      dispatch(
        createMemo({
          id: id,
          title: "newTitle",
          content: "new Memo",
        })
      );
      dispatch(
        pageTo({
          name: "NewMemo",
          index: id,
        })
      );
    },
    handleTitleButton: pageData => {
      dispatch(pageTo(pageData));
      navigation.navigate(pageData.name);
    },
    handlePageInfo: pageData => {
      dispatch(pageTo(pageData));
    },
  };
};

class HomeScreen extends React.Component {
  componentDidMount() {
    this.props.handlePageInfo({
      name: "Home",
      index: 0,
    });
    this.props.navigation.setParams({
      toNew: () => {
        this.props.handleNewMemo(this.props.memos.length);
      },
    });
  }
  render() {
    console.log("here is" + this.props.page.name);
    return (
      <ScrollView>
        <View style={{ flex: 1, flexDirection: "column" }}>
          {this.props.memos.map(memo => {
            return (
              <TouchableOpacity
                //onPress={() => props.handleTitleButton.navigate("MemoView")}
                onPress={() => {
                  console.log(memo.id);
                  this.props.handleTitleButton({
                    name: "MemoView",
                    index: memo.id,
                  });
                }}
                style={styles.memoTitle}
              >
                <Text style={{ margin: 10, fontSize: 25 }}>{memo.title}</Text>
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
  f1acjc: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
