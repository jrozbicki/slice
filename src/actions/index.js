import firebase from "../firebase";

export const ADD_CHECKEDOUT_ITEM = "ADD_CHECKEDOUT_ITEM";
export const REMOVE_CHECKEDOUT_ITEM = "REMOVE_CHECKEDOUT_ITEM";
export const CURRENT_USER_DATA = "CURRENT_USER_DATA";
export const CURRENT_USER_EVENTS = "CURRENT_USER_EVENTS";
export const SELECTED_EVENT_DATA = "SELECTED_EVENT_DATA";
export const ADD_EVENT = "ADD_EVENT";
export const USER_LOGOUT = "USER_LOGOUT";

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

export const currentUserEvents = uid => {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${uid}/events`)
      .once("value")
      .then(snap => {
        return snap.val();
      })
      .then(data => {
        dispatch(fetchEventsByIds(data));
      });
  };
};

const fetchEventsByIds = eventIds => {
  let events = {};
  if (eventIds) {
    Object.getOwnPropertyNames(eventIds).map(item => {
      return firebase
        .database()
        .ref(`/events/${item}`)
        .once("value")
        .then(snap => {
          Object.assign(events, { [item]: snap.val() });
        });
    });
  }
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
        Object.assign(data, { id: id });
        dispatch({
          type: SELECTED_EVENT_DATA,
          payload: data
        });
      });
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
      .update(updates)
      .then(() => {
        dispatch(currentUserEvents(userId));
      });

    return {
      type: ADD_EVENT
    };
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  };
};
