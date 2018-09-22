import React from "react";
import logo from "../../../utils/logo.png";

import { LogoImage, LogoImageContainer } from "./styles";

const Header = () => {
  return (
    <LogoImageContainer>
      <LogoImage src={logo} alt="Logo" />
    </LogoImageContainer>
  );
};

export default Header;
