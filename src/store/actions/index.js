import firebase from "../../firebase";

export const USUBSCRIBE_FROM_FIREBASE = "USUBSCRIBE_FROM_FIREBASE";

export const unsubscribeFirebase = () => {
  firebase
    .database()
    .ref()
    .off();
  return { type: USUBSCRIBE_FROM_FIREBASE };
};
