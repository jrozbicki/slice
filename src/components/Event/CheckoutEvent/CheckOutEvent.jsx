import React, { Component } from 'react';

import {
  Typography,
  List,
  ListItem,
  ExpansionPanel,
  Avatar,
  ExpansionPanelDetails,
  withStyles
} from '@material-ui/core';

import { ArrowRightAlt, CreditCard } from '@material-ui/icons';
import { StyledExpansionPanelSummary, styles } from './checkoutevent-styles';

class CheckOutEvent extends Component {
  renderCheckouts = () => {
    const { classes, transactions } = this.props;

    return transactions.map(transaction => {
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
    return (
      <div className={this.props.classes.root}>
        <Typography variant="headline">Checkout</Typography>
        {this.renderCheckouts()}
      </div>
    );
  }
}

export default withStyles(styles)(CheckOutEvent);
