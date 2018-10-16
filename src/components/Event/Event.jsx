import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import firebase from "../../firebase";

import Subscribers from "./Subscribers/Subscribers";
import EventList from "./EventList/EventList";

// class component that renders event with list and subscribers data
class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventData: {},
      subscribersData: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedEventId !== prevProps.selectedEventId) {
      // if (prevProps.selectedEventId !== "") {
      //   firebase
      //     .database()
      //     .ref(`/events/${prevProps.selectedEventId}`)
      //     .off();
      //
      firebase
        .database()
        .ref(`/events/${this.props.selectedEventId}`)
        .on("value", snap => {
          if (snap.val().users) {
            Promise.all(
              snap.val().users.map(userId => {
                return firebase
                  .database()
                  .ref(`/users/${userId}`)
                  .once("value")
                  .then(snapshot => snapshot.val());
              })
            ).then(data =>
              this.setState({ eventData: snap.val(), subscribersData: data })
            );
          }
        });
    }
  }

  render() {
    if (this.state.eventData.id) {
      return (
        <Fragment>
          <EventList eventData={this.state.eventData} />
          <Subscribers
            subscribersData={this.state.subscribersData}
            eventData={this.state.eventData}
          />
        </Fragment>
      );
    }
    return null;
  }
}

// pulling event data from redux state
const mapStateToProps = state => {
  return {
    selectedEventId: state.selectedEventId
  };
};

export default compose(connect(mapStateToProps))(Event);
