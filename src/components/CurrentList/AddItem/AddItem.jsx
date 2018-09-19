import React, { Component, Fragment } from "react";

import { Form, InputText, InputNumber, Button } from "./styles";
import firebase from "../../../firebase";

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = { inputValue: "", quantity: 1 };
  }

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const item = { name: this.state.inputValue, quantity: this.state.quantity };
    if (item.name) {
      firebase
        .database()
        .ref("/currentList")
        .push(item)
        .then(() => console.log("Addition successfull"))
        .catch(err => err.message);
    } else {
      //TODO: poprawić walidacje
      alert("Provide name for the item !");
    }
    this.setState({ inputValue: "", quantity: 1 });
  };

  handleNumericValueChange = e => {
    this.setState({ quantity: e.target.value });
  };

  render() {
    return (
      <Fragment>
        <Form>
          <InputText
            type="text"
            placeholder="Add next item..."
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <InputNumber
            type="number"
            value={this.state.quantity}
            onChange={this.handleNumericValueChange}
          />
        </Form>
        <Button onClick={this.handleSubmit}>
          <i className="fas fa-plus fa-3x" />
        </Button>
      </Fragment>
    );
  }
}

export default AddItem;
