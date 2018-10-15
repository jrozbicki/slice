import React, { Component, Fragment } from "react";
import firebase from "../../../firebase";

import { styles } from "./additem-styles";
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

import { Add } from "@material-ui/icons";

// class component that renders Add button
// and handles adding dialog and submittion
class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = { dialogAddOpen: false, itemName: "", itemQuantity: 1 };
  }

  // handle Add button click that opend dialog
  handleDialogAddOpen = () => {
    this.setState({ dialogAddOpen: true });
  };

  // clears state during and closes dialog
  handleDialogAddClose = () => {
    this.setState({ dialogAddOpen: false, itemName: "", itemQuantity: 1 });
  };

  // handles on key press "enter" submission
  handleSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  // handles submission item to List
  handleSubmit = () => {
    const { selectedEventData, eventData } = this.props;
    const { itemName, itemQuantity } = this.state;

    // getting unique key from db
    const itemId = firebase
      .database()
      .ref()
      .push().key;

    // setting up object
    const item = {
      id: itemId,
      name: itemName,
      quantity: itemQuantity
    };

    // setting up update object
    let updates = {};
    updates[`/events/${eventData.id}/list/${itemId}`] = item;

    // sending update
    firebase
      .database()
      .ref()
      .update(updates);

    // invoking selectedEventData to pull updated data to redux store
    selectedEventData(eventData.id);
    // closes dialog
    this.handleDialogAddClose();
  };

  // renders Add Button and Dialog
  render() {
    const { classes } = this.props;
    const { dialogAddOpen, itemName, itemQuantity } = this.state;
    return (
      <Fragment>
        <Button
          className={this.props.classes.button}
          onClick={this.handleDialogAddOpen}
          variant="fab"
          color="secondary"
          aria-label="Add"
        >
          <Add fontSize="large" />
        </Button>
        <Dialog
          open={dialogAddOpen}
          onClose={this.handleDialogAddClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
            Add item
          </DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              onKeyPress={this.handleSubmitOnEnter}
              className={classes.dialogTextField}
              autoComplete="off"
              id="name"
              label="Item name"
              type="text"
              value={itemName}
              onChange={e => this.setState({ itemName: e.target.value })}
            />
            <TextField
              id="quantity"
              className={classes.dialogTextField}
              autoComplete="off"
              label="Item quantity"
              type="number"
              value={itemQuantity}
              onChange={e => this.setState({ itemQuantity: e.target.value })}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              disabled={itemName === "" || itemQuantity < 1}
              color="primary"
            >
              ADD ITEM TO LIST
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(AddItem);
