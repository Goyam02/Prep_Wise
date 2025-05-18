// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiFF3uEFaHtNFe6Zvxotb5t3riFlB2yAw",
    authDomain: "prepai-fdfce.firebaseapp.com",
    projectId: "prepai-fdfce",
    storageBucket: "prepai-fdfce.firebasestorage.app",
    messagingSenderId: "564707116348",
    appId: "1:564707116348:web:8ae5874bfce09269604a39",
    measurementId: "G-64HT51S2L7"
};

const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
