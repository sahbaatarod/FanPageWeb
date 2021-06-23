import React from "react";
import { NavLink, withRouter } from "react-router-dom";

// Antd
import { Button } from "antd";
import Aos from "aos";

// UUID
import { v4 as uuidv4 } from "uuid";

//Firebase
import firebase from "firebase";
import { config } from "../../firebase";
import {
  FirestoreMutation,
  FirestoreProvider,
} from "@react-firebase/firestore";

// Components
import Layout from "../../components/Layout/Layout";
import Card from "../../components/Card/Card";
import Input from "../../components/Email/Input";
import Pass from "../../components/Password/Input";
import classes from "../../components/Email/Input.module.scss";

// Firebase
import { firebaseApp, auth, googleProvider } from "../../firebase";

// Redux
import { connect } from "react-redux";
import { admin, login } from "../../redux/action";

// Notif
import { openTopNotif } from "../../components/NotifTop";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

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
  name: yup
    .string()
    .typeError("* Enter a valid name")
    .max(10, "* Name must be less than 10 letters")
    .min(3, "* Name must be more than 3 letters")
    .required("* Please enter your name"),
  lastname: yup
    .string()
    .typeError("* Enter a valid lastname")
    .max(10, "* Lastname must be less than 10 letters")
    .min(3, "* Lastname must be more than 3 letters")
    .required("* Please enter your lastname"),
});

const initialValues = {
  email: "",
  password: "",
  name: "",
  lastname: "",
};

function Register(registerProps) {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (submitForm, addUser, obj) => {
    console.log(submitForm);
    console.log(addUser);
    console.log(obj);
    addUser.runMutation(obj).then(() => {
      submitForm();
    });
  };

  const signup = async (name, lastname, email, password) => {
    try {
      await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          openTopNotif(
            "User Registered !",
            <CheckCircleOutlined
              style={{ color: "#1cd777", transform: "translate(0 ,-4px)" }}
            ></CheckCircleOutlined>,
            4
          );
          setLoading(false);
          registerProps.login();
          registerProps.history.push("/");
        });
      // await firebaseApp.firestore().
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
    signup(values.name, values.lastname, values.email, values.password);
    setLoading(true);
  };
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Layout title="Login User">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card borderRadius="4px" width="400px" boxShadow="0 0 10px #dadada">
          <h5 className="text-center pb-3">Register User</h5>
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
                      resetValue={() => props.setFieldValue("name", "")}
                      setValue={(e) => {
                        props.setFieldValue("name", e.target.value);
                        localStorage.setItem("fname", e.target.value);
                      }}
                      value={props.values.name}
                      onBlur={() => props.setFieldTouched("name")}
                      placeholder="Name"
                      dir="ltr"
                      borderRadius="4px"
                      border={
                        props.touched.name && props.errors.name
                          ? "1px solid red"
                          : ""
                      }
                      height="32px"
                      width="250px"
                      mobileWidth={"250px"}
                      icon={require("../../img/user.svg")}
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
                        <ErrorMessage name="name"></ErrorMessage>
                      </p>
                    </div>
                    <Input
                      styleClass={classes.blue}
                      resetValue={() => props.setFieldValue("lastname", "")}
                      setValue={(e) => {
                        props.setFieldValue("lastname", e.target.value);
                        localStorage.setItem("lname", e.target.value);
                      }}
                      value={props.values.lastname}
                      onBlur={() => props.setFieldTouched("lastname")}
                      placeholder="Lastname"
                      dir="ltr"
                      borderRadius="4px"
                      border={
                        props.touched.lastname && props.errors.lastname
                          ? "1px solid red"
                          : ""
                      }
                      height="32px"
                      width="250px"
                      mobileWidth={"250px"}
                      icon={require("../../img/user.svg")}
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
                        <ErrorMessage name="lastname"></ErrorMessage>
                      </p>
                    </div>
                    <Input
                      styleClass={classes.blue}
                      resetValue={() => props.setFieldValue("email", "")}
                      setValue={(e) => {
                        props.setFieldValue("email", e.target.value);
                        localStorage.setItem("email", e.target.value);
                      }}
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
                    <div>
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
                      <FirestoreProvider {...config} firebase={firebase}>
                        <FirestoreMutation path="User" type="add">
                          {(fire) => {
                            return (
                              <Button
                                className="mt-3"
                                type="primary"
                                style={{ width: "100%", height: "32px" }}
                                loading={loading}
                                onClick={() => {
                                  fire
                                    .runMutation({
                                      fname: localStorage.getItem("fname"),
                                      email: localStorage.getItem("email"),
                                      lname: localStorage.getItem("lname"),
                                      uid: uuidv4(),
                                      role: "customer",
                                    })
                                    .then((res) => {
                                      console.log(res);
                                      props.submitForm();
                                    })
                                    .catch((e) => {
                                      console.log(e);
                                    });
                                }}
                              >
                                Register
                              </Button>
                            );
                          }}
                        </FirestoreMutation>
                      </FirestoreProvider>
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
                              registerProps.login();
                              registerProps.history.push("/");
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
                          <b>Sign up with google</b>
                        </p>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <p className="text-center mt-3">
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </p>
        </Card>
      </div>
    </Layout>
  );
}

const mapState = (state) => {
  return {
    admin: state.admin,
    loggedIn: state.loggedIn,
  };
};
const mapDis = (dispatch) => {
  return {
    admin: () => dispatch(admin()),
    login: () => dispatch(login()),
  };
};

export default connect(mapState, mapDis)(withRouter(Register));
