// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL:
    "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "MESSAGING_SENDER_ID",
  appId: "APP_ID",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
signInWithEmailAndPassword(auth, "user@example.com", "password")
  .then((userCredential) => {
    console.log(userCredential.user.accessToken);
  })
  .catch((error) => {
    console.log(error.message);
  });
