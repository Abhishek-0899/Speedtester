// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_hKQhM0P9LNYOHbZ1miMpk2iM9RZfBCI",
  authDomain: "typinggame-dbbaf.firebaseapp.com",
  projectId: "typinggame-dbbaf",
  storageBucket: "typinggame-dbbaf.firebasestorage.app",
  messagingSenderId: "456429256072",
  appId: "1:456429256072:web:c9cca20cbad345cd5a0e3d",
  measurementId: "G-Q6LR14V4VZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);