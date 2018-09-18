import React, { Fragment } from "react";

import { Title, Button } from "./styles";

const Topbar = () => {
  return (
    <Fragment>
      <Title>Current List</Title>
      <Button>
        <i className="fas fa-shopping-cart fa-2x" />
      </Button>
    </Fragment>
  );
};

export default Topbar;
