// @flow
import React from "react";
import { StyleSheet, View, TextInput, Dimensions } from "react-native";
import { connect } from "react-redux";
import { actions } from "phenyl-redux";

const screenSize = Dimensions.get("window");

const memosSelector = state => {
  return state.phenyl.entities.user.hoge.origin.memos;
};

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

const updateOperation = (memoData, navigation) => async (
  dispatch,
  getState
) => {
  try {
    let memos = await memosSelector(getState());

    let memoIndex;
    memos.map((memo, index) => {
      if (memo.id === memoData.id) {
        memoIndex = index;
      }
    });

    let contentKey = "memos[" + memoIndex + "].content";
    let titleKey = "memos[" + memoIndex + "].title";
    let updateAtKey = "memos[" + memoIndex + "].updatedAt";
    let updateTime = Date.now();

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
    navigation.goBack();
  } catch (e) {
    console.log(e);
  }
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
