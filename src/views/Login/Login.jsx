import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = ({ history }) => {
  if (localStorage.isLoggedIn === "true") {
    history.push(`/${localStorage.getItem("userData").uid}`);
    return null;
  } else {
    return <LoginForm />;
  }
};

export default Login;
