import React, { Fragment } from "react";

import {
  withStyles,
  ExpansionPanel,
  ExpansionPanelDetails,
  Typography,
  Avatar,
  List,
  ListItem,
  Divider
} from "@material-ui/core";

import { styles, StyledExpansionPanelSummary } from "../subscribers-style";

const SingleSubscriber = props => {
  const { eventData, subscriber, classes } = props;

  // renders single purchase wtih price
  const renderSinglePurchase = purchase => {
    return Object.entries(purchase[1].items).map(item => {
      return (
        <ListItem key={item[1].id}>{`${item[1].name} x${
          item[1].quantity
        }`}</ListItem>
      );
    });
  };

  // renders all purchases for single subscriber
  const renderSubscriberPurchases = event => {
    return Object.entries(event.purchases).map(purchase => {
      return (
        <Fragment key={purchase[0]}>
          <List className={classes.listFlex}>
            <div>{renderSinglePurchase(purchase)}</div>
            <div>{`${purchase[1].price} zł`}</div>
          </List>
          <Divider />
        </Fragment>
      );
    });
  };

  // renders expansion panel for single subscriber with total price
  return (
    <ExpansionPanel>
      <StyledExpansionPanelSummary>
        <div className={classes.avatarAndNick}>
          <Avatar>{subscriber.name.substr(0, 1)}</Avatar>
          <Typography className={classes.heading}>{subscriber.name}</Typography>
        </div>
        <div className={classes.totalAmountDiv}>
          <Typography className={classes.totalAmount}>
            {`${
              subscriber.events[eventData.id] &&
              subscriber.events[eventData.id].userTotal
                ? subscriber.events[eventData.id].userTotal
                : 0
            } zł`}
          </Typography>
        </div>
      </StyledExpansionPanelSummary>
      <ExpansionPanelDetails>
        <List className={classes.userPurchaseList}>
          {subscriber.events[eventData.id] &&
          subscriber.events[eventData.id].purchases
            ? renderSubscriberPurchases(subscriber.events[eventData.id])
            : null}
        </List>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(SingleSubscriber);
