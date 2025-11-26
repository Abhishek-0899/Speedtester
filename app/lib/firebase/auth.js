import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_hKQhM0P9LNYOHbZ1miMpk2iM9RZfBCI",
  authDomain: "typinggame-dbbaf.firebaseapp.com",
  projectId: "typinggame-dbbaf",
  storageBucket: "typinggame-dbbaf.firebasestorage.app",
  messagingSenderId: "456429256072",
  appId: "1:456429256072:web:c9cca20cbad345cd5a0e3d",
};

const app = initializeApp(firebaseConfig);

// 👍 This works in SSR
export const auth = getAuth(app);


