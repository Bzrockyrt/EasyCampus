import {Outlet} from 'react-router-dom'
import { getAuth, sendSignInLinkToEmail, signInWithPopup, GoogleAuthProvider, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react'
import { initializeApp } from 'firebase/app';
import reactLogo from './assets/react.svg'
import './App.css'

export default function Profile() {
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