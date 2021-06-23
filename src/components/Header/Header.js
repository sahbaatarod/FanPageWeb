import React from "react";
import { Button } from "antd";
import { withRouter } from "react-router";
import CustomModal from "../CustomModal";
// Redux
import { connect } from "react-redux";
import { callAction, login, logout } from "../../redux/action";
import { NavLink } from "react-router-dom";
import { firebaseApp } from "../../firebase";

function Header(props) {
  const [show, setShow] = React.useState(false);
  return (
    <div
      style={{
        background: "white",
        padding: "1.5em 2em",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 0 10px #ccc",
      }}
    >
      <NavLink to="/">
        <div style={{ fontWeight: "bold" }}>Fanspage App</div>
      </NavLink>
      <div>
        <CustomModal
          show={show}
          setShow={setShow}
          showCloseIcon={true}
          closeOnMask={true}
          overlayColor={"rgba(0,0,0,.2)"}
          footer={
            <div style={{ display: "flex" }}>
              <Button
                style={{ width: "50%" }}
                onClick={() => {
                  firebaseApp
                    .auth()
                    .signOut()
                    .then(() => {
                      props.logout();
                      setShow(false);
                      props.history.push("/login");
                    });
                }}
                type="primary"
                danger
              >
                Logout
              </Button>
              <Button
                onClick={() => {
                  setShow(false);
                }}
                style={{ width: "50%" }}
                type="primary"
              >
                Cancel
              </Button>
            </div>
          }
        >
          <h5 className="mt-3 text-center">
            Are you sure you want to Logout ?
          </h5>
        </CustomModal>
        <Button
          onClick={() => {
            if (props.loggedIn) {
              setShow(true);
            } else {
              props.history.push("/login");
            }
          }}
          type="primary"
        >
          {props.loggedIn ? "Logout" : "Login"}
          {/* {JSON.stringify(props.loggedIn)} */}
        </Button>
      </div>
    </div>
  );
}

const mapState = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapDis = (dispatch) => {
  return {
    callAction: () => dispatch(callAction()),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDis)(withRouter(Header));
