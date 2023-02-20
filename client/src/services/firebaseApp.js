import { initializeApp } from "firebase/app";

// console.log(import.meta.env)
const { APPID_FIREBASE, MESSAGINGSENDERID_FIREBASE, STORAGEBUCKET_FIREBASE, PROJECTID_FIREBASE,
  DATABASEURL_FIREBASE, AUTHDOMAIN_FIREBASE, APIKEY_FIREBASE } = import.meta.env
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: APIKEY_FIREBASE,
  authDomain: AUTHDOMAIN_FIREBASE,
  databaseURL: DATABASEURL_FIREBASE,
  projectId: PROJECTID_FIREBASE,
  storageBucket: STORAGEBUCKET_FIREBASE,
  messagingSenderId: MESSAGINGSENDERID_FIREBASE,
  appId: APPID_FIREBASE
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;
