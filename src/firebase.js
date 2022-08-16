import firebase from "firebase/app";
import "firebase/auth"

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBot42A-sxJnYif_UMHQnsjHDXxfeGl4O8",
  authDomain: "chat-engine-36cc2.firebaseapp.com",
  projectId: "chat-engine-36cc2",
  storageBucket: "chat-engine-36cc2.appspot.com",
  messagingSenderId: "557284769854",
  appId: "1:557284769854:web:5cbd1afde5e9c9125e116f",
  measurementId: "G-VBFY5WGQVJ"
}).auth();