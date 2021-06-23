import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

// Components
import Header from "../Header/Header";

// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "nprogress/nprogress.css";
import "antd/dist/antd.min.css";
import "./Layout.css";

function Layout({ title, children }) {
  return (
    <Fragment>
      <Helmet>
        <title>
          {process.env.REACT_APP_SITENAME} | {title}
        </title>
      </Helmet>
      <Header />
      {children}
    </Fragment>
  );
}

export default Layout;
