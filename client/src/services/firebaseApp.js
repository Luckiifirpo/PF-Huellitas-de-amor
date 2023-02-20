import { initializeApp } from "firebase/app";

// console.log(import.meta.env)
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2h7PT1yEFGAq8__qWBTfFHGw7EeQ81Iw",
  authDomain: "huellitas-de-amor-auth.firebaseapp.com",
  databaseURL: "https://huellitas-de-amor-auth-default-rtdb.firebaseio.com",
  projectId: "huellitas-de-amor-auth",
  storageBucket: "huellitas-de-amor-auth.appspot.com",
  messagingSenderId: "56874258349",
  appId: "1:56874258349:web:3bad25231714fa64799b24"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);

export default FirebaseApp;
