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
import { actions } from "phenyl-redux";

const viewMemoSelector = state => {
  // let viewMemos = state.phenyl.entities.user.hoge.origin.memos;
  let sortedMemos;
  if (state.phenyl.entities.user.hoge.origin.memos) {
    sortedMemos = state.phenyl.entities.user.hoge.origin.memos.slice();
    sortedMemos.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else {
        return 1;
      }
    });
  } else {
    sortedMemos = [];
  }
  // console.log(memos);
  return sortedMemos;
};
const pageSelector = state => {
  return state.phenyl.entities.user.hoge.origin.page;
};
const memoSelector = state => {
  return state.phenyl.entities.user.hoge.origin.memos;
};
const mapStateToProps = state => {
  return {
    memos: memoSelector(state),
    sortedMemos: viewMemoSelector(state),
    page: pageSelector(state),
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

const logoutOperation = navigation => async (dispatch, getState) => {
  try {
    let session = getState().phenyl.session;
    await dispatch(
      actions.logout({
        sessionId: session.id,
        userId: session.userId,
        entityName: session.entityName,
      })
    );
    navigation.navigate("Login");
  } catch (e) {
    console.log(e);
  }
};

const createMemoOperation = (memoData, navigation) => async (
  dispatch,
  getState
) => {
  // let phenylId = getState().phenyl.session.id;
  // console.log(phenylId);
  try {
    // dispatch(startSubmit());
    memoData.createdAt = Date.now();
    memoData.updatedAt = Date.now();
    await dispatch(
      actions.commitAndPush({
        entityName: "user",
        // のちにユーザー名に
        id: "hoge",
        operation: {
          $push: {
            memos: memoData,
          },
        },
      })
    );

    const memoLength = memoSelector(getState()).length;
    navigation.navigate("NewMemo", { memoLength });
  } catch (e) {
    console.log(e);
  }
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
