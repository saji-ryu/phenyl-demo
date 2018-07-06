// @flow
import { connect } from "react-redux";
import { updateOperation } from "../actions";
import { memosSelector } from "../selectors";
import MemoEditScreen from "./memoEdit";

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
    setNavigationParams: obj => navigation.setParams(obj),
    handleUpdateButton: memoData => {
      dispatch(updateOperation(memoData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoEditScreen);
