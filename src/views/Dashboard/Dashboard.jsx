import React, { Component, Fragment } from "react";

import CurrentList from "../../components/CurrentList/CurrentList";
import Navbar from "../../components/Navbar/Navbar";

class Dashboard extends Component {
  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log(userData);
  }
  render() {
    return (
      <Fragment>
        <Navbar history={this.props.history} />
        <CurrentList />
      </Fragment>
    );
  }
}

export default Dashboard;
