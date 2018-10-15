import React, { Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

import { selectedEventData } from "../../store/actions/event";
import Subscribers from "./Subscribers/Subscribers";
import EventList from "./EventList/EventList";

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
        <Subscribers eventData={eventData} />
      </Fragment>
    );
  }
  return null;
};

// pulling event data from redux state
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
