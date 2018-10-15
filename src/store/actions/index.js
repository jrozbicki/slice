import firebase from "../../firebase";

export const ADD_CHECKEDOUT_ITEM = "ADD_CHECKEDOUT_ITEM";
export const REMOVE_CHECKEDOUT_ITEM = "REMOVE_CHECKEDOUT_ITEM";
export const CURRENT_USER_DATA = "CURRENT_USER_DATA";
export const CURRENT_USER_EVENTS = "CURRENT_USER_EVENTS";
export const SELECTED_EVENT_DATA = "SELECTED_EVENT_DATA";
export const ADD_EVENT = "ADD_EVENT";
export const USER_LOGOUT = "USER_LOGOUT";
export const DELETE_EVENT = "DELETE_EVENT";
export const USUBSCRIBE_FROM_FIREBASE = "USUBSCRIBE_FROM_FIREBASE";
export const SUBSCRIBERS_DATA = "SUBSCRIBERS_DATA";
export const INVITE_FRIEND_TO_EVENT = "INVITE_FRIEND_TO_EVENT";

export const addCheckedOutItem = id => {
  return {
    type: ADD_CHECKEDOUT_ITEM,
    payload: id
  };
};

export const removeCheckedOutItem = id => {
  return {
    type: REMOVE_CHECKEDOUT_ITEM,
    payload: id
  };
};

export const currentUserData = userId => {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${userId}`)
      .on("value", snap =>
        dispatch({
          type: CURRENT_USER_DATA,
          payload: { id: userId, ...snap.val() }
        })
      );
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
      users: [userId]
    };

    let updates = {};
    updates[`/events/${key}`] = eventData;
    updates[`/users/${userId}/events/${key}`] = true;

    firebase
      .database()
      .ref()
      .update(updates);

    return {
      type: ADD_EVENT
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

export const currentUserEvents = uid => {
  let events = {};
  firebase
    .database()
    .ref(`/users/${uid}/events`)
    .on("value", snap => {
      if (snap.val()) {
        Object.getOwnPropertyNames(snap.val()).map(item => {
          return firebase
            .database()
            .ref(`/events/${item}`)
            .on("value", snapshot => {
              if (snapshot.val()) {
                Object.assign(events, { [item]: snapshot.val() });
              }
            });
        });
      }
    });
  return {
    type: CURRENT_USER_EVENTS,
    payload: events
  };
};

export const selectedEventData = id => {
  return dispatch => {
    firebase
      .database()
      .ref(`/events/${id}`)
      .once("value")
      .then(snap => {
        return snap.val();
      })
      .then(data => {
        if (data) {
          Object.assign(data, { id: id });
          dispatch({
            type: SELECTED_EVENT_DATA,
            payload: data
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
          .once("value")
          .then(snapshot => snapshot.val());
      })
    ).then(values => {
      dispatch({
        type: SUBSCRIBERS_DATA,
        payload: values
      });
    });
  };
};

const getUserDataByEmail = email => {
  return firebase
    .database()
    .ref("/users")
    .orderByChild("email")
    .equalTo(email)
    .once("value")
    .then(snap => Object.entries(snap.val())[0][1]);
};

const getEventDataByEventId = eventId => {
  return firebase
    .database()
    .ref("/events")
    .child(eventId)
    .once("value")
    .then(snap => snap.val());
};

const updateEventAndUser = (eventData, userData) => {
  const updates = {};
  if (!eventData.users.includes(userData.id)) {
    eventData = { ...eventData, users: [...eventData.users, userData.id] };
    updates[`/events/${eventData.id}`] = eventData;
    userData = {
      ...userData,
      events: { ...userData.events, [eventData.id]: true }
    };
    updates[`/users/${userData.id}`] = userData;

    return firebase
      .database()
      .ref()
      .update(updates);
  }
};

export const inviteFriendByEmail = (email, eventId) => {
  return dispatch => {
    dispatch(() => {
      getUserDataByEmail(email).then(userData => {
        getEventDataByEventId(eventId).then(eventData => {
          updateEventAndUser(eventData, userData);
        });
      });
    });
    dispatch({
      type: INVITE_FRIEND_TO_EVENT
    });
  };
};

export const unsubscribeFirebase = () => {
  firebase
    .database()
    .ref()
    .off();
  return { type: USUBSCRIBE_FROM_FIREBASE };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  };
};
