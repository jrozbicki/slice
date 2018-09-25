import React from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";

const SignUp = ({ history }) => {
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    history.push("/");
    return null;
  } else {
    return <SignUpForm history={history} />;
  }
};

export default SignUp;
