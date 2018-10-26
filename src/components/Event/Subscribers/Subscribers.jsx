import React from "react";
import { compose } from "recompose";

import { withStyles, Typography } from "@material-ui/core";
import { styles } from "./subscribers-style";
import SingleSubscriber from "./SingleSubscriber/SingleSubscriber";

// functional component that renders Subscribers module
const Subscribers = props => {
  const { classes, subscribersData, eventData } = props;

  // iterates through all subscribers of current event and renders them
  const renderSubscribers = () => {
    if (subscribersData) {
      return subscribersData.map(subscriber => {
        return (
          <SingleSubscriber
            key={subscriber.id}
            eventData={eventData}
            subscriber={subscriber}
          />
        );
      });
    }
  };

  // only renders subscribers if there is event loaded
  return (
    <div className={classes.root}>
      <Typography variant="headline">Subscribers</Typography>
      {renderSubscribers()}
    </div>
  );
};

export default compose(withStyles(styles))(Subscribers);
