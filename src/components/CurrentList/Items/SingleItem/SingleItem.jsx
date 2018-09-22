import React, { Component } from "react";
import { connect } from "react-redux";
import { addCheckedOutItem, removeCheckedOutItem } from "../../../../actions";
import firebase from "../../../../firebase";

import {
  ListItem,
  ItemName,
  CheckboxContainer,
  Checkbox,
  ItemQuantity,
  TrashContainer
} from "./styles";

class SingleItem extends Component {
  constructor(props) {
    super(props);

    this.state = { display: "none", hover: ":hover" };
  }

  handleCheckoutClick = () => {
    if (this.state.display === "none") {
      this.setState({ display: "block", hover: "" });
      this.props.addCheckedOutItem(this.props.id);
    } else {
      this.setState({ display: "none", hover: ":hover" });
      this.props.removeCheckedOutItem(this.props.id);
    }
  };

  handleTrashClick = () => {
    firebase
      .database()
      .ref("/currentList")
      .child(this.props.id)
      .remove();
  };

  render() {
    return (
      <ListItem id={this.props.id} hover={this.state.hover}>
        <ItemName>
          {this.props.name}
          <CheckboxContainer>
            <input type="checkbox" />
            <Checkbox
              onClick={this.handleCheckoutClick}
              display={this.state.display}
            />
          </CheckboxContainer>
        </ItemName>
        <ItemQuantity>{this.props.quantity}</ItemQuantity>
        <TrashContainer>
          <i
            className="fas fa-trash-alt fa-2x"
            onClick={this.handleTrashClick}
          />
        </TrashContainer>
      </ListItem>
    );
  }
}

export default connect(
  null,
  { addCheckedOutItem, removeCheckedOutItem }
)(SingleItem);
