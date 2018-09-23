import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import firebase from "../../firebase";
import DrawerMenu from "./DrawerMenu";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Hidden,
  Drawer,
  SwipeableDrawer
} from "@material-ui/core";

import { Menu } from "@material-ui/icons";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 440,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    position: "absolute",
    zIndex: theme.zIndex.drawer + 1
  },
  navIconHide: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      position: "relative"
    }
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  flex: {
    justifyContent: "space-between"
  },
  formControl: {
    minWidth: 120
  }
});

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
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("userData", null);
    this.props.history.push("/login");
  };

  render() {
    const { classes, children } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.flex}>
            <IconButton
              onClick={this.handleDrawerToggle}
              color="inherit"
              aria-label="Open drawer"
              className={classes.navIconHide}
            >
              <Menu />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              Slice
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={
              { keepMounted: true } // Better open performance on mobile.
            }
          >
            <DrawerMenu />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <SwipeableDrawer
            open={this.state.left}
            onClose={this.toggleDrawer(false)}
            onOpen={this.toggleDrawer(true)}
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <DrawerMenu />
          </SwipeableDrawer>
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
