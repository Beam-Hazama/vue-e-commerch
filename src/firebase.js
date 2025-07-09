import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO6qORc-vvvbiIQMv0VD7VJTetoclnab0",
  authDomain: "vue-e-commerch-77b6a.firebaseapp.com",
  databaseURL: "https://vue-e-commerch-77b6a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "vue-e-commerch-77b6a",
  storageBucket: "vue-e-commerch-77b6a.firebasestorage.app",
  messagingSenderId: "366351105658",
  appId: "1:366351105658:web:97d3e63f4044845b6185c3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {
    db 
}