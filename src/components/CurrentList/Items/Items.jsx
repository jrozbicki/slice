import React, { Component, Fragment } from "react";
import firebase from "../../../firebase";

import {
  ListItem,
  ItemName,
  CheckboxContainer,
  Checkbox,
  ItemQuantity
} from "./styles";

class Items extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("/currentList")
      .on("value", snap => {
        const payload = Object.entries(snap.val()).map(arr => {
          return {
            id: arr[0],
            name: Object.entries(arr[1])[0][1],
            quantity: Object.entries(arr[1])[1][1]
          };
        });
        this.setState({ items: payload });
      });
  }

  handleSelectCheckbox = () => {};

  renderItems = () => {
    return this.state.items.map(({ id, name, quantity }) => {
      return (
        <ListItem key={id}>
          <ItemName>
            {name}
            <CheckboxContainer>
              <input type="checkbox" />
              <Checkbox display="none" />
            </CheckboxContainer>
          </ItemName>
          <ItemQuantity>{quantity}</ItemQuantity>
        </ListItem>
      );
    });
  };

  render() {
    return <Fragment>{this.renderItems()}</Fragment>;
  }
}

export default Items;
