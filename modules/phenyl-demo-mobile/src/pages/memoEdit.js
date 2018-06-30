// @flow
import React, { Component } from "react";
import { StyleSheet, View, TextInput, Dimensions, Button } from "react-native";
import { connect } from "react-redux";
import { pageTo, updateMemo } from "../actions";
import { page } from "../reducers";
import { actions } from "phenyl-redux";

const screenSize = Dimensions.get("window");

const memoSelector = state => {
  return state.phenyl.entities.user.hoge.origin.operatingMemo;
};
const memosSelector = state => {
  return state.phenyl.entities.user.hoge.origin.memos;
};
const pageSelector = state => {
  return state.phenyl.entities.user.hoge.origin.page;
};

const mapStateToProps = state => {
  return {
    memo: memoSelector(state),
    page: pageSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation: navigation,
    handleUpdateButton: (memoData, pageData) => {
      dispatch(updateOperation(memoData, pageData, navigation));
    },
    handleBackButton: pageData => {
      dispatch(backOperation(pageData, navigation));
    },
  };
};

const updateOperation = (memoData, pageData, navigation) => async (
  dispatch,
  getState
) => {
  try {
    let phenylId = getState().phenyl.session.id;
    let memos = await memosSelector(getState());
    console.log("memos:" + JSON.stringify(memos));
    let memoIndex;
    memos.map((memo, index) => {
      if (memo.id == memoData.id) {
        memoIndex = index;
      }
    });
    console.log(memoIndex);
    let contentKey = "memos[" + memoIndex + "].content";
    let titleKey = "memos[" + memoIndex + "].title";
    let updateAtKey = "memos[" + memoIndex + "].updatedAt";
    let updateTime = Date.now();
    console.log("before update");
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            [contentKey]: memoData.content,
            [titleKey]: memoData.title,
            [updateAtKey]: updateTime,
          },
        },
      })
    );
    await console.log("memos:" + JSON.stringify(memosSelector(getState())));
    await console.log("before page data");
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
    console.log("before operatingmemo");
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            operatingMemo: memoData,
          },
        },
      })
    );
    navigation.navigate("MemoView");
  } catch (e) {
    console.log(e);
  }
};

const backOperation = (pageData, navigation) => async (dispatch, getState) => {
  let phenylId = getState().phenyl.session.id;
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

class MemoEditScreen extends React.Component {
  componentWillMount() {
    this.inputContent = this.props.memo.content;
    this.inputTitle = this.props.memo.title;
    this.props.navigation.setParams({
      toUpdate: () => {
        this.props.handleUpdateButton(
          {
            id: this.props.page.id,
            title: this.inputTitle,
            content: this.inputContent,
          },
          { id: this.props.page.id, name: "MemoView" }
        );
      },
      toViewPage: () => {
        this.props.handleBackButton({
          id: this.props.page.id,
          name: "MemoView",
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
