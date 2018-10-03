import React from "react";
import { compose } from "recompose";
import firebase from "../../../firebase";

import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  List,
  ListItem,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  withStyles
} from "@material-ui/core";

import { Add, Delete } from "@material-ui/icons";

const styles = theme => ({
  cardActions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  cardTitle: {
    textAlign: "center",
    marginBottom: theme.spacing.unit
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogTextField: {
    width: "100%"
  }
});

class EventList extends React.Component {
  state = {
    dialogOpen: false,
    itemName: "",
    itemQuantity: 1,
    checkedItems: []
  };

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleSubmit = () => {
    firebase
      .database()
      .ref(`/events/${this.props.eventData.id}/list`)
      .push({ name: this.state.itemName, quantity: this.state.itemQuantity });
    this.props.selectedEventData(this.props.eventData.id);
    this.setState({ dialogOpen: false, itemName: "", itemQuantity: 1 });
  };

  handleSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleRemove = e => {
    firebase
      .database()
      .ref(`/events/${this.props.eventData.id}/list/${e.currentTarget.id}`)
      .remove();
    this.props.selectedEventData(this.props.eventData.id);
  };

  toggleCheckbox = e => {
    if (
      this.state.checkedItems.some(item => {
        return item === e.target.closest("li div[role='button']").id;
      })
    ) {
      const removedItem = this.state.checkedItems.filter(item => {
        return item !== e.target.closest("li div[role='button']").id;
      });
      this.setState({
        checkedItems: removedItem
      });
    } else {
      const addedItem = [
        ...this.state.checkedItems,
        e.target.closest("li div[role='button']").id
      ];
      this.setState({
        checkedItems: addedItem
      });
    }
  };

  isChecked = id => {
    return this.state.checkedItems.some(item => {
      return item === id;
    });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false, itemName: "", itemQuantity: 1 });
  };

  renderCard = () => {
    return (
      <Card>
        <CardContent>
          <Typography
            variant="headline"
            className={this.props.classes.cardTitle}
          >
            {this.props.eventData.name}
          </Typography>
          <List>{this.renderList()}</List>
        </CardContent>
        <CardActions className={this.props.classes.cardActions}>
          <Button
            onClick={this.handleOpenDialog}
            variant="fab"
            color="secondary"
            aria-label="Add"
          >
            <Add fontSize="large" />
          </Button>
        </CardActions>
      </Card>
    );
  };

  renderList = () => {
    if (this.props.eventData.list) {
      return Object.entries(this.props.eventData.list).map(item => {
        return (
          <ListItem
            key={item[0]}
            id={item[0]}
            dense
            button
            onClick={this.toggleCheckbox}
          >
            <Checkbox
              tabIndex={-1}
              disableRipple
              checked={this.isChecked(item[0])}
            />
            <Typography variant="subheading">{`${item[1].name} x ${
              item[1].quantity
            }`}</Typography>
            <ListItemSecondaryAction>
              <IconButton
                id={item[0]}
                aria-label="Delete"
                onClick={this.handleRemove}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.props.eventData.name ? this.renderCard() : ""}
        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleDialogClose}
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
              value={this.state.itemName}
              onChange={e => this.setState({ itemName: e.target.value })}
            />
            <TextField
              id="quantity"
              className={classes.dialogTextField}
              autoComplete="off"
              label="Item quantity"
              type="number"
              value={this.state.itemQuantity}
              onChange={e => this.setState({ itemQuantity: e.target.value })}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              disabled={
                this.state.itemName === "" || this.state.itemQuantity < 1
              }
              color="primary"
            >
              ADD ITEM TO LIST
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default compose(withStyles(styles))(EventList);
