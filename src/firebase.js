// import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase";
const config = {
  apiKey: "AIzaSyBcQ16IzrfAXu8uKqVfR7x4MNw8sff55Ts",
  authDomain: "voting-system-77d09.firebaseapp.com",
  databaseURL: "https://voting-system-77d09-default-rtdb.firebaseio.com",
  projectId: "voting-system-77d09",
  storageBucket: "voting-system-77d09.appspot.com",
  messagingSenderId: "349239118974",
  appId: "1:349239118974:web:49d8a1a52de34db174dc2f",
  measurementId: "G-409029SGBC",
};
firebase.initializeApp(config);
export default firebase;
// const firebase = Firebase.initializeApp(config);
// const auth = firebase.auth();
// export { firebase, auth };
