import firebase from '../../firebase';
import { currentUserEvents } from './user';

export const ADD_EVENT = 'ADD_EVENT';
export const DELETE_EVENT = 'DELETE_EVENT';
export const SELECTED_EVENT_DATA = 'SELECTED_EVENT_DATA';
export const SUBSCRIBERS_DATA = 'SUBSCRIBERS_DATA';

export const SELECTED_EVENT_ID = 'SELECTED_EVENT_ID';

export const selectedEventId = id => {
  return {
    type: SELECTED_EVENT_ID,
    payload: id,
  };
};

export const addEvent = (userId, name) => {
  return dispatch => {
    const key = firebase
      .database()
      .ref()
      .push().key;

    const eventData = {
      id: key,
      name: name,
      users: [userId],
      eventTotal: 0,
    };

    const userDataAboutEvent = {
      purchases: true,
      userTotal: 0,
      isEventAdmin: true,
    };

    let updates = {};
    updates[`/events/${key}`] = eventData;
    updates[`/users/${userId}/events/${key}`] = userDataAboutEvent;

    firebase
      .database()
      .ref()
      .update(updates);

    return {
      type: ADD_EVENT,
    };
  };
};

export const deleteEvent = (arrayUsersId, currentUserId, eventId) => {
  return dispatch => {
    const updates = {};
    // eslint-disable-next-line
    arrayUsersId.map(userId => {
      updates[`/events/${eventId}`] = null;
      updates[`users/${userId}/events/${eventId}`] = null;
    });

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        // eslint-disable-next-line
        dispatch(currentUserEvents(currentUserId));
      });
    return { type: DELETE_EVENT };
  };
};

export const selectedEventData = id => {
  return dispatch => {
    firebase
      .database()
      .ref(`/events/${id}`)
      .once('value')
      .then(snap => {
        return snap.val();
      })
      .then(data => {
        if (data) {
          Object.assign(data, { id: id });
          dispatch({
            type: SELECTED_EVENT_DATA,
            payload: data,
          });
          dispatch(selectedEventSubscribersData(data.users));
        }
      });
  };
};

export const selectedEventSubscribersData = usersIdArray => {
  return dispatch => {
    Promise.all(
      usersIdArray.map(userId => {
        return firebase
          .database()
          .ref(`/users`)
          .child(userId)
          .once('value')
          .then(snapshot => snapshot.val());
      }),
    ).then(values => {
      dispatch({
        type: SUBSCRIBERS_DATA,
        payload: values,
      });
    });
  };
};
