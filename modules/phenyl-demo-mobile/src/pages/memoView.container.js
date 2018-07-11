// @flow
import { connect } from "react-redux";
import { memoByIdSelector } from "../selectors";
import MemoViewScreen from "./memoView";
import deleteMemoOperation from "../actions";

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const memoId = navigation.getParam("memoId", null);
  return {
    memo: memoByIdSelector(state, memoId),
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDeleteButton: memoId => {
      dispatch(deleteMemoOperation(memoId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemoViewScreen);
