import React, { Component } from "react";
import firebase from "../../firebase";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";

import { selectedEventData, addEvent, userLogout } from "../../actions";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  List,
  Hidden,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
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
  },
  dialogTitle: {
    textAlign: "center"
  },
  dialogTextField: {
    width: "100%"
  }
});

class DrawerMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventsOpen: true,
      dialogOpen: false,
      eventName: ""
    };
  }

  handleLogOut = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    this.props.userLogout();
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

  renderEvents = () => {
    if (this.props.events !== undefined && this.props.events !== null) {
      const arrayEvents = Object.entries(this.props.events);
      return arrayEvents.map(arr => {
        return (
          <ListItem
            button
            key={arr[0]}
            id={arr[0]}
            className={this.props.classes.nested}
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

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({ dialogOpen: false, eventName: "", eventsOpen: true });
  };

  handleEventSubmit = () => {
    this.props.addEvent(this.props.userData.uid, this.state.eventName);
    this.handleCloseDialog();
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
            <List>{this.renderEvents()}</List>
            <List>
              <ListItem button onClick={this.handleOpenDialog}>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="Add new event" />
              </ListItem>
            </List>
          </Collapse>
        </List>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.handleCloseDialog}
          aria-labelledby="add-event"
        >
          <DialogTitle id="add-event" className={classes.dialogTitle}>
            Add event
          </DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              required
              className={classes.dialogTextField}
              autoComplete="off"
              id="name"
              label="Event name"
              helperText="Set meaningfull name!"
              type="text"
              value={this.state.eventName}
              onChange={e => this.setState({ eventName: e.target.value })}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleEventSubmit}
              disabled={this.state.eventName === ""}
              color="primary"
            >
              ADD EVENT
            </Button>
          </DialogActions>
        </Dialog>

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
    { selectedEventData, addEvent, userLogout }
  )
)(DrawerMenu);
