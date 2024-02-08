import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
const firebaseConfig = {
  apiKey: "AIzaSyAe1-P3H6MFUhGRE7WamJJtCd__SwDLIkc",
  authDomain: "incubtest.firebaseapp.com",
  databaseURL: "https://incubtest-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "incubtest",
  storageBucket: "incubtest.appspot.com",
  messagingSenderId: "811994169907",
  appId: "1:811994169907:web:469484f954633e96001946",
  measurementId: "G-XVFF51HSQK"
};

  firebase.initializeApp(firebaseConfig);
  export const dataRef = firebase.database();
  export default firebase;