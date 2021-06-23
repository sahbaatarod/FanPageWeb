import firebase from "firebase/app";
import "firebase/auth";

// export const firebaseApp = firebase.initializeApp({
//   apiKey: "AIzaSyC7L57SpvL1btw3JUzXY38et0qPasXuAPg",
//   authDomain: "test-e3507.firebaseapp.com",
//   // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: "test-e3507",
//   storageBucket: "test-e3507.appspot.com",
//   messagingSenderId: "85472173712",
//   appId: "1:85472173712:web:1bf4963c21038bf29dc215",
//   // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// });
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCHkSNDlooRZL_H7_lIIX1apf2NhBxg-GU",
  authDomain: "fir-androidapp-a7d79.firebaseapp.com",
  projectId: "fir-androidapp-a7d79",
  storageBucket: "fir-androidapp-a7d79.appspot.com",
  messagingSenderId: "441359285970",
  appId: "1:441359285970:web:aa279abe8e11411accf70b",
  measurementId: "G-0JHDBFM743",
});

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

// export const config = {
//   apiKey: "AIzaSyC7L57SpvL1btw3JUzXY38et0qPasXuAPg",
//   authDomain: "test-e3507.firebaseapp.com",
//   // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: "test-e3507",
//   storageBucket: "test-e3507.appspot.com",
//   messagingSenderId: "85472173712",
//   appId: "1:85472173712:web:1bf4963c21038bf29dc215",
//   // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };
export const config = {
  apiKey: "AIzaSyCHkSNDlooRZL_H7_lIIX1apf2NhBxg-GU",
  authDomain: "fir-androidapp-a7d79.firebaseapp.com",
  projectId: "fir-androidapp-a7d79",
  storageBucket: "fir-androidapp-a7d79.appspot.com",
  messagingSenderId: "441359285970",
  appId: "1:441359285970:web:aa279abe8e11411accf70b",
  measurementId: "G-0JHDBFM743",
};
