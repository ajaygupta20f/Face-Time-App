// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_mbASUwZrjN-AdQs6ppy7hDkWB_3XNag",
  authDomain: "video-confrence-55ed8.firebaseapp.com",
  projectId: "video-confrence-55ed8",
  storageBucket: "video-confrence-55ed8.appspot.com",
  messagingSenderId: "227235807173",
  appId: "1:227235807173:web:c087a5d568869d236495ac",
  measurementId: "G-V13BY472MR"
};

const app = initializeApp(firebaseConfig);
 export const firebaseAuth=getAuth(app)
 export const firebaseDB = getFirestore(app);

 export const usersRef = collection(firebaseDB, "users");
 export const meetingsRef=collection(firebaseDB,"meetings");