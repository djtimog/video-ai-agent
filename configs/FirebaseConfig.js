// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "video-ai-agent-83043.firebaseapp.com",
  projectId: "video-ai-agent-83043",
  storageBucket: "video-ai-agent-83043.firebasestorage.app",
  messagingSenderId: "63651713242",
  appId: "1:63651713242:web:1edf8d6fbd7ff1dbcb55e3",
  measurementId: "G-FJYGD2R4J3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);