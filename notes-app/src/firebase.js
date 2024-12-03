import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQ1mSvIOlAELYz3s2NzJZTo6wSbM-VGZc",
  authDomain: "notes-app-e870a.firebaseapp.com",
  projectId: "notes-app-e870a",
  storageBucket: "notes-app-e870a.firebasestorage.app",
  messagingSenderId: "682947893780",
  appId: "1:682947893780:web:f3f0994c4815f26ffc6501",
  measurementId: "G-HCVYLB1R7V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Initialize Firestore and Auth
const auth = getAuth(app);

export { db, auth };