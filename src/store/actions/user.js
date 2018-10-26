import firebase from '../../firebase';

export const CURRENT_USER_DATA = 'CURRENT_USER_DATA';
export const CURRENT_USER_EVENTS = 'CURRENT_USER_EVENTS';
export const USER_LOGOUT = 'USER_LOGOUT';
export const SET_DEFAULT_EVENT = 'SET_DEFAULT_EVENT';

export const currentUserData = userId => {
  return dispatch => {
    firebase
      .database()
      .ref(`/users/${userId}`)
      .on('value', snap =>
        dispatch({
          type: CURRENT_USER_DATA,
          payload: { id: userId, ...snap.val() },
        }),
      );
  };
};

export const currentUserEvents = uid => {
  let events = {};
  firebase
    .database()
    .ref(`/users/${uid}/events`)
    .on('value', snap => {
      if (snap.val()) {
        Object.getOwnPropertyNames(snap.val()).map(item => {
          return firebase
            .database()
            .ref(`/events/${item}`)
            .on('value', snapshot => {
              if (snapshot.val()) {
                Object.assign(events, { [item]: snapshot.val() });
              }
            });
        });
      }
    });
  return {
    type: CURRENT_USER_EVENTS,
    payload: events,
  };
};

export const setEventAsDefault = (user, eventId) => {
  firebase
    .database()
    .ref(`/users/${user.id}`)
    .set({ ...user, defaultEventId: eventId });
  return { type: SET_DEFAULT_EVENT };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};
