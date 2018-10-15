import React, { Component, Fragment } from "react";
import { compose } from "recompose";
import { connect } from "react-redux";
import { addEvent } from "../../../store/actions/event";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { styles } from "./drawer-styles";

class AddEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      eventName: ""
    };
  }

  handleOpenDialog = () => {
    this.setState({ dialogOpen: true });
  };

  handleCloseDialog = () => {
    this.setState({
      eventName: "",
      dialogOpen: false
    });
  };

  handleEventSubmit = () => {
    this.props.addEvent(this.props.userData.id, this.state.eventName);
    this.handleCloseDialog();
  };

  handleEventSubmitOnEnter = e => {
    if (e.key === "Enter") {
      this.handleEventSubmit();
    }
  };

  render() {
    const { classes } = this.props;
    const { dialogOpen, eventName } = this.state;
    return (
      <Fragment>
        <ListItem button onClick={this.handleOpenDialog}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="Add new event" />
        </ListItem>

        <Dialog
          open={dialogOpen}
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
              value={eventName}
              onChange={e => this.setState({ eventName: e.target.value })}
              onKeyPress={this.handleEventSubmitOnEnter}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleEventSubmit}
              disabled={eventName === ""}
              color="primary"
            >
              ADD EVENT
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
  connect(
    null,
    { addEvent }
  )
)(AddEvent);
