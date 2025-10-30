// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAypfNOKLqSR5up5vrKA1W_FkeawYVbzkc",
  authDomain: "smart-deals-71dc2.firebaseapp.com",
  projectId: "smart-deals-71dc2",
  storageBucket: "smart-deals-71dc2.firebasestorage.app",
  messagingSenderId: "830612870853",
  appId: "1:830612870853:web:e09226f9baa438542fc2ac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
