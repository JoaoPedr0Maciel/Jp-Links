import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDix2raAaCOg27N9yIXY1ixcWf0uJ5ZOeg",
  authDomain: "react-links-2627b.firebaseapp.com",
  projectId: "react-links-2627b",
  storageBucket: "react-links-2627b.appspot.com",
  messagingSenderId: "572102393570",
  appId: "1:572102393570:web:1a4ab21da92d4369cbe8bb",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
