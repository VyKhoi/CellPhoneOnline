import React from "react";
import { useEffect } from 'react';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// import firebaseConfig from './firebaseConfig'; // assuming you have your Firebase configuration in this file

const NotificationComponent = () => {
  useEffect(() => {
    const messaging = getMessaging();
    
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const token = await getToken(messaging);
          console.log('FCM token:', token);


          
        }
      } catch (error) {
        console.error('Error getting permission:', error);
      }
    };

    requestNotificationPermission();

    // Optional: Add a message listener to handle incoming messages
    const unsubscribe = onMessage(messaging, (message) => {
      console.log('Message received:', message);
      // Handle the message here
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <button onClick={() => {}}>Get FCM Token</button>
  );
};

export default NotificationComponent;
