import React, { PureComponent } from 'react';
import firebase from '../../../firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { userLogout } from '../../../store/actions/user';
import {
  deleteEvent,
  selectedEventData,
  selectedEventId,
} from '../../../store/actions/event';

import AddEvent from './AddEvent';

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  List,
  Hidden,
  Collapse,
  ListItemSecondaryAction,
  IconButton,
  withStyles,
} from '@material-ui/core';

import {
  Settings,
  PowerSettingsNew,
  ExpandLess,
  ExpandMore,
  Dns,
  Assignment,
  Delete,
} from '@material-ui/icons';

import { styles } from './drawer-styles';

class DrawerMenu extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      eventsOpen: false,
    };
  }

  handleLogOut = () => {
    firebase.auth().signOut();
    sessionStorage.clear();
    this.props.userLogout();
    this.props.history.replace('/login');
  };

  handleEventNestedList = () => {
    this.state.eventsOpen
      ? this.setState({ eventsOpen: false })
      : this.setState({ eventsOpen: true });
  };

  loadEvent = e => {
    this.props.selectedEventId(e.currentTarget.id);
    this.props.closeDrawer();
  };

  handleDeleteEvent = e => {
    this.props.selectedEventId('');
    this.props.deleteEvent(
      this.props.events[e.currentTarget.id].users,
      this.props.userData.id,
      e.currentTarget.id,
    );
  };

  // renders nested events list
  renderEvents = () => {
    const { events } = this.props;
    if (events) {
      return Object.keys(events).map(keyName => {
        return (
          <ListItem
            button
            key={keyName}
            id={keyName}
            className={this.props.classes.nested}
            onClick={this.loadEvent}
          >
            <ListItemIcon>
              <Assignment />
            </ListItemIcon>
            <ListItemText inset primary={events[keyName].name} />
            <ListItemSecondaryAction>
              <IconButton
                id={keyName}
                aria-label="Delete"
                onClick={this.handleDeleteEvent}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      });
    }
  };

  // renders drawer
  render() {
    const { classes, userData } = this.props;
    return (
      <div>
        <Hidden smDown>
          <div className={classes.toolbar} />
        </Hidden>
        {/* Avatar and user alias */}
        <List>
          <ListItem>
            <Avatar>
              {userData.email ? userData.email.substr(0, 1).toUpperCase() : ''}
            </Avatar>
            <ListItemText primary={userData.email ? userData.email : ''} />
          </ListItem>
        </List>

        <Divider />
        {/* Events nested list */}
        <List>
          <ListItem button onClick={this.handleEventNestedList}>
            <ListItemIcon>
              <Dns />
            </ListItemIcon>
            <ListItemText inset primary="Events" />
            {this.state.eventsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.eventsOpen} timeoute="auto">
            <List>{this.renderEvents()}</List>
            {/* Add event module */}
            <List>
              <AddEvent userData={userData} />
            </List>
          </Collapse>
        </List>

        <Divider />
        {/* Settings and Logout */}
        <List>
          <ListItem button disabled={true}>
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

// pulls user data
const mapStateToProps = state => {
  return {
    userData: state.currentUserData,
    events: state.currentUserEvents,
  };
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { selectedEventId, selectedEventData, deleteEvent, userLogout },
  ),
)(DrawerMenu);
