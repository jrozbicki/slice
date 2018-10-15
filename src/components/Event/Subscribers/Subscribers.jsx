import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core";
import { styles } from "./subscribers-style";
import SingleSubscriber from "./SingleSubscriber/SingleSubscriber";

// functional component that renders Subscribers module
const Subscribers = props => {
  const { classes, subscribersData, eventData } = props;

  // iterates through all subscribers of current event and renders them
  const renderSubscribers = () => {
    return subscribersData.map(subscriber => {
      return (
        <SingleSubscriber
          key={subscriber.id}
          eventData={eventData}
          subscriber={subscriber}
        />
      );
    });
  };

  // only renders subscribers if there is event loaded
  return (
    <div className={classes.root}>
      {eventData.name && subscribersData.length ? renderSubscribers() : null}
    </div>
  );
};

// pulling subscribers data from redux state
const mapStateToProps = state => {
  return {
    subscribersData: state.subscribersData
  };
};

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(Subscribers);
