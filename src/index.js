import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDoGbEQEA4dFOZJ2Z8KLzcxKGn3OZAM2Jo",
    authDomain: "tournamanager-6156a.firebaseapp.com",
    databaseURL: "https://tournamanager-6156a.firebaseio.com",
    projectId: "tournamanager-6156a",
    storageBucket: "tournamanager-6156a.appspot.com",
    messagingSenderId: "869774866440",
    appId: "1:869774866440:web:537a832d84ed063e5b79bd",
    measurementId: "G-FSK8V1XTSE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
