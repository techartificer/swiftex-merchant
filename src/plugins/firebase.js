import firebase from 'firebase/app';
import 'firebase/auth';

let isInit = false;
const firebaseConfig = {
  apiKey: 'AIzaSyBp7bKFcKYy0CZZuzGtehm85m8kQvrGc_k',
  authDomain: 'swiftex.firebaseapp.com',
  projectId: 'swiftex',
  storageBucket: 'swiftex.appspot.com',
  messagingSenderId: '673064184053',
  appId: '1:673064184053:web:a650d1273b413934f23dbc',
  measurementId: 'G-7RWDH7ZCE7',
};
const initialize = () => {
  if (!isInit) {
    firebase.initializeApp(firebaseConfig);
    isInit = true;
  }
};
const scaffold = {};
scaffold.initialize = initialize;
scaffold.firebase = firebase;

export default scaffold;
