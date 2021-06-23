import React, { useEffect } from "react";

// Router
import { Switch, Route, withRouter } from "react-router-dom";

// Redux
import { admin, notAdmin } from "./redux/action";
import { connect } from "react-redux";

// Components
import Home from "./routes/Home/Home";
import ErrorComp from "./routes/ErrorComp/ErrorComp";
import Register from "./routes/Register/Register";
import Login from "./routes/Login/Login";

// Private Components
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// Firebase
import { firebaseApp } from "./firebase";

// NProgress
import NProgress from "nprogress";
NProgress.configure({ showSpinner: true });

function App({ history, admin, notAdmin }) {
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      console.log(user.uid);
      if (user.uid === "2EUUBTaDQlVNkM35RC8nU39zvrD2") {
        admin();
      } else {
        return notAdmin();
      }
    });
    history.listen(() => {
      NProgress.start();
      NProgress.done();
    });
  }, []);
  return (
    <Switch>
      <Route exact component={Login} path="/login" />
      <Route exact component={Register} path="/register" />
      <PrivateRoute component={Home} path="/" redirect="/login" />
      <Route component={ErrorComp} />
    </Switch>
  );
}
const mapState = (state) => {
  return {
    admin: state.admin,
  };
};
const mapDis = (dispatch) => {
  return {
    admin: () => dispatch(admin()),
    notAdmin: () => dispatch(notAdmin()),
  };
};
export default connect(mapState, mapDis)(withRouter(App));
