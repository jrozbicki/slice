import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Event from "../../components/Event/Event";
import Navbar from "../../components/Navbar/Navbar";
import {
  currentUserData,
  currentUserEvents,
  unsubscribeFirebase
} from "../../store/actions";

class Dashboard extends Component {
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    this.props.currentUserData(user.uid);
    this.props.currentUserEvents(user.uid);
  }

  componentWillUnmount() {
    this.props.unsubscribeFirebase();
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

export default connect(
  null,
  { currentUserData, currentUserEvents, unsubscribeFirebase }
)(Dashboard);
