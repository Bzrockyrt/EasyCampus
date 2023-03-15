import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  connectAuthEmulator
} from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "dummy-apiKey",
  authDomain: "dummy-authDomain.firebaseapp.com",
  projectId: "dummy-project-id",
  storageBucket: "dummy-authDomain.firebaseapp.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:7c7abae699b868b7f896ec",
  measurementId: "G-ABCDEFGHIJ"
});

export default firebaseApp