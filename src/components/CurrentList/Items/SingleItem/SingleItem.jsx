import React, { Component } from "react";
import { connect } from "react-redux";
import { addCheckedOutItem, removeCheckedOutItem } from "../../../../actions";

import {
  ListItem,
  ItemName,
  CheckboxContainer,
  Checkbox,
  ItemQuantity
} from "./styles";

class SingleItem extends Component {
  constructor(props) {
    super(props);

    this.state = { display: "none", hover: ":hover" };
  }

  handleClick = () => {
    if (this.state.display === "none") {
      this.setState({ display: "block", hover: "" });
      this.props.addCheckedOutItem(this.props.id);
    } else {
      this.setState({ display: "none", hover: ":hover" });
      this.props.removeCheckedOutItem(this.props.id);
    }
  };

  render() {
    return (
      <ListItem id={this.props.id}>
        <ItemName hover={this.state.hover}>
          {this.props.name}
          <CheckboxContainer>
            <input type="checkbox" />
            <Checkbox onClick={this.handleClick} display={this.state.display} />
          </CheckboxContainer>
        </ItemName>
        <ItemQuantity>{this.props.quantity}</ItemQuantity>
      </ListItem>
    );
  }
}

export default connect(
  null,
  { addCheckedOutItem, removeCheckedOutItem }
)(SingleItem);
