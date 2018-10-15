import React from "react";
import { compose } from "recompose";
import firebase from "../../../firebase";
import { connect } from "react-redux";

import AddItem from "../AddItem/AddItem";
import CheckOut from "../CheckOut/CheckOut";
import { selectedEventData } from "../../../store/actions";
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

class EventList extends React.Component {
  state = {
    dialogAddOpen: false,
    dialogCheckOutOpen: false,
    itemName: "",
    itemQuantity: 1,
    checkedItems: [],
    checkOutValue: ""
  };

  removeFromList = e => {
    const { eventData, selectedEventData } = this.props;
    firebase
      .database()
      .ref(`/events/${eventData.id}/list/${e.currentTarget.id}`)
      .remove();
    selectedEventData(eventData.id);
  };

  isChecked = id => {
    return this.state.checkedItems.some(item => {
      return item.id === id;
    });
  };

  handleCheckedItems = e => {
    const { checkedItems } = this.state;
    const { eventData } = this.props;

    const clickedItemId = e.target.closest("li div[role='button']").id;

    const removeFromCheckedItems = id => {
      const notSelected = checkedItems.filter(item => {
        return item.id !== id;
      });
      this.setState({
        checkedItems: notSelected
      });
    };

    const addToCheckedItems = id => {
      const addedItem = { id: id, ...eventData.list[id] };
      this.setState({ checkedItems: [...checkedItems, addedItem] });
    };

    this.isChecked(clickedItemId)
      ? removeFromCheckedItems(clickedItemId)
      : addToCheckedItems(clickedItemId);
  };

  clearCheckedItems = () => {
    this.setState({ checkedItems: [] });
  };

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

  render() {
    const { classes, eventData } = this.props;
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
            <AddItem eventData={eventData} />
          </CardActions>
        </Card>
      );
    }
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    { selectedEventData }
  )
)(EventList);
