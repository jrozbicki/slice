import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Event from "../../components/Event/Event";
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
          <Event />
        </Navbar>
      </Fragment>
    );
  }
}

export default connect(
  null,
  { currentUserData, currentUserEvents }
)(Dashboard);
