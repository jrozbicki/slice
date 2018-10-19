import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import firebase from '../../../firebase';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  withStyles,
  InputAdornment,
  Input,
  List,
  ListItem,
} from '@material-ui/core';

import { AttachMoney } from '@material-ui/icons';
import { styles } from './checkout-styles';

// class component that renders Checkout Button and dialog
class CheckOutItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogCheckOutOpen: false,
      checkOutValue: '',
    };
  }

  // handles Button onClick and opens dialog
  handleCheckOutOpen = () => {
    this.setState({ dialogCheckOutOpen: true });
  };

  // closes dialog and resets state
  handleDialogCheckOutClose = () => {
    this.setState({ dialogCheckOutOpen: false, checkOutValue: '' });
  };

  // function that is responsible for submiting data do db
  handleCheckOutSubmit = () => {
    const { checkedItems, currentUserData, eventData } = this.props;

    const checkOutValue = parseFloat(this.state.checkOutValue).toFixed(2);

    // get unique key from db
    const purchaseKey = firebase
      .database()
      .ref()
      .push().key;

    // set up items object
    let items = {};
    checkedItems.map(item => {
      return (items = {
        ...{
          [item.id]: item,
        },
        ...items,
      });
    });

    // calculate users total purchases value into updatedUserTotal variable
    const userTotal = currentUserData.events[eventData.id].userTotal;
    const updatedUserTotal = parseFloat(userTotal) + parseFloat(checkOutValue);

    // set up updated user data
    const { purchases } = currentUserData.events[eventData.id];
    const updatedUser = {
      purchases: {
        [purchaseKey]: { items, price: parseFloat(checkOutValue) },
        ...purchases,
      },
      userTotal: parseFloat(updatedUserTotal).toFixed(2),
    };

    // prepare user updates
    let updates = {};
    updates[`users/${currentUserData.id}/events/${eventData.id}`] = updatedUser;

    // calculate event total purchases value into updatedEventTotal variable
    const eventTotal = eventData.eventTotal;
    const updatedEventTotal =
      parseFloat(eventTotal) + parseFloat(checkOutValue);

    // remove checked items from eventData.list
    let updatedListArray = [];
    let checkedItemsIds = checkedItems.map(item => {
      return item.id;
    });
    updatedListArray = Object.entries(eventData.list).filter(item => {
      return !checkedItemsIds.includes(item[0]);
    });

    // set up updated list obj
    let updatedList = {};
    // eslint-disable-next-line
    updatedListArray.map(arr => {
      updatedList = {
        ...updatedList,
        [arr[0]]: arr[1],
      };
    });

    // prepare eventData.list update
    updates[`/events/${eventData.id}`] = {
      ...eventData,
      list: updatedList,
      eventTotal: parseFloat(updatedEventTotal).toFixed(2),
    };

    // send updates
    firebase
      .database()
      .ref()
      .update(updates);

    // invoke clearing state in parent component
    this.props.clearCheckedItems();
    // close dialog and clear state
    this.handleDialogCheckOutClose();
  };

  // handles submitting purchase on enter press
  handleCheckOutSubmitOnEnter = e => {
    if (
      e.key === 'Enter' &&
      this.state.checkOutValue > 0 &&
      this.props.checkedItems.length !== 0
    ) {
      this.handleCheckOutSubmit();
    }
  };

  // renders checkout list inside dialog
  renderCheckOutList = () => {
    const { classes, eventData, checkedItems } = this.props;
    return checkedItems.map(item => {
      return (
        <ListItem className={classes.dialogCheckOutListItem} key={item.id}>
          {`${eventData.list[item.id].name} x ${
            eventData.list[item.id].quantity
          }`}
        </ListItem>
      );
    });
  };

  // main render function
  render() {
    const { classes, checkedItems } = this.props;
    const { dialogCheckOutOpen, checkOutValue } = this.state;
    return (
      <Fragment>
        <Button
          className={classes.button}
          onClick={this.handleCheckOutOpen}
          variant="fab"
          color="primary"
          aria-label="Cashout"
        >
          <AttachMoney fontSize="large" />
        </Button>
        <Dialog
          open={dialogCheckOutOpen}
          onClose={this.handleDialogCheckOutClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Sum up shopping
          </DialogTitle>

          <DialogContent>
            <List className={classes.dialogCheckOutList}>
              {dialogCheckOutOpen ? this.renderCheckOutList() : null}
            </List>
            <Input
              id="checkout"
              autoFocus
              className={classes.dialogTextField}
              onKeyPress={this.handleCheckOutSubmitOnEnter}
              autoComplete="off"
              label="Total purchase price"
              type="number"
              endAdornment={<InputAdornment position="end">zł</InputAdornment>}
              value={checkOutValue}
              onChange={e => this.setState({ checkOutValue: e.target.value })}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleCheckOutSubmit}
              disabled={checkOutValue <= 0 || checkedItems.length === 0}
              color="primary"
            >
              CHECK OUT
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

// pulls data from
const mapStateToProps = state => {
  return {
    currentUserData: state.currentUserData,
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps),
)(CheckOutItem);
