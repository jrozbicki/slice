import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = ({ history }) => {
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    history.push("/");
    return null;
  } else {
    return <LoginForm history={history} />;
  }
};

export default Login;
