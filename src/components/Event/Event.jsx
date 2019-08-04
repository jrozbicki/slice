import React, { Component, Fragment } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import firebase from '../../firebase';

import Subscribers from './Subscribers/Subscribers';
import EventList from './EventList/EventList';
import CheckOutEvent from './CheckoutEvent/CheckOutEvent';
import { selectedEventId } from '../../store/actions/event';
import { Typography, withStyles } from '@material-ui/core';
import { styles } from './event-styles';
import { transactionsCalculator } from '../../utils/checkOut.js';

// class component that renders event with list and subscribers data
class Event extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventData: {},
      subscribersData: [],
      transactions: []
    };
  }

  componentDidMount() {
    if (this.props.user.defaultEventId !== '') {
      this.props.selectedEventId(this.props.user.defaultEventId);
    }
  }

  // if some event data gets updated (new item, checkouts)
  componentDidUpdate(prevProps) {
    if (this.props.currentEventId !== prevProps.currentEventId) {
      // detach event listener if visible event changes
      if (prevProps.currentEventId !== '') {
        firebase
          .database()
          .ref(`/events/${prevProps.currentEventId}`)
          .off();
      }

      // setting up event listener for event changes
      firebase
        .database()
        .ref(`/events/${this.props.currentEventId}`)
        .on('value', snap => {
          // in case of deletion etc.
          if (!snap.val()) {
            this.setState({
              eventData: {},
              subscribersData: [],
              transactions: []
            });
          } else {
            // pulling subscribers data as promises
            if (snap.val().users) {
              Promise.all(
                snap.val().users.map(userId => {
                  return firebase
                    .database()
                    .ref(`/users/${userId}`)
                    .once('value')
                    .then(snapshot => snapshot.val());
                })
              ).then(data =>
                // resolves promises into array and triggers rerender
                this.setState({
                  eventData: snap.val(),
                  subscribersData: data,
                  transactions: transactionsCalculator(data, snap.val())
                })
              );
            }
          }
        });
    }
  }

  render() {
    const { eventData, subscribersData, transactions } = this.state;
    // render only if there is some event selected
    if (eventData.id) {
      return (
        <Fragment>
          <EventList eventData={eventData} />
          <Subscribers
            subscribersData={subscribersData}
            eventData={eventData}
          />
          {eventData.eventTotal && subscribersData.length > 1 ? (
            <CheckOutEvent transactions={transactions} />
          ) : null}
        </Fragment>
      );
    }
    return (
      <Typography variant="display2" className={this.props.classes.emptyList}>
        <div>Select or add event!</div>
      </Typography>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentEventId: state.selectedEventId
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { selectedEventId }
  )
)(Event);
