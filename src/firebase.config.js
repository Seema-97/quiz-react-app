// Import the functions you need from the SDKs you need
import { initializeApp , getApps ,getApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7uu5Mk5LgBQo7e0I8_VJL2C9qzAVoKVs",
  authDomain: "seema-2.firebaseapp.com",
  projectId: "seema-2",
  storageBucket: "seema-2.appspot.com",
  messagingSenderId: "607960949829",
  appId: "1:607960949829:web:5c5d146bbb3516ee596f2c"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

export const APP = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig) ;

export const FIRESTORE = getFirestore(APP) ;