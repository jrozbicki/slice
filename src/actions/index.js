import firebase from "../firebase";

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

export const currentUserData = userData => {
  return {
    type: CURRENT_USER_DATA,
    payload: userData
  };
};

export const addEvent = (userId, name) => {
  return dispatch => {
    const eventData = {
      name: name,
      users: [userId]
    };

    const key = firebase
      .database()
      .ref()
      .push().key;

    let updates = {};
    updates[`/events/${key}`] = eventData;
    updates[`/users/${userId}/events/${key}`] = true;

    firebase
      .database()
      .ref()
      .update(updates);
    // .then(() => {
    //   dispatch(currentUserEvents(userId));
    // });
    return {
      type: ADD_EVENT
    };
  };
};

export const deleteEvent = (userId, eventId) => {
  return dispatch => {
    const updates = {};
    updates[`/events/${eventId}`] = null;
    updates[`users/${userId}/events/${eventId}`] = null;

    firebase
      .database()
      .ref()
      .update(updates)
      .then(() => {
        dispatch(currentUserEvents(userId));
      });
    return {
      type: DELETE_EVENT
    };
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
    let subscribersData = [];
    usersIdArray.map(userId => {
      firebase
        .database()
        .ref(`/users/${userId}`)
        .on("value", snapshot => {
          if (snapshot.val()) {
            dispatch({
              type: SUBSCRIBERS_DATA,
              payload: [
                ...subscribersData,
                Object.assign(snapshot.val(), { id: userId })
              ]
            });
          }
        });
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
