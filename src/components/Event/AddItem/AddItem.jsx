import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import firebase from "../../../firebase";

import { selectedEventData } from "../../../store/actions";
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

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = { dialogAddOpen: false, itemName: "", itemQuantity: 1 };
  }

  handleDialogAddOpen = () => {
    this.setState({ dialogAddOpen: true });
  };

  handleDialogAddClose = () => {
    this.setState({ dialogAddOpen: false, itemName: "", itemQuantity: 1 });
  };

  handleSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const { selectedEventData, eventData } = this.props;
    const { itemName, itemQuantity } = this.state;

    const itemId = firebase
      .database()
      .ref()
      .push().key;

    const item = {
      id: itemId,
      name: itemName,
      quantity: itemQuantity
    };

    let updates = {};
    updates[`/events/${eventData.id}/list/${itemId}`] = item;

    firebase
      .database()
      .ref()
      .update(updates);

    selectedEventData(eventData.id);
    this.setState({ dialogAddOpen: false, itemName: "", itemQuantity: 1 });
  };

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

const mapStateToProps = state => {
  return {
    eventData: state.eventData
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectedEventData }
  )
)(AddItem);
