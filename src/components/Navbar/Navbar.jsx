import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import firebase from "../../firebase";
import DrawerMenu from "./DrawerMenu";
import EventSettings from "./EventSettings";

import { styles } from "./navbar-styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Drawer,
  SwipeableDrawer
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

class Navbar extends Component {
  state = {
    mobileOpen: false,
    left: false
  };

  toggleDrawer = open => () => {
    this.setState({
      left: open
    });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handleLogOut = () => {
    firebase.auth().signOut();
    sessionStorage.setItem("isLoggedIn", false);
    sessionStorage.setItem("userData", null);
    this.props.history.push("/login");
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.flex}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <EventSettings />
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <SwipeableDrawer
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            onOpen={this.toggleDrawer(true)}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={
              { keepMounted: true } // Better open performance on mobile.
            }
            hysteresis={0.3}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              <DrawerMenu closeDrawer={this.handleDrawerToggle} />
            </div>
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
            open
            classes={{ paper: classes.drawerPaper }}
          >
            <DrawerMenu closeDrawer={this.handleDrawerToggle} />
          </Drawer>
        </Hidden>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
