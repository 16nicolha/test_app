// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCaqGSi3zXGaar2CGoz6iErMNGsHdkFhzc",
    authDomain: "ghastly-96d0a.firebaseapp.com",
    projectId: "ghastly-96d0a",
    storageBucket: "ghastly-96d0a.firebasestorage.app",
    messagingSenderId: "637419816032",
    appId: "1:637419816032:web:30773f46b03ff5a065ef05",
    measurementId: "G-KPBNHN9L8Z"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);