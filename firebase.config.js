const  {initializeApp}= require('@firebase/app');
const { getStorage } = require('@firebase/storage');
const multer = require('multer');

const firebaseConfig = {
  apiKey: "AIzaSyDNqy88Zu1mqLwHvZvi8cKnOOhJpbBCqeo",
  authDomain: "digitax-461fb.firebaseapp.com",
  projectId: "digitax-461fb",
  storageBucket: "gs://digitax-461fb.appspot.com",
  messagingSenderId: "624071954112",
  appId: "1:624071954112:web:1f47255ab56179495ce725",
  measurementId: "G-D8R48Z6BK4"
};

initializeApp(firebaseConfig)
const storage = getStorage()
const upload = multer({storage:multer.memoryStorage()})

module.exports = {firebaseConfig,upload,storage}
