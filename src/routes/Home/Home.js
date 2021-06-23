import React from "react";
// Redux
import { connect } from "react-redux";
import { setMessage } from "../../redux/action";

// UUID
import { v4 as uuidv4 } from "uuid";

// Firebase
import firebase from "firebase/app";
import "firebase/firestore";
import {
  FirestoreCollection,
  FirestoreMutation,
  FirestoreProvider,
} from "@react-firebase/firestore";
import { config } from "../../firebase";

import { CloseCircleOutlined } from "@ant-design/icons";
import { openTopNotif } from "../../components/NotifTop";

// Loading
import Loader from "../../components/Loading/Loader";

// Components
import Layout from "../../components/Layout/Layout";
import CustomModal from "../../components/CustomModal";
import Input from "../../components/Email/Input";
import Card from "../../components/Card/Card";
import { Button } from "antd";
import classes from "../../components/Email/Input.module.scss";
import Aos from "aos";

function Home(props) {
  const [show, setShow] = React.useState(false);
  const [content, setContent] = React.useState("");

  React.useEffect(() => {
    Aos.init();
  }, []);

  const handleIt = (run) => {
    if (!localStorage.getItem("content").length) {
      openTopNotif(
        "Please fill the content",
        <CloseCircleOutlined
          style={{ color: "red", transform: "translate(0 ,-4px)" }}
        ></CloseCircleOutlined>,
        4
      );
    } else {
      const item = localStorage.getItem("content");
      run({
        message: item,
        created_at: new Date(),
        id: uuidv4(),
      }).then(() => {
        setShow(false);
      });
    }
  };

  return (
    <Layout title="Homepage">
      <FirestoreProvider {...config} firebase={firebase}>
        <FirestoreCollection
          orderBy={[{ field: "created_at", type: "desc" }]}
          path={"Messages"}
        >
          {(props) => {
            if (props.isLoading) {
              return (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "150px",
                  }}
                >
                  <Loader size={40} color={"#1890ff"} />
                </div>
              );
            }
            return (
              props.value &&
              props.value.length &&
              props.value.map((each, index) => {
                return (
                  <Card
                    key={index}
                    borderRadius="4px"
                    boxShadow="rgba(0,0,0,0.2)"
                  >
                    {each.message}
                  </Card>
                );
              })
            );
          }}
        </FirestoreCollection>
        <div style={{ position: "fixed", bottom: "20px", right: "30px" }}>
          <CustomModal
            maskClosable={true}
            show={show}
            setShow={setShow}
            centered={true}
            overlayColor={"rgba(0,0,0,.2)"}
            showCloseIcon
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2em",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <input
                  style={{
                    background: "none",
                    borderRadius: "4px",
                    outline: "none",
                    border: "1px solid #ccc",
                    width: "240px",
                    height: "32px",
                  }}
                  onChange={(e) => {
                    setContent(e.target.value);
                    props.setMessage(e.target.value);
                    localStorage.setItem("content", e.target.value);
                  }}
                  value={content}
                  placeholder="Content"
                ></input>
                <FirestoreMutation path="Messages" type="add">
                  {(fireProps) => {
                    return (
                      <Button
                        className="mt-2"
                        onClick={() => handleIt(fireProps.runMutation)}
                        style={{ width: "100%" }}
                        type="primary"
                      >
                        Post Message
                      </Button>
                    );
                  }}
                </FirestoreMutation>
              </div>
            </div>
          </CustomModal>
          <button
            onClick={() => {
              setShow(true);
            }}
            style={{
              background: "#1890ff",
              borderRadius: "50%",
              border: "none",
              width: "50px",
              height: "50px",
              boxShadow: "0 0 10px #1890ff",
              outline: "none",
              fontSize: "2em",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              visibility: props.admin ? "visible" : "hidden",
            }}
          >
            <span style={{ transform: "translate(0,-2px)" }}>+</span>
          </button>
        </div>
      </FirestoreProvider>
    </Layout>
  );
}

// Redux Config
const mapState = (state) => {
  return {
    admin: state.admin,
    message: state.message,
  };
};

const mapDis = (dispatch) => {
  return {
    setMessage: (value) => dispatch(setMessage(value)),
  };
};

export default connect(mapState, mapDis)(Home);
