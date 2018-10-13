import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { inviteFriendByEmail } from "../../actions";

import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

class EventSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      emailValue: "",
      invitationDialogOpen: false
    };
  }

  handleEventSettingsClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleEventSettingsClose = () => {
    this.setState({ anchorEl: null });
  };

  handleFriendInvitation = () => {
    this.setState({ invitationDialogOpen: true });
    this.handleEventSettingsClose();
  };

  handleInvitationDialogClose = () => {
    this.setState({ invitationDialogOpen: false, emailValue: "" });
  };

  handleInvitationSubmit = () => {
    this.props.inviteFriendByEmail(
      this.state.emailValue,
      this.props.eventData.id
    );
    this.setState({ invitationDialogOpen: false });
  };

  handleSubmitOnEnter = e => {
    if (e.key === "Enter" && this.state.emailValue) {
      this.handleInvitationSubmit();
    }
  };

  render() {
    const { anchorEl, emailValue, invitationDialogOpen } = this.state;
    return (
      <Fragment>
        <IconButton color="inherit" onClick={this.handleEventSettingsClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="settings-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleEventSettingsClose}
        >
          <MenuItem
            disabled={!this.props.eventData.id}
            onClick={this.handleFriendInvitation}
          >
            Invite friend
          </MenuItem>
          <MenuItem disabled={true} onClick={this.handleEventSettingsClose}>
            Cash out
          </MenuItem>
        </Menu>

        <Dialog
          open={invitationDialogOpen}
          onClose={this.handleInvitationDialogClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogContent>
            <TextField
              autoFocus
              onKeyPress={this.handleSubmitOnEnter}
              autoComplete="off"
              id="email"
              label="Email"
              type="email"
              value={emailValue}
              onChange={e => this.setState({ emailValue: e.target.value })}
            />
          </DialogContent>

          <DialogActions>
            <Button
              onClick={this.handleInvitationSubmit}
              disabled={!emailValue}
              color="primary"
            >
              SEND INVITATION
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    eventData: state.eventData
  };
};

export default connect(
  mapStateToProps,
  { inviteFriendByEmail }
)(EventSettings);
