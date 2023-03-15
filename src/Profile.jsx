import {Outlet} from 'react-router-dom'
import { getAuth, sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import { initializeApp } from 'firebase/app';
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

export default function Profile() {

  const auth = getAuth(firebaseConfig);
  connectAuthEmulator(auth, "http://localhost:5173");

  // Login using email/password
  const loginEmailPassword = async () => {
    const loginEmail = txtEmail.value
    const loginPassword = txtPassword.value

    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  }

  btnLogin.addEventListener("click", loginEmailPassword)

    return(
    <div id="login">
        <div class="header">
          <h1>Getting Started with Firebase Auth</h1>
        </div>
        <form>
          <div class="group">
            <input id="txtEmail" type="email"/>
            <label>Email</label>
          </div>
          <div class="group">
            <input id="txtPassword" type="password"/>
            <label>Password</label>
          </div>
          <div id="divLoginError" class="group">
            <div id="lblLoginErrorMessage" class="errorlabel">Error message</div>
          </div>
          <button id="btnLogin" type="button" class="button buttonBlue">Log in</button>
          <button id="btnSignup" type="button" class="button buttonBlue">Sign up</button>
        </form>
      </div>
    )
}