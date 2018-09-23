import React, { Component, Fragment } from "react";

import EventList from "../../components/EventList/EventList";
import Navbar from "../../components/Navbar/Navbar";
import CurrentList from "../../components/CurrentList/CurrentList";

class Dashboard extends Component {
  render() {
    return (
      <Fragment>
        <Navbar history={this.props.history}>
          <EventList />
        </Navbar>
      </Fragment>
    );
  }
}

export default Dashboard;
