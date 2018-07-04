// @flow
import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";

import { actions } from "phenyl-redux";

const screenSize = Dimensions.get("window");

const memoSelector = state => {
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
    handleSave: memoData => {
      dispatch(updateMemoOperation(memoData, navigation));
    },
    handleBack: () => {
      dispatch(backHomeOperation(navigation));
    },
  };
};

const backHomeOperation = navigation => async (dispatch, getState) => {
  try {
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            page: { name: "Home", id: null },
          },
        },
      })
    );
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            operatingMemo: { title: null, id: null, content: null },
          },
        },
      })
    );
    navigation.navigate("Home");
  } catch (e) {
    console.log(e);
  }
};

const updateMemoOperation = (memoData, navigation) => async (
  dispatch,
  getState
) => {
  try {
    const memos = await memoSelector(getState());
    let memoIndex;
    await memos.map((memo, index) => {
      if (memo.id === memoData.id) {
        memoIndex = index;
      }
    });
    const contentKey = "memos[" + memoIndex + "].content";
    const titleKey = "memos[" + memoIndex + "].title";
    const updateAtKey = "memos[" + memoIndex + "].updatedAt";
    const updateTime = Date.now();
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
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
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            page: { name: "Home", id: null },
          },
        },
      })
    );
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            operatingMemo: { title: null, id: null, content: null },
          },
        },
      })
    );
    navigation.navigate("Home");
  } catch (e) {
    console.log(e);
  }
};

class NewMemoScreen extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      toSave: () => {
        this.props.handleSave({
          id: this.props.page.id,
          title: this.inputTitle,
          content: this.inputContent,
        });
      },
      toHome: () => {
        this.props.handleBack();
      },
      title: "testあとで変更",
    });
  }
  render() {
    return (
      <View style={styles.f1acjc}>
        <TextInput
          style={styles.editMemoTitle}
          value="title"
          onChangeText={text => {
            this.inputTitle = text;
          }}
        />
        <TextInput
          multiline
          style={styles.editMemoContent}
          value="memo"
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
)(NewMemoScreen);
