importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');
   
firebase.initializeApp({
    apiKey: "AIzaSyB2LIBipp5lJQQVyI5DyUhMJeDpdl9E3KI",
    authDomain: "saka-track.firebaseapp.com",
    projectId: "saka-track",
    storageBucket: "saka-track.appspot.com",
    messagingSenderId: "713747155245",
    appId: "1:713747155245:web:398ba822c358556a7a6ba4",
    measurementId: "G-DJCWTRD7QQ"
});
  
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function({data:{title,body,icon}}) {
    return self.registration.showNotification(title,{body,icon});
});

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
});