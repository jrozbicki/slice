import firebase from '../../firebase';

export const INVITE_FRIEND_TO_EVENT = 'INVITE_FRIEND_TO_EVENT';

const getUserDataByEmail = email => {
  return firebase
    .database()
    .ref('/users')
    .orderByChild('email')
    .equalTo(email)
    .once('value')
    .then(snap => Object.entries(snap.val())[0][1]);
};

const getEventDataByEventId = eventId => {
  return firebase
    .database()
    .ref('/events')
    .child(eventId)
    .once('value')
    .then(snap => snap.val());
};

const updateEventAndUser = (eventData, userData) => {
  const updates = {};
  if (!eventData.users.includes(userData.id)) {
    eventData = { ...eventData, users: [...eventData.users, userData.id] };
    updates[`/events/${eventData.id}`] = eventData;
    userData = {
      ...userData,
      events: {
        ...userData.events,
        [eventData.id]: { purchases: true, userTotal: 0, isEventAdmin: false }
      }
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
