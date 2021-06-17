import 'firebase/auth';
import "firebase/storage";
import firebase from 'firebase/app';
export const auth = firebase.initializeApp({
    apiKey: "AIzaSyD570rcOAyF2FYfA7zGVSum5k1muAsrD54",
    authDomain: "project-client-d56e2.firebaseapp.com",
    projectId: "project-client-d56e2",
    storageBucket: "project-client-d56e2.appspot.com",
    messagingSenderId: "501752577887",
    appId: "1:501752577887:web:cb81288a69d0751b4a80ea"

}).auth()
export const storageRef = firebase.storage();