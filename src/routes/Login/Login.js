import React from "react";
// Redux
import { connect } from "react-redux";
import { admin, login } from "../../redux/action";

// Google button
import GoogleButton from "react-google-button";

// Firebase
import { firebaseApp, auth, googleProvider } from "../../firebase";

// React Router
import { NavLink, withRouter } from "react-router-dom";
// Antd
import { Button } from "antd";
// Components
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";
import Input from "../../components/Email/Input";
import Pass from "../../components/Password/Input";
import Aos from "aos";
import classes from "../../components/Email/Input.module.scss";

// Notification
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { openTopNotif } from "../../components/NotifTop";

// Formik

import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "aos/dist/aos.css";
const validationSchema = yup.object({
  email: yup
    .string()
    .typeError("* Enter a valid email")
    .email("* Enter a valid email")
    .required("* Please enter your email"),
  password: yup
    .string()
    .typeError("* Enter a valid password")
    .max(10, "* Password must be less than 10 letters")
    .required("* Please enter your password"),
});

const initialValues = {
  email: "",
  password: "",
};

// Firebase

function Login(loginProps) {
  const [loading, setLoading] = React.useState(false);
  const login = async (email, password) => {
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password);
      openTopNotif(
        "Logged In !",
        <CheckCircleOutlined
          style={{ color: "#1cd777", transform: "translate(0 ,-4px)" }}
        ></CheckCircleOutlined>,
        4
      );
      loginProps.login();
      loginProps.history.push("/");
    } catch (error) {
      console.log(error);
      openTopNotif(
        error.message,
        <CloseCircleOutlined
          style={{ color: "red", transform: "translate(0 ,-4px)" }}
        ></CloseCircleOutlined>,
        4
      );
      return setLoading(false);
    }
  };
  const onSubmit = (values) => {
    console.log(values);
    setLoading(true);
    login(values.email, values.password);
  };
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Layout title="Login User">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card borderRadius="4px" width="400px" boxShadow="0 0 10px #dadada">
          <h5 className="text-center pb-3">Login User</h5>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(props) => {
              return (
                <Form>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Input
                      styleClass={classes.blue}
                      resetValue={() => props.setFieldValue("email", "")}
                      setValue={(e) =>
                        props.setFieldValue("email", e.target.value)
                      }
                      value={props.values.email}
                      onBlur={() => props.setFieldTouched("email")}
                      placeholder="Email"
                      dir="ltr"
                      borderRadius="4px"
                      border={
                        props.touched.email && props.errors.email
                          ? "1px solid red"
                          : ""
                      }
                      height="32px"
                      width="250px"
                      mobileWidth={"250px"}
                      icon={require("../../img/email.svg")}
                      deleteIcon={
                        <img
                          data-aos="fade-in"
                          style={{ width: "14px" }}
                          src={require("../../img/close-filled.svg")}
                          alt="delete"
                        ></img>
                      }
                    ></Input>
                    <div style={{ width: "100%" }}>
                      <p
                        style={{
                          color: "red",
                          marginTop: ".6em",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        <ErrorMessage name="email"></ErrorMessage>
                      </p>
                    </div>
                    <div className="mt-2">
                      <Pass
                        styleClass={classes.blue}
                        resetValue={() => props.setFieldValue("password", "")}
                        setValue={(e) =>
                          props.setFieldValue("password", e.target.value)
                        }
                        value={props.values.password}
                        placeholder="Password"
                        onBlur={() => props.setFieldTouched("password")}
                        dir="ltr"
                        borderRadius="4px"
                        border={
                          props.touched.password && props.errors.password
                            ? "1px solid red"
                            : ""
                        }
                        height="32px"
                        width="250px"
                        mobileWidth={"250px"}
                        showPassIcon={
                          <img
                            data-aos="fade-in"
                            src={require("../../img/show.svg")}
                            style={{ width: "24px", height: "24px" }}
                            alt="show-pass"
                          ></img>
                        }
                        hidePassIcon={
                          <img
                            data-aos="fade-in"
                            src={require("../../img/hide.svg")}
                            style={{ width: "24px", height: "24px" }}
                            alt="hide-pass"
                          ></img>
                        }
                        icon={require("../../img/pass.svg")}
                      ></Pass>
                      <p
                        style={{
                          color: "red",
                          marginTop: ".6em",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        <ErrorMessage name="password"></ErrorMessage>
                      </p>
                      <Button
                        className="mt-2"
                        type="primary"
                        style={{ width: "100%", height: "32px" }}
                        loading={loading}
                        onClick={() => {
                          props.submitForm();
                        }}
                      >
                        Login
                      </Button>

                      <div
                        onClick={() => {
                          auth
                            .signInWithPopup(googleProvider)
                            .then(() => {
                              openTopNotif(
                                "Logged In !",
                                <CheckCircleOutlined
                                  style={{
                                    color: "#1cd777",
                                    transform: "translate(0 ,-4px)",
                                  }}
                                ></CheckCircleOutlined>,
                                4
                              );
                              loginProps.login();
                              loginProps.history.push("/");
                            })
                            .catch((error) => {
                              console.log(error.message);
                              openTopNotif(
                                error.message,
                                <CloseCircleOutlined
                                  style={{
                                    color: "red",
                                    transform: "translate(0 ,-4px)",
                                  }}
                                ></CloseCircleOutlined>,
                                4
                              );
                            });
                        }}
                        style={{ width: "100%" }}
                        className="google-btn"
                      >
                        <div className="google-icon-wrapper">
                          <img
                            className="google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          />
                        </div>
                        <p className="btn-text">
                          <b>Sign in with google</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <p className="text-center mt-3">
            Haven't signed up before ?{" "}
            <NavLink to="/register">Register</NavLink>
          </p>
        </Card>
      </div>
    </Layout>
  );
}

const mapState = (state) => {
  return {
    admin: state.admin,
  };
};

const mapDis = (disptach) => {
  return {
    admin: () => disptach(admin()),
    login: () => disptach(login()),
  };
};

export default connect(mapState, mapDis)(withRouter(Login));
