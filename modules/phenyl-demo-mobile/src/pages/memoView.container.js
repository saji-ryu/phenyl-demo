// @flow
import { connect } from "react-redux";
import { memoByIdSelector } from "../selectors";
import MemoViewScreen from "./memoView";

const mapStateToProps = (state, ownProps) => {
  const { navigation } = ownProps;
  const memoId = navigation.getParam("memoId", null);
  return {
    memo: memoByIdSelector(state, memoId),
  };
};

export default connect(mapStateToProps)(MemoViewScreen);
