var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BIaE3arZPErBWcI2NwPyKT7HDDQzUHIgfTf8lR5_GPb-c63Ghloqv1dk2ani_FatG0Rvi42L2omDTlaSjSDgZ00",
   "privateKey": "4eb6_i0rjpc6U2kCcKxPSMqae-8CcTmaCqS1BntP7HI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dWdvju-dR4w:APA91bF1s13lECpkkmsGXMzMw1498Ao2zH8UFra9g6v_vAXudoMXHJTTqE8cpboo8Mf_qyRFA-1h_ESrAKFF8IJNg9R6HrysSz1kH5EhBUywjxV0WP7KCcJ7lcGX6KP9WDkHliy4qra2",
   "keys": {
       "p256dh": "BCAEPM5gPFbMQ9oM7CDQDYVF4KVk36zdwmntGXleMO1DBJ7dcoIIX8LG5iuEoRjiHOCAKJSY8ZzMb6LQ/Kt9ipE=",
       "auth": "adkBIYNsy1wuxKPVV2YvrA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '140361509168',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);