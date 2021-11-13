import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrSCmkWEUy9StiPLVAoCJqQvBcsasqJpI",
  authDomain: "fir-tutorial-52b18.firebaseapp.com",
  projectId: "fir-tutorial-52b18",
  storageBucket: "fir-tutorial-52b18.appspot.com",
  messagingSenderId: "1037773907772",
  appId: "1:1037773907772:web:23e20836c8fd038db6a039",
  measurementId: "G-E7R646YFT6",
};

const app = initializeApp(firebaseConfig);

//db connection

export const db = getFirestore(app);
