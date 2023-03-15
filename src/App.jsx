import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import reactLogo from './assets/react.svg'
import './App.css'
import SignIn from './SignIn';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">

    </div>
  )
}

export default App
