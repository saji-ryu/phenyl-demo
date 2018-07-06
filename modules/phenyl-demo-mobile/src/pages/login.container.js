// @flow
import LoginScreen from "./login";
import { connect } from "react-redux";
import { loginOperation } from "../actions";

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = (dispatch, ownProps) => {
  // const { navigation } = ownProps;
  return {
    login: mobileUser => {
      dispatch(loginOperation(mobileUser));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
