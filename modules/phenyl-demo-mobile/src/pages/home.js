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

const screenSize = Dimensions.get("window");

// const aaa = (props: Props) => {
//   const { hoge, state } = props;
//   return hoge;
// };

// import hogeAvction from "../../actrions/hoge";
// const mapStateToPtops = (state: State) => {
//   return {
//     oreore: selector(state),
//   }; // selector => pkg named 'reselect'
// };
// const mapDispatchToPtops = (dispatch: Dispatch, ownProps: OwnProps) => {
//   const { navigation } = ownProps;
//   return {
//     handleClickHogeButton: e => {
//       const onSuccess  = (customer) => navigation.navigate('to_home', payload: {customer})
//       const onFalure  = e => navigation.navigate('to_home')
//       dispatch(hogeAvction(e.value, onSuccess, onFalure)).then(
//         onSuccess,
//         onFalure,
//       )
//     },
//   };
// };

// const WrappedAaa = connect(
//   mapStateToPtops,
//   mapDispatchToPtops
// )(aaa);
const selector = state => {
  return state.memos;
};

const mapStateToProps = state => {
  return {
    memos: selector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    handleTitleButton: navigation,
  };
};

const HomeScreen = props => {
  return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: "column" }}>
        {props.memos.map(memo => {
          return (
            <TouchableOpacity
              onPress={() => props.handleTitleButton.navigate("MemoView")}
              style={styles.memoTitle}
            >
              <Text style={{ margin: 10, fontSize: 25 }}>{memo.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

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
