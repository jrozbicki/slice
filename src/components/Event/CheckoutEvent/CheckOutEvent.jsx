import React, { Component } from "react";

import {
  Typography,
  List,
  ListItem,
  ExpansionPanel,
  Avatar,
  ExpansionPanelDetails,
  withStyles
} from "@material-ui/core";

import { ArrowRightAlt, CreditCard } from "@material-ui/icons";
import { StyledExpansionPanelSummary, styles } from "./checkoutevent-styles";

class CheckOutEvent extends Component {
  // algorithm that is responsible to calculate needed transactions between users
  checkOutEventCalculator = () => {
    const { subscribersData, eventData } = this.props;
    const eventId = eventData.id;

    const eventTotal = eventData.eventTotal;
    const userCount = eventData.users.length;
    const eventAverage =
      Math.round(parseFloat(eventTotal / userCount) * 100) / 100;

    const summary = subscribersData.map(subscriber => {
      const { userTotal } = subscriber.events[eventId];
      const delta = userTotal - eventAverage;
      return {
        id: subscriber.id,
        name: subscriber.name,
        userTotal: parseFloat(userTotal).toFixed(2),
        delta: Math.round(delta * 100) / 100,
        pending: Math.abs(Math.round(delta * 100) / 100)
      };
    });

    const onMinus = [];
    const onPlus = [];
    // eslint-disable-next-line
    summary.map(subscriber => {
      if (subscriber.delta < 0) {
        onMinus.push(subscriber);
      } else if (subscriber.delta > 0) {
        onPlus.push(subscriber);
      }
    });

    const transactions = [];
    const subscribersAfter = [];

    let minusBuffer = onMinus.shift();
    let plusBuffer = onPlus.shift();
    while (minusBuffer && plusBuffer) {
      let transactionValue = 0;
      if (minusBuffer.pending > plusBuffer.pending) {
        transactionValue = plusBuffer.pending;
        plusBuffer.pending -= transactionValue;
        minusBuffer.pending -= transactionValue;
        transactions.push({
          from: minusBuffer.name,
          to: plusBuffer.name,
          transactionValue: Math.ceil(transactionValue * 100) / 100,
          id: transactions.length + 1
        });
        subscribersAfter.push(plusBuffer);
        if (minusBuffer.pending < 0.02) {
          minusBuffer.pending = 0;
          subscribersAfter.push(minusBuffer);
        }
        plusBuffer = null;
        plusBuffer = onPlus.shift();
      } else {
        transactionValue = minusBuffer.pending;
        minusBuffer.pending -= transactionValue;
        plusBuffer.pending -= transactionValue;
        transactions.push({
          from: minusBuffer.name,
          to: plusBuffer.name,
          transactionValue: Math.ceil(transactionValue * 100) / 100,
          id: transactions.length + 1
        });
        subscribersAfter.push(minusBuffer);
        if (plusBuffer.pending < 0.02) {
          plusBuffer.pending = 0;
          subscribersAfter.push(plusBuffer);
        }
        minusBuffer = null;
        minusBuffer = onMinus.shift();
      }
    }

    return transactions.map(transaction => {
      const { classes } = this.props;
      return (
        <ExpansionPanel key={transaction.id}>
          <StyledExpansionPanelSummary>
            <div className={classes.singleTransaction}>
              <div className={classes.avatarAndNick}>
                <Avatar>{transaction.from.substr(0, 1)}</Avatar>
                <Typography className={classes.heading}>
                  {transaction.from}
                </Typography>
              </div>
              <div className={classes.arrowIcon}>
                <ArrowRightAlt />
              </div>
              <div className={classes.avatarAndNick}>
                <Avatar>{transaction.to.substr(0, 1)}</Avatar>
                <Typography className={classes.heading}>
                  {transaction.to}
                </Typography>
              </div>
              <Typography className={classes.transactionValue}>{`${
                transaction.transactionValue
              } zł`}</Typography>
            </div>
          </StyledExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List className={classes.userPurchaseList}>
              <ListItem className={classes.listItemDetails}>
                <div>{`${transaction.to}  `}</div>
                <CreditCard>acc</CreditCard>
                <div>{`00 0000 0000 0000 0000 0000`}</div>
              </ListItem>
            </List>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="headline">Checkout</Typography>
        {this.checkOutEventCalculator()}
      </div>
    );
  }
}

export default withStyles(styles)(CheckOutEvent);
