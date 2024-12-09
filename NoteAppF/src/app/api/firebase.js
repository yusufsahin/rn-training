// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYIMIv_xhWE6s8UEZWKS1h25zJmFUR09Y",
  authDomain: "alohaapp-97fd8.firebaseapp.com",
  projectId: "alohaapp-97fd8",
  storageBucket: "alohaapp-97fd8.firebasestorage.app",
  messagingSenderId: "644805698547",
  appId: "1:644805698547:web:d279b08894ec29b59ca886"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
