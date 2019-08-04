import React, { useState } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { inviteFriendByEmail } from '../../../store/actions/invite-user-to-event';

import {
  withStyles,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@material-ui/core';
import { PersonAdd } from '@material-ui/icons';
import { styles } from './subscribers-style';
import SingleSubscriber from './SingleSubscriber';

// functional component that renders Subscribers module
const Subscribers = ({
  classes,
  subscribersData,
  eventData,
  selectedEventId
}) => {
  const [emailValue, setEmailValue] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = e => setEmailValue(e.target.value);

  const handleDialogOpen = () => setIsDialogOpen(true);

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setEmailValue('');
  };

  const handleInvitationSubmit = () => {
    inviteFriendByEmail(emailValue, selectedEventId);
    setIsDialogOpen(false);
    setEmailValue('');
  };

  const handleSubmitOnEnter = e => {
    if (e.key === 'Enter' && emailValue) {
      handleInvitationSubmit();
    }
  };

  // iterates through all subscribers of current event and renders them
  const renderSubscribers = () => {
    if (subscribersData) {
      return subscribersData.map(subscriber => {
        return (
          <SingleSubscriber
            key={subscriber.id}
            eventData={eventData}
            subscriber={subscriber}
          />
        );
      });
    }
  };

  // only renders subscribers if there is event loaded
  return (
    <div className={classes.root}>
      <Typography variant="headline">
        Subscribers
        <IconButton
          onClick={handleDialogOpen}
          size="small"
          className={classes.button}
        >
          <PersonAdd fontSize="small" />
        </IconButton>
      </Typography>

      {renderSubscribers()}

      <Dialog
        open={isDialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          <TextField
            autoFocus
            onKeyPress={handleSubmitOnEnter}
            autoComplete="off"
            id="email"
            label="Email"
            type="email"
            value={emailValue}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={handleInvitationSubmit}
            disabled={!emailValue}
            color="primary"
          >
            SEND INVITATION
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedEventId: state.selectedEventId
  };
};

export default compose(
  connect(
    mapStateToProps,
    { inviteFriendByEmail }
  ),
  withStyles(styles)
)(Subscribers);
