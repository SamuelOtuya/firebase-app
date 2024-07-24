// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKCU8Y9opIhhYdmslakgqrCFXaEI6bQO4",
  authDomain: "fir-app-458f7.firebaseapp.com",
  projectId: "fir-app-458f7",
  storageBucket: "fir-app-458f7.appspot.com",
  messagingSenderId: "848299645387",
  appId: "1:848299645387:web:e6f3d80973a49038d73e4e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, "users");
export const roomRef = collection(db, "rooms");
