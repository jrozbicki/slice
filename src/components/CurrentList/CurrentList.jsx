import React from "react";

import { CurrentListWrapper } from "./styles";
import Topbar from "./Topbar/Topbar";
import AddItem from "./AddItem/AddItem";

const CurrentList = () => {
  return (
    <CurrentListWrapper>
      <Topbar />
      <AddItem />
    </CurrentListWrapper>
  );
};

export default CurrentList;
