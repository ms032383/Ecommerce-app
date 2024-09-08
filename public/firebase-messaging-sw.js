importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
// // Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBPjJDmuCUmzjWhDgWRrMzeUBc8CodkhKY",
  authDomain: "pattu-sarees-by-naveena.firebaseapp.com",
  projectId: "pattu-sarees-by-naveena",
  storageBucket: "pattu-sarees-by-naveena.appspot.com",
  messagingSenderId: "166584656723",
  appId: "1:166584656723:web:cbcaf6dd74a146776e37a6",
  measurementId: "G-2SB23JH29V",
};

firebase?.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase?.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
