import firebase from "firebase/compat/app";
import database from "firebase/compat/database";


var firebaseConfig = {
  apiKey: "AIzaSyCt3m7TpSpAUpx-i4Wbo0tiUOjooc4n3Mg", // Add API Key
  databaseURL:"https://videoconferance-421cb-default-rtdb.asia-southeast1.firebasedatabase.app/" // Add databaseURL
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export const db = firebase;

export var connectedRef = firebase.database().ref(".info/connected");
let dpref = firebase.database().ref();

export const userName = prompt("What's your name?");
const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (roomId) {
    dpref = dpref.child(roomId);
} else {
    dpref = dpref.push();
  window.history.replaceState(null, "Meet", "?id=" + dpref.key);
}

export default dpref;