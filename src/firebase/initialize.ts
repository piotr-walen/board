import firebase from 'firebase';

function initializeFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAUmxnSaesV8QddfsKO_DjGlh8amtPFiQc",
    authDomain: "board-dbc21.firebaseapp.com",
    databaseURL: "https://board-dbc21.firebaseio.com",
    projectId: "board-dbc21",
    storageBucket: "board-dbc21.appspot.com",
    messagingSenderId: "1044659056526",
    appId: "1:1044659056526:web:4fc21eff793638648dfedf"
  };
  firebase.initializeApp(firebaseConfig);
}

export default initializeFirebase;