import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDTQZ0dBnMmKFvSEBWLuNYAw-xVuFTbebQ",
  authDomain: "slice-jrz.firebaseapp.com",
  databaseURL: "https://slice-jrz.firebaseio.com",
  projectId: "slice-jrz",
  storageBucket: "",
  messagingSenderId: "755167284810"
};
firebase.initializeApp(config);

export default firebase;
