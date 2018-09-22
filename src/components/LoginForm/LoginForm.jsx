import React from "react";

import SignIn from "../LoginForm/SignIn/SignIn";
import { LoginFormWrapper } from "./styles";

const LoginForm = () => {
  return (
    <LoginFormWrapper>
      <SignIn />
    </LoginFormWrapper>
  );
};

export default LoginForm;
