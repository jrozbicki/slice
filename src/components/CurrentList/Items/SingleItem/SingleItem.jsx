import React, { Component } from "react";
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
    } else {
      this.setState({ display: "none", hover: ":hover" });
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

export default SingleItem;
