import React, { Component } from "react";
import firebase from "../../../firebase";

import AddItem from "../AddItem/AddItem";
import CheckOut from "../CheckOut/CheckOut";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  List,
  ListItem,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  withStyles
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { styles } from "./eventlist-styles";

// class component that renders List with Add and CheckOut buttons
class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogAddOpen: false,
      dialogCheckOutOpen: false,
      itemName: "",
      itemQuantity: 1,
      checkedItems: [],
      checkOutValue: ""
    };
  }

  // function removes item after clicking on thrash icon
  removeFromList = e => {
    const { eventData, selectedEventData } = this.props;
    this.removeFromCheckedItems(e.currentTarget.id);
    firebase
      .database()
      .ref(`/events/${eventData.id}/list/${e.currentTarget.id}`)
      .remove();
    selectedEventData(eventData.id);
  };

  // removes item of *id* from checkedItems state property
  removeFromCheckedItems = id => {
    const notSelected = this.state.checkedItems.filter(item => {
      return item.id !== id;
    });
    this.setState({
      checkedItems: notSelected
    });
  };

  // function checking if item with *id* has checked checkbox
  isChecked = id => {
    return this.state.checkedItems.some(item => {
      return item.id === id;
    });
  };

  // function toggling checkbox
  handleCheckedItems = e => {
    const { checkedItems } = this.state;
    const { eventData } = this.props;

    const clickedItemId = e.target.closest("li div[role='button']").id;

    // adds item of *id* from checkedItems state property
    const addToCheckedItems = id => {
      const addedItem = { id: id, ...eventData.list[id] };
      this.setState({
        checkedItems: [...checkedItems, addedItem]
      });
    };
    // conditional toggling checkbox
    this.isChecked(clickedItemId)
      ? this.removeFromCheckedItems(clickedItemId)
      : addToCheckedItems(clickedItemId);
  };

  // after submiting purchase in CheckOut component
  // function clears property checkedItems of this component state
  clearCheckedItems = () => {
    this.setState({ checkedItems: [] });
  };

  // renders main List
  renderList = () => {
    return Object.entries(this.props.eventData.list).map(item => {
      return (
        <ListItem
          key={item[0]}
          id={item[0]}
          dense
          button
          onClick={this.handleCheckedItems}
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
              onClick={this.removeFromList}
            >
              <Delete />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      );
    });
  };

  // renders Card
  render() {
    const { classes, eventData, selectedEventData } = this.props;
    if (eventData.name) {
      return (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="display2" className={classes.cardTitle}>
              {eventData.name}
            </Typography>
            <List>
              {eventData.list ? (
                this.renderList()
              ) : (
                <Typography variant="headline" className={classes.emptyList}>
                  <div>Add some items to list</div>
                </Typography>
              )}
            </List>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <CheckOut
              checkedItems={this.state.checkedItems}
              clearCheckedItems={this.clearCheckedItems}
            />
            <AddItem
              eventData={eventData}
              selectedEventData={selectedEventData}
            />
          </CardActions>
        </Card>
      );
    }
  }
}

export default withStyles(styles)(EventList);
