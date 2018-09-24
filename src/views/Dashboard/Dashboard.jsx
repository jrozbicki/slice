import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import EventList from "../../components/Event/EventList/EventList";
import Navbar from "../../components/Navbar/Navbar";
import { currentUserData, currentUserEvents } from "../../actions";

class Dashboard extends Component {
  componentDidMount() {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    this.props.currentUserData(userData);
    this.props.currentUserEvents(userData.uid);
  }

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

export default connect(
  null,
  { currentUserData, currentUserEvents }
)(Dashboard);
