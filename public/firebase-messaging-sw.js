importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyDzSsZ8vtvpSid2r0kB7M0gB-9wD8yqSrQ",
  projectId: "dapanda-88763",
  messagingSenderId: "808334069696",
  appId: "1:808334069696:web:6a4673dfaac8f2a9784225",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "/dpd-main-logo.png",
  });
});
