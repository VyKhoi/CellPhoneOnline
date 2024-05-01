importScripts('https://www.gstatic.com/firebasejs/9.6.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.5/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in your app's Firebase config object
firebase.initializeApp({

  apiKey: "AIzaSyB3Nfh13CVElgxYC0muoqeYz1XFkKBHt3Q",
  authDomain: "sellphones-47798.firebaseapp.com",
  projectId: "sellphones-47798",
  storageBucket: "sellphones-47798.appspot.com",
  messagingSenderId: "113521639631",
  appId: "1:113521639631:web:d3802b37c1990eb610b7ba",
  measurementId: "G-2KDY9KSX49"

});

// Retrieve an instance of Firebase Messaging so that it can handle background messages
const messaging =  firebase.messaging();

// Handle background messages using onBackgroundMessage
onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize notification behavior
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});