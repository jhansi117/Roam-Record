// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "API Key,
  authDomain: "authDomain",
  projectId: "projectid",
  storageBucket: "storagebucket",
  messagingSenderId: "senderId",
  appId: "appId"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const tripsRef = collection(db, 'trips')
export const expensesRef = collection(db, 'expenses')

export default app;

