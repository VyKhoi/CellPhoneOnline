import { getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export const publicValidKey =
  "BC2AMFwQBpmcdwOGu0f8T67Al8p-jvFpdR_8wYGL7McMRDAjw2ZvdJHPuodTz_Frl8Hidm12QMHEA6Z32Br0gqw";

  export const firebaseConfig = {
    apiKey: "AIzaSyAxTt3s1XGLl_JkVNsH6HLkK8uS6Iqn-7E",
    authDomain: "sellphones-d51ff.firebaseapp.com",
    projectId: "sellphones-d51ff",
    storageBucket: "sellphones-d51ff.appspot.com",
    messagingSenderId: "37098088720",
    appId: "1:37098088720:web:5dab7f07a93aa6ab525d95",
    measurementId: "G-586YQ66ZCX"
  };

// Initialize Firebase
const firebaseApp =
  // create a new app only if it doesn't already exists
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
