import React from "react";
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
  withStyles
} from "@material-ui/core";

import {
  Inbox,
  Drafts,
  Settings,
  PowerSettingsNew,
  Star,
  Send
} from "@material-ui/icons";

const userData = JSON.parse(localStorage.getItem("userData"));

const styles = theme => ({
  toolbar: theme.mixins.toolbar
});

const DrawerMenu = ({ history, classes }) => {
  const handleLogOut = () => {
    firebase.auth().signOut();
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("userData", null);
    history.push("/login");
  };

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
        <ListItem button>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary="Starred" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Send />
          </ListItemIcon>
          <ListItemText primary="Send mail" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <Drafts />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem button onClick={handleLogOut}>
          <ListItemIcon>
            <PowerSettingsNew />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default withStyles(styles)(withRouter(DrawerMenu));
