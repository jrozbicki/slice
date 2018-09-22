import React, { Component, Fragment } from "react";
import firebase from "../../../firebase";

import SingleItem from "./SingleItem/SingleItem";
import { EmptyList } from "./styles";

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
        if (snap.val()) {
          const payload = Object.entries(snap.val()).map(arr => {
            return {
              id: arr[0],
              name: Object.entries(arr[1])[0][1],
              quantity: Object.entries(arr[1])[1][1]
            };
          });
          this.setState({ items: payload });
        } else {
          this.setState({ items: [] });
        }
      });
  }

  renderItems = () => {
    if (this.state.items.length) {
      return this.state.items.map(({ id, name, quantity }) => {
        return <SingleItem key={id} id={id} name={name} quantity={quantity} />;
      });
    } else {
      return <EmptyList>Added items will appear here!</EmptyList>;
    }
  };

  render() {
    return <Fragment>{this.renderItems()}</Fragment>;
  }
}

export default Items;
