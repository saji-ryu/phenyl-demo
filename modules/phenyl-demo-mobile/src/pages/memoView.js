// @flow
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { actions } from "phenyl-redux";

const memoSelector = state => {
  return state.phenyl.entities.user.hoge.origin.operatingMemo;
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
    handleEditButton: pageData => {
      dispatch(pageToOperation(pageData, navigation));
    },
    handleBackButton: pageData => {
      dispatch(resetOperatingMemo());
      dispatch(pageToOperation(pageData, navigation));
    },
  };
};

const resetOperatingMemo = (pageData, navigation) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch(startSubmit());
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $set: {
            operatingMemo: {
              title: null,
              id: null,
              content: null,
            },
          },
        },
      })
    );
  } catch (e) {
    console.log(e);
  }
};

const pageToOperation = (pageData, navigation) => async (
  dispatch,
  getState
) => {
  try {
    // dispatch(startSubmit());
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
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

class MemoViewScreen extends React.Component {
  componentDidlMount() {
    this.props.navigation.setParams({
      toEditPage: () => {
        this.props.handleEditButton({
          name: "MemoEdit",
          id: this.props.page.id,
        });
      },
      toHomePage: () => {
        this.props.handleBackButton({
          name: "Home",
          id: null,
        });
      },
      title: "あとで治す",
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
