import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import firebase from "../../../firebase";

import { Title, Button } from "./styles";
class Topbar extends Component {
  handleClick = () => {
    this.props.checkedOutItems.map(id => {
      firebase
        .database()
        .ref("/currentList")
        .child(id)
        .remove();
      return console.log("Removing successfull of", id);
    });
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
