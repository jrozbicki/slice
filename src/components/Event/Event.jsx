import React, { Component, Fragment } from "react";
import EventList from "./EventList/EventList";
import Subscribers from "./Subscribers/Subscribers";
import { compose } from "recompose";
import { connect } from "react-redux";
import { selectedEventData } from "../../actions";

class Event extends Component {
  renderEvent = () => {
    if (this.props.eventData.id) {
      return (
        <Fragment>
          <EventList
            eventData={this.props.eventData}
            selectedEventData={this.props.selectedEventData}
          />
          <Subscribers
            eventData={this.props.eventData}
            selectedEventData={this.props.selectedEventData}
          />
        </Fragment>
      );
    }
  };

  render() {
    return <Fragment>{this.renderEvent()}</Fragment>;
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
