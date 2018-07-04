// @flow
import { connect } from "react-redux";
import { viewMemoSelector, memosSelector } from "../selectors";
import HomeScreen from "./home";

const mapStateToProps = state => {
  return {
    memos: memosSelector(state),
    sortedMemos: viewMemoSelector(state),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  const { navigation } = ownProps;
  return {
    handleTitleButton: memoId => {
      navigation.navigate("MemoView", { memoId });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
