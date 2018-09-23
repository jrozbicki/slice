import React, { Component } from "react";
import firebase from "../../firebase";
import { withRouter } from "react-router-dom";

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
  state = {
    eventsOpen: false,
    events: []
  };

  componentDidMount() {
    firebase
      .database()
      .ref(`/users/${JSON.parse(localStorage.getItem("userData")).uid}/events`)
      .on("value", snap => {
        this.setState({ events: snap.val() });
      });
  }

  handleLogOut = () => {
    firebase.auth().signOut();
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("userData", null);
    this.props.history.push("/login");
  };

  handleEventNestedList = () => {
    this.state.eventsOpen
      ? this.setState({ eventsOpen: false })
      : this.setState({ eventsOpen: true });
  };

  renderEvents = classes => {
    if (this.state.events) {
      const arrayEvents = Object.entries(this.state.events);
      return arrayEvents.map(arr => {
        return (
          <ListItem button key={arr[0]} className={classes.nested}>
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
    const { classes } = this.props;
    const userData = JSON.parse(localStorage.getItem("userData"));
    return (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>

        <List>
          <ListItem>
            <Avatar>
              {userData.photoUrl
                ? userData.photoUrl
                : userData.email.substr(0, 1).toUpperCase()}
            </Avatar>
            <ListItemText primary={userData.email} />
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
          <Collapse in={this.state.eventsOpen} timeoute="auto" unmountOnExit>
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

export default withStyles(styles)(withRouter(DrawerMenu));
