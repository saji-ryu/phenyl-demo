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
import { actions } from "phenyl-redux";

const screenSize = Dimensions.get("window");

const memoSelector = state => {
  let memos = state.phenyl.entities.user.hoge.origin.memos;
  memos.sort((a, b) => {
    if (a.id > b.id) {
      return -1;
    } else {
      return 1;
    }
  });
  //console.log(memos);
  return memos;
};
const pageSelector = state => {
  return state.phenyl.entities.user.hoge.origin.page;
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
    handleNewMemo: id => {
      dispatch(
        createMemoOperation(
          {
            id: id,
            title: "newTitle",
            content: "new Memo",
          },
          navigation
        )
      );
    },
    handleTitleButton: pageData => {
      dispatch(pageToOperation(pageData, navigation));
      //navigation.navigate(pageData.name);
    },
    // handlePageInfo: pageData => {
    //   dispatch(pageToOperation(pageData, navigation));
    // },
  };
};

const createMemoOperation = (memoData, navigation) => async (
  dispatch,
  getState
) => {
  let phenylId = getState().phenyl.session.id;
  console.log(phenylId);
  try {
    //dispatch(startSubmit());
    memoData.createdAt = await Date.now();
    memoData.updatedAt = await Date.now();
    memoId = await memoSelector(getState()).length;
    console.log(memoId);
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $push: {
            memos: memoData,
          },
        },
      })
    );
    await dispatch(
      pageToOperation(
        {
          name: "NewMemo",
          id: memoId,
        },
        navigation
      )
    );
  } catch (e) {
    console.log(e);
  }
};

const pageToOperation = (pageData, navigation) => async (
  dispatch,
  getState
) => {
  let phenylId = await getState().phenyl.session.id;
  try {
    //dispatch(startSubmit());
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            page: pageData,
          },
        },
      })
    );
    navigation.navigate(pageData.name);
  } catch (e) {
    console.log(e);
  }
};

class HomeScreen extends React.Component {
  componentDidMount() {
    // this.props.handlePageInfo({
    //   name: "Home",
    //   index: null,
    // });
    this.props.navigation.setParams({
      toNew: () => {
        this.props.handleNewMemo(this.props.memos.length);
      },
    });
  }
  render() {
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
                    id: memo.id,
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
