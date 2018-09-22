import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import firebase from "../../../firebase";

import { Title, Button } from "./styles";
class Topbar extends Component {
  handleClick = () => {
    let updates = {};
    this.props.checkedOutItems.map(id => {
      return (updates[id] = null);
    });
    firebase
      .database()
      .ref("/currentList")
      .update(updates)
      .then(() => console.log("Removing checkout items with one API call"))
      .catch(err => err.message);
  };

  render() {
    return (
      <Fragment>
        <Title>Current List</Title>
        <Button onClick={this.handleClick}>
          <i className="fas fa-shopping-cart fa-2x" />
        </Button>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ checkedOutItems }) => {
  return {
    checkedOutItems
  };
};

export default connect(mapStateToProps)(Topbar);
