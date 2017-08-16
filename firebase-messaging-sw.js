importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyCjm2-ANL2TmM9-dSR1C4KcDxjWmEzG34s",
    authDomain: "spinor-dev.firebaseapp.com",
    databaseURL: "https://spinor-dev.firebaseio.com",
    projectId: "spinor-dev",
    storageBucket: "spinor-dev.appspot.com",
    messagingSenderId: "612380189990"
};

firebase.initializeApp(config);



const messaging = firebase.messaging();

// Customize notification handler
messaging.setBackgroundMessageHandler(function(payload) {
    payload.data.data = payload.data;

    return self.registration.showNotification(payload.data.title, payload.data);
});

self.addEventListener('notificationclick', function(event) {
    var target = event.notification.data.click_action || '/';
    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(clients.matchAll({
        type: 'window'
    }).then(function(clientList) {
        // clientList always is empty?!
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client) {
                return client.focus();
            }
        }

        if (clients.openWindow) {
            return clients.openWindow(target);
        }
    }));
});