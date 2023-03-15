import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAf5Ug0WGWCXqo7K7WiwQ4Hz5ueoFaK9wM",
  authDomain: "easycampus-e85f1.firebaseapp.com",
  projectId: "easycampus-e85f1",
  storageBucket: "easycampus-e85f1.appspot.com",
  messagingSenderId: "835566955852",
  appId: "1:835566955852:web:b21648cd8964595761f3e9"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);