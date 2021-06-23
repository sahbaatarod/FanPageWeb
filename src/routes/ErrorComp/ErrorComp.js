import React from "react";

// Router
import { NavLink } from "react-router-dom";

// Components
import Layout from "../../components/Layout/Layout";

function ErrorComp() {
  return (
    <Layout title="Error">
      Page you were looking for Not found .<NavLink to="/">Homepage</NavLink>
    </Layout>
  );
}

export default ErrorComp;
