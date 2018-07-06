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
  return {
    handleTitleButton: memoId => {
      dispatch({ type: "MEMO_TITLE_SELECTED", memoId: memoId });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
