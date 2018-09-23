import React, { Component, Fragment } from "react";

import Event from "../../components/Event/Event";
import Navbar from "../../components/Navbar/Navbar";
import CurrentList from "../../components/CurrentList/CurrentList";

class Dashboard extends Component {
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
  }
  render() {
    return (
      <Fragment>
        <Navbar history={this.props.history}>
          <Event />
        </Navbar>
      </Fragment>
    );
  }
}

export default Dashboard;
