import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute(props) {
  if (props.loggedIn) {
    return <Route exact component={props.component} path={props.path} />;
  } else {
    return <Redirect to={props.redirect} />;
  }
}
const mapState = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};
const mapDis = (dispatch) => {
  return {};
};
export default connect(mapState, mapDis)(PrivateRoute);
