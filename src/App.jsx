import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import reactLogo from './assets/react.svg'
import './App.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAf5Ug0WGWCXqo7K7WiwQ4Hz5ueoFaK9wM",
  authDomain: "easycampus-e85f1.firebaseapp.com",
  projectId: "easycampus-e85f1",
  storageBucket: "easycampus-e85f1.appspot.com",
  messagingSenderId: "835566955852",
  appId: "1:835566955852:web:b21648cd8964595761f3e9"
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <h1>test</h1>
    </div>
  )
}

export default App
