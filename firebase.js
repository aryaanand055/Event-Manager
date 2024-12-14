import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyBE2V5WybBc4Ba6-_2wXN2YYFrHDD45-pk",
  authDomain: "event-manager-162ea.firebaseapp.com",
  projectId: "event-manager-162ea",
  storageBucket: "event-manager-162ea.firebasestorage.app",
  messagingSenderId: "1020569244856",
  appId: "1:1020569244856:web:e1fa0df6103a2fe30bd04d",
  measurementId: "G-QKW2NCGFVW"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);