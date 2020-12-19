import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

firebase.initializeApp({
  apiKey: "AIzaSyCjTRrNrx-HVS6vUYKGS9bFsmJFbpKRM9s",
  authDomain: "react-firebase-demo-88c79.firebaseapp.com",
  projectId: "react-firebase-demo-88c79",
  storageBucket: "react-firebase-demo-88c79.appspot.com",
  messagingSenderId: "764164544667",
  appId: "1:764164544667:web:a2c6c7c056ec7fedcf8e3e",
  measurementId: "G-16BH32BPJD"
});

export const firestore = firebase.firestore();
export const storage = firebase.storage();