import React from "react";

import { CurrentListWrapper } from "./styles";
import Topbar from "./Topbar/Topbar";
import AddItem from "./AddItem/AddItem";
import Items from "./Items/Items";

const CurrentList = () => {
  return (
    <CurrentListWrapper>
      <Topbar />
      <Items />
      <AddItem />
    </CurrentListWrapper>
  );
};

export default CurrentList;
