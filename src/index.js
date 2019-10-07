import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDaQdxs3hQ-nDVInjpdhgLbaleRIeIHn-Y",
    authDomain: "tournamanager-3a17a.firebaseapp.com",
    databaseURL: "https://tournamanager-3a17a.firebaseio.com",
    projectId: "tournamanager-3a17a",
    storageBucket: "tournamanager-3a17a.appspot.com",
    messagingSenderId: "578644609279",
    appId: "1:578644609279:web:ff2c015800e7ce861ea4ca",
    measurementId: "G-P266ND2WDH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
