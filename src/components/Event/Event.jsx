import React, { Component } from "react";
import EventList from "./EventList/EventList";
import { compose } from "recompose";
import { connect } from "react-redux";
import { selectedEventData } from "../../actions";

class Event extends Component {
  render() {
    return (
      <EventList
        eventData={this.props.eventData}
        selectedEventData={this.props.selectedEventData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    eventData: state.eventData
  };
};

export default compose(
  connect(
    mapStateToProps,
    { selectedEventData }
  )
)(Event);
