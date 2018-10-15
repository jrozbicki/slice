import React, { Fragment } from "react";
import EventList from "./EventList/EventList";
import Subscribers from "./Subscribers/Subscribers";
import { compose } from "recompose";
import { connect } from "react-redux";
import { selectedEventData } from "../../store/actions";

// functional component that renders event with list and subscribers data
const Event = props => {
  const { eventData, selectedEventData } = props;
  if (eventData.id) {
    return (
      <Fragment>
        <EventList
          eventData={eventData}
          selectedEventData={selectedEventData}
        />
        <Subscribers
          eventData={eventData}
          selectedEventData={selectedEventData}
        />
      </Fragment>
    );
  }
  return null;
};

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
