import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { styles } from "./checkout-styles";
import firebase from "../../../firebase";
import { selectedEventData } from "../../../store/actions/event";

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
  ListItem
} from "@material-ui/core";

import { AttachMoney } from "@material-ui/icons";

class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogCheckOutOpen: false,
      checkOutValue: 0
    };
  }

  handleCheckOutOpen = () => {
    this.setState({ dialogCheckOutOpen: true });
  };

  handleDialogCheckOutClose = () => {
    this.setState({ dialogCheckOutOpen: false });
  };

  handleCheckOutSubmit = () => {
    const {
      checkedItems,
      currentUserData,
      eventData,
      selectedEventData
    } = this.props;

    const { checkOutValue } = this.state;

    const purchaseKey = firebase
      .database()
      .ref()
      .push().key;

    let items = {};
    checkedItems.map(item => {
      return (items = {
        ...items,
        ...{
          [item.id]: item
        }
      });
    });

    let updatedUserTotal = 0;

    if (currentUserData.events[eventData.id].userTotal) {
      updatedUserTotal =
        parseFloat(currentUserData.events[eventData.id].userTotal, 10) +
        parseFloat(checkOutValue, 10);
    } else {
      updatedUserTotal = parseFloat(checkOutValue, 10);
    }

    let previousEventState = {};
    if (currentUserData.events[eventData.id].purchases) {
      previousEventState = {
        ...currentUserData.events[eventData.id].purchases
      };
    }

    const updatedUser = {
      purchases: {
        [purchaseKey]: { items, price: checkOutValue },
        ...previousEventState
      },
      userTotal: updatedUserTotal
    };

    let updates = {};

    updates[`users/${currentUserData.id}/events/${eventData.id}`] = updatedUser;

    let updatedEventTotal = 0;
    if (eventData.eventTotal) {
      updatedEventTotal =
        parseFloat(eventData.eventTotal, 10) + parseFloat(checkOutValue, 10);
    } else {
      updatedEventTotal = parseFloat(checkOutValue, 10);
    }

    let updatedListArray = [];
    let checkedItemsIds = checkedItems.map(item => {
      return item.id;
    });
    updatedListArray = Object.entries(eventData.list).filter(item => {
      return !checkedItemsIds.includes(item[0]);
    });

    let updatedList = {};
    // eslint-disable-next-line
    updatedListArray.map(arr => {
      updatedList = {
        ...updatedList,
        [arr[0]]: arr[1]
      };
    });

    updates[`/events/${eventData.id}`] = {
      ...eventData,
      list: updatedList,
      eventTotal: updatedEventTotal
    };

    firebase
      .database()
      .ref()
      .update(updates);

    this.setState({
      checkedItems: [],
      checkOutValue: 0
    });
    selectedEventData(eventData.id);
    this.props.clearCheckedItems();
    this.handleDialogCheckOutClose();
  };

  handleCheckOutSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleCheckOutSubmit();
    }
  };

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

const mapStateToProps = state => {
  return {
    currentUserData: state.currentUserData,
    eventData: state.eventData
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectedEventData }
  )
)(CheckOut);
