import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA0PWZUTbOr8IoUlGx-nDBn1decmFIvqE4",
  authDomain: "voting-system-25f69.firebaseapp.com",
  projectId: "voting-system-25f69",
  storageBucket: "voting-system-25f69.appspot.com",
  messagingSenderId: "258118601917",
  appId: "1:258118601917:web:0d3762be67bae4e071bbd4",
  measurementId: "G-VDWPTTHTYE",
});

var db = firebaseApp.firestore();

export { db };
