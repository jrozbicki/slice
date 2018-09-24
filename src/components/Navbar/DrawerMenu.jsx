import React, { Component } from "react";
import firebase from "../../firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import { selectedEventData } from "../../actions";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  List,
  Hidden,
  Collapse,
  withStyles
} from "@material-ui/core";

import {
  Inbox,
  Add,
  Settings,
  PowerSettingsNew,
  ExpandLess,
  ExpandMore,
  Star
} from "@material-ui/icons";

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsOpen: false
    };
  }

  handleLogOut = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    this.props.history.replace("/login");
  };

  handleEventNestedList = () => {
    this.state.eventsOpen
      ? this.setState({ eventsOpen: false })
      : this.setState({ eventsOpen: true });
  };

  loadEvent = e => {
    this.props.selectedEventData(e.currentTarget.id);
    this.props.closeDrawer();
  };

  renderEvents = classes => {
    if (this.props.events !== undefined && this.props.events !== null) {
      const arrayEvents = Object.entries(this.props.events);
      return arrayEvents.map(arr => {
        return (
          <ListItem
            button
            key={arr[0]}
            id={arr[0]}
            className={classes.nested}
            onClick={this.loadEvent}
          >
            <ListItemIcon>
              <Star />
            </ListItemIcon>
            <ListItemText inset primary={arr[1].name} />
          </ListItem>
        );
      });
    }
  };

  render() {
    const { classes, userData } = this.props;
    return (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>

        <List>
          <ListItem>
            <Avatar>
              {userData.email ? userData.email.substr(0, 1).toUpperCase() : ""}
            </Avatar>
            <ListItemText primary={userData.email ? userData.email : ""} />
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem button onClick={this.handleEventNestedList}>
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText inset primary="Events" />
            {this.state.eventsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.eventsOpen} timeoute="auto">
            <List>{this.renderEvents(classes)}</List>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add new event" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <Divider />

        <List>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={this.handleLogOut}>
            <ListItemIcon>
              <PowerSettingsNew />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>

        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { userData: state.currentUserData, events: state.currentUserEvents };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { selectedEventData }
  )
)(DrawerMenu);
