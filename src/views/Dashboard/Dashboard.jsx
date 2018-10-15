import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Event from "../../components/Event/Event";
import Navbar from "../../components/Navbar/Navbar";
import { unsubscribeFirebase } from "../../store/actions";
import { currentUserData, currentUserEvents } from "../../store/actions/user";

class Dashboard extends Component {
  // after mounting send user data to redux store
  componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem("userData"));
    this.props.currentUserData(user.uid);
    this.props.currentUserEvents(user.uid);
  }

  // detach all firebase event listeners
  componentWillUnmount() {
    this.props.unsubscribeFirebase();
  }

  // render main components
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
