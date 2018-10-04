import React from "react";
import { compose } from "recompose";
import firebase from "../../../firebase";
import { connect } from "react-redux";

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
  withStyles,
  InputAdornment,
  Input
} from "@material-ui/core";

import { Add, Delete, AttachMoney } from "@material-ui/icons";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit * 3
  },
  button: {
    marginBottom: theme.spacing.unit
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between"
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
  },
  dialogCheckOutListItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  dialogCheckOutList: {
    marginBottom: 24
  }
});

class EventList extends React.Component {
  state = {
    dialogAddOpen: false,
    dialogCheckOutOpen: false,
    itemName: "",
    itemQuantity: 1,
    checkedItems: [],
    checkOutValue: 0
  };

  handleDialogAddOpen = () => {
    this.setState({ dialogAddOpen: true });
  };

  handleDialogAddClose = () => {
    this.setState({ dialogAddOpen: false, itemName: "", itemQuantity: 1 });
  };

  handleCheckOutOpen = () => {
    this.setState({ dialogCheckOutOpen: true });
  };

  handleDialogCheckOutClose = () => {
    this.setState({ dialogCheckOutOpen: false });
  };

  handleSubmit = () => {
    const itemId = firebase
      .database()
      .ref()
      .push().key;

    const item = {
      id: itemId,
      name: this.state.itemName,
      quantity: this.state.itemQuantity
    };

    let updates = {};
    updates[`/events/${this.props.eventData.id}/list/${itemId}`] = item;

    firebase
      .database()
      .ref()
      .update(updates);

    this.props.selectedEventData(this.props.eventData.id);
    this.setState({ dialogAddOpen: false, itemName: "", itemQuantity: 1 });
  };

  handleCheckOutSubmit = () => {
    const purchaseKey = firebase
      .database()
      .ref()
      .push().key;

    let items = {};
    this.state.checkedItems.map(item => {
      return (items = { ...items, ...{ [item.id]: item } });
    });
    const purchaseData = { items, price: this.state.checkOutValue };

    let updates = {};
    updates[
      `/users/${this.props.currentUserData.uid}/events/${
        this.props.eventData.id
      }/purchases/${purchaseKey}`
    ] = purchaseData;

    this.state.checkedItems.map(item => {
      return (updates = {
        ...updates,
        ...{ [`/events/${this.props.eventData.id}/list/${item.id}`]: null }
      });
    });

    firebase
      .database()
      .ref()
      .update(updates);

    this.setState({ checkedItems: [], checkOutValue: 0 });
    this.props.selectedEventData(this.props.eventData.id);
    this.handleDialogCheckOutClose();
  };

  handleSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleSubmit();
    }
  };

  handleCheckOutSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleCheckOutSubmit();
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
        return item.id === e.target.closest("li div[role='button']").id;
      })
    ) {
      const removedItem = this.state.checkedItems.filter(item => {
        return item.id !== e.target.closest("li div[role='button']").id;
      });
      this.setState({
        checkedItems: removedItem
      });
    } else {
      const itemId = e.target.closest("li div[role='button']").id;
      const addedItem = {
        id: itemId,
        ...this.props.eventData.list[itemId]
      };
      this.setState({
        checkedItems: [...this.state.checkedItems, addedItem]
      });
    }
  };

  isChecked = id => {
    return this.state.checkedItems.some(item => {
      return item.id === id;
    });
  };

  renderCard = () => {
    return (
      <Card className={this.props.classes.root}>
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
            className={this.props.classes.button}
            onClick={this.handleCheckOutOpen}
            variant="fab"
            color="primary"
            aria-label="Cashout"
          >
            <AttachMoney fontSize="large" />
          </Button>

          <Button
            className={this.props.classes.button}
            onClick={this.handleDialogAddOpen}
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

  renderCheckOutList = () => {
    return this.state.checkedItems.map(item => {
      return (
        <ListItem
          className={this.props.classes.dialogCheckOutListItem}
          key={item.id}
        >
          {`${this.props.eventData.list[item.id].name} x ${
            this.props.eventData.list[item.id].quantity
          }`}
        </ListItem>
      );
    });
  };

  render() {
    const { classes, eventData } = this.props;
    const {
      dialogAddOpen,
      dialogCheckOutOpen,
      checkOutValue,
      itemName,
      itemQuantity,
      checkedItems
    } = this.state;
    return (
      <div>
        {eventData.name ? this.renderCard() : ""}
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
              {this.renderCheckOutList()}
            </List>
            <Input
              id="checkout"
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUserData: state.currentUserData
  };
};

export default compose(
  withStyles(styles),
  connect(mapStateToProps)
)(EventList);
