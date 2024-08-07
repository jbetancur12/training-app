// src/firebase.js
import { initializeApp } from "firebase/app";


// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAeSQYxCsRDQun726tLPDsoG5X2Od6U9ZQ",
  authDomain: "training-app-318af.firebaseapp.com",
  projectId: "training-app-318af",
  storageBucket: "training-app-318af.appspot.com",
  messagingSenderId: "789541304508",
  appId: "1:789541304508:web:6625034a63e3a11417f8b9",
  measurementId: "G-N8L2YX2181"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export default app
