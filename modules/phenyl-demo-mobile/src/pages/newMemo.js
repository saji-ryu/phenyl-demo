// @flow
import React, { Component } from "react";
import { StyleSheet, View, Button, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";
import { pageTo, updateMemo } from "../actions";
import { actions } from "phenyl-redux";

const screenSize = Dimensions.get("window");

const selector = state => {
  return state.phenyl.entities.user.hoge.origin.memos;
};
const pageSelector = state => {
  return state.phenyl.entities.user.hoge.origin.page;
};
const mapStateToProps = state => {
  return {
    memo: selector(state),
    page: pageSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    navigation: navigation,
    handleSaveButton: (pageData, navigation) => {
      dispatch(pageToOperation(pageData, navigation));
    },
    handleSaveContent: memoData => {
      dispatch(updateMemoOperation(memoData));
    },
  };
};

const pageToOperation = (pageData, navigation) => async (
  dispatch,
  getState
) => {
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
    await navigation.navigate("Home");
  } catch (e) {
    console.log(e);
  }
};

const updateMemoOperation = memoData => async (dispatch, getState) => {
  let phenylId = getState().phenyl.session.id;
  try {
    //dispatch(startSubmit());
    let contentKey = "memos[" + memoData.id + "].content";
    let titleKey = "memos[" + memoData.id + "].title";
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        //のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            [contentKey]: memoData.content,
            [titleKey]: memoData.title,
          },
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

class NewMemoScreen extends React.Component {
  componentDidMount() {
    //console.log(this);
    this.props.navigation.setParams({
      toSave: () => {
        this.props.handleSaveContent({
          id: this.props.page.index,
          title: this.props.navigation.state.params.title,
          content: this.inputContent,
        });
        this.props.handleSaveButton(
          {
            name: "Home",
          },
          this.props.navigation
        );
      },
      // saveTitle: titleText => {
      //   this.props.handleSaveContent({
      //     id: this.props.page.index,
      //     title: titleText,
      //     content: this.inputContent,
      //   });
      // },
      //title: this.props.memo[this.props.page.index].title,
      title: "testあとで変更",
    });
  }
  render() {
    return (
      <View style={styles.f1acjc}>
        <TextInput
          multiline
          style={styles.editMemoContent}
          //onChangeText={text => this.setState({ text })}
          value=""
          // onChangeText={text => {
          //   this.props.handleSaveContent({
          //     id: this.props.page.index,
          //     content: text,
          //   });
          // }}
          onChangeText={text => {
            this.inputContent = text;
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
)(NewMemoScreen);
