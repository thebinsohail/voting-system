// import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebase from "firebase";
const config = {
  apiKey: "AIzaSyA0PWZUTbOr8IoUlGx-nDBn1decmFIvqE4",
  authDomain: "voting-system-25f69.firebaseapp.com",
  projectId: "voting-system-25f69",
  storageBucket: "voting-system-25f69.appspot.com",
  messagingSenderId: "258118601917",
  appId: "1:258118601917:web:0d3762be67bae4e071bbd4",
  measurementId: "G-VDWPTTHTYE",
};
firebase.initializeApp(config);
export default firebase;
// const firebase = Firebase.initializeApp(config);
// const auth = firebase.auth();
// export { firebase, auth };
