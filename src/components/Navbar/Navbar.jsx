import React, { Component } from "react";
import firebase from "../../firebase";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  formControl: {
    minWidth: 120
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedEvent: "" };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <form autoComplete="off">
              <FormControl className={classes.formControl}>
                <Select
                  className={classes.select}
                  value={this.state.selectedEvent}
                  onChange={event =>
                    this.setState({ [event.target.name]: event.target.value })
                  }
                  inputProps={{ name: "selectedEvent" }}
                >
                  <MenuItem value={"plZgody"}>pl. Zgody</MenuItem>
                  <MenuItem value={"Wroclaw"}>Wroclaw</MenuItem>
                </Select>
              </FormControl>
            </form>
            <Button color="inherit" onClick={this.handleLogOut}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  handleLogOut = () => {
    firebase.auth().signOut();
    localStorage.setItem("isLoggedIn", false);
    localStorage.setItem("userData", null);
    this.props.history.push("/login");
  };
}

export default withStyles(styles)(Navbar);
