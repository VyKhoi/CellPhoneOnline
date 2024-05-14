import { getApps, initializeApp } from "firebase/app";

// Your web app's Firebase configuration
export const publicValidKey =
  "BC2AMFwQBpmcdwOGu0f8T67Al8p-jvFpdR_8wYGL7McMRDAjw2ZvdJHPuodTz_Frl8Hidm12QMHEA6Z32Br0gqw";


  export const firebaseConfig = {
    apiKey: "AIzaSyB3Nfh13CVElgxYC0muoqeYz1XFkKBHt3Q",
    authDomain: "sellphones-47798.firebaseapp.com",
    projectId: "sellphones-47798",
    storageBucket: "sellphones-47798.appspot.com",
    messagingSenderId: "113521639631",
    appId: "1:113521639631:web:d3802b37c1990eb610b7ba",
    measurementId: "G-2KDY9KSX49"
  };

// Initialize Firebase
const firebaseApp =
  // create a new app only if it doesn't already exists
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
