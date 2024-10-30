// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7aIN1Zd-B2nF0Ekmb-tk7ULEaWoBxCz4",
  authDomain: "roamexpenses.firebaseapp.com",
  projectId: "roamexpenses",
  storageBucket: "roamexpenses.appspot.com",
  messagingSenderId: "830775064299",
  appId: "1:830775064299:web:db3ef29fd8cf80dd1630ae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;

