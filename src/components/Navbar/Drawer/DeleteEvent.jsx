import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';

import { selectedEventId, deleteEvent } from '../../../store/actions/event';
import {
  IconButton,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import { styles } from './drawer-styles';

class DeleteEvent extends Component {
  state = {
    dialogOpen: false,
  };

  // opens dialog on button click
  handleOpenDialog = e => {
    this.setState({ dialogOpen: true });
  };

  // is invoked when dialog is closing
  handleCloseDialog = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  handleDeleteEvent = e => {
    this.props.selectedEventId('');
    this.props.deleteEvent(
      this.props.events[this.props.keyName].users,
      this.props.userData.id,
      this.props.keyName,
    );
  };

  render() {
    const { userData, keyName, classes } = this.props;
    const { dialogOpen } = this.state;
    if (userData.events) {
      if (userData.events[keyName]) {
        if (userData.events[keyName].isEventAdmin) {
          return (
            <Fragment>
              <IconButton
                id={keyName}
                aria-label="Delete"
                onClick={this.handleOpenDialog}
              >
                <Delete />
              </IconButton>

              <Dialog open={dialogOpen} aria-labelledby="delete-event">
                <DialogTitle id="delete-event" className={classes.dialogTitle}>
                  Are you sure?
                </DialogTitle>

                <DialogContent>
                  This operation will delete this event for you and other
                  subscribers!
                </DialogContent>

                <DialogActions>
                  <Button onClick={this.handleCloseDialog} color="primary">
                    CANCEL
                  </Button>
                  <Button onClick={this.handleDeleteEvent} color="primary">
                    YES, DELETE
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}

export default compose(
  connect(
    null,
    { selectedEventId, deleteEvent },
  ),
  withStyles(styles),
)(DeleteEvent);
